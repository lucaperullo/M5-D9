import express from "express";
import cors from "cors";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import listEndpoints from "express-list-endpoints";
import productRoutes from "./services/product/index.js";
import { getCurrentFolderPath } from "./lib/fs-tools.js";
// import reviewRoutes from "";

const server = express();
server.use(cors());
server.use(express.json());
const swaggerDocument = YAML.load(
  join(getCurrentFolderPath(import.meta.url), "./docs.yml")
);
server.use("/product", productRoutes);
server.use("/review", () => {
  console.log("hi");
});
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
const PORT = process.env.PORT || 6000;
server.listen(
  PORT,
  () => console.log("the server is listening on port:" + PORT),
  console.table(listEndpoints(server))
);
