import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mongodb from "./common/connection";
import router from "./routes/index";
import path from "path";
import logger from "morgan";

const app = express();
const port = 4220;
dotenv.config();

app.use("/", express.static(path.join(__dirname, "../public")));
// app.use("../assets", express.static("../assets"));

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(logger("dev"));

app.use("/", router());

app.listen(port, () => {
  console.log(`Application listening on port ${port}!`);
  mongodb();
});
