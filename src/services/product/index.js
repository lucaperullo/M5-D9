import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";
import multer from "multer";
import { v4 as uniqid } from "uuid";
import { checkSchema, validationResult } from "express-validator";

const currentWorkingFile = fileURLToPath(import.meta.url);
const currentWorkingDirectory = dirname(currentWorkingFile);
const publicFolderDir = join(
  currentWorkingDirectory,
  "../../../public/database/index.json"
);

const productSchema = {
  Name: {
    isString: true,
    errorMessage: "A name is required",
  },
  Description: {
    isString: true,
    errorMessage: "A description is required",
  },
  Brand: {
    isString: true,
    errorMessage: "A brand is required",
  },
  Price: {
    isString: true,
    errorMessage: "A price is required",
  },
};
const productRoutes = Router();

productRoutes.get("/", async (req, res) => {
  try {
    const product = await fs.readJson(publicFolderDir);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.send({ messege: error });
  }
});
productRoutes.post("/", async (req, res) => {
  try {
    const newProduct = {
      ...req.body,
      _id: uniqid(),
      createdAt: new Date(),
      imageUrl:
        "https://lh3.googleusercontent.com/proxy/IPZ2riAAncZa4yEP8GHYuIH6m_oqPXnSpqCjGoR1WdkoW1fWU47qR8D5wxaI7GQToO_DpOcI8ZBYsOvR3q2siR_bmSu--g",
      reviews: [],
    };
  } catch (error) {
    console.log(error);
    res.send({ messege: error }).status(500);
  }
});
export default productRoutes;
