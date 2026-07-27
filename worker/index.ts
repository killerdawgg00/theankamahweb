import handler from "vinext/server/app-router-entry";

type Env = Record<string, never>;

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const source = url.searchParams.get("url");

      // Stale pages may still request the old optimizer route. Redirect only
      // safe, site-local paths to their bundled originals.
      if (source?.startsWith("/") && !source.startsWith("//")) {
        return Response.redirect(new URL(source, url.origin), 302);
      }

      return new Response("Invalid image source", { status: 400 });
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
