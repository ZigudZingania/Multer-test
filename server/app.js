import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const PORT = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const name = req.headers.name;
    console.log(name);
    const path = `./uploads/${name}`;
    if (fs.existsSync(path)) {
      cb(null, path);
    } else {
      fs.mkdirSync(path);
      cb(null, path);
    }
  },
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".")[1];
    const fileName = file.originalname.split(".")[0];
    callback(null, `${fileName}-${Date.now()}.${extension}`);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.json("Listening");
});

// app.post("/send", upload.array("files"), (req, res) => {
//   console.log(req.files);
//   console.log(req.body.name);
//   res.send("working");
// });

app.post("/send", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log("listening at http://localhost:3000");
});
