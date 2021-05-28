import { create, router as _router, defaults, rewriter } from "json-server";
import process from "node";
const server = create();
const router = _router("./db.json");
const middlewares = defaults({ static: "./build" });
const PORT = process.env.PORT || 3001;
server.use(middlewares);
server.use(rewriter({ "/api/*": "/$1" }));
server.use(router);
server.listen(PORT, () => {
  console.log("Server is running");
});
