import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import path from "node:path";
import { renderToString } from "wc-compiler";

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyStatic, {
  root: path.join(new URL(".", import.meta.url).pathname, "components"),
  prefix: "/components",
});

fastify.get("/", async function handler(request, reply) {
  // TODO: Move to SSR utility, maybe `renderRoute`.
  const renderedRoute = await renderToString(
    new URL("./routes/index.js", import.meta.url)
  );

  reply.type("text/html");

  // IDEA: Store document template somewhere.
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <title>Neutro Demo</title>
      </head>
      <body>
        ${renderedRoute.html}
      </body>
    </html>
  `;
});

try {
  await fastify.listen({ port: 3000 });
  console.log("\nNeutro Dev Server: http://localhost:3000\n");
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
