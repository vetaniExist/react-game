import path from "path";
import express from "express";

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, "index.html");

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.static(DIST_DIR));

server.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});

server.get("/*", (req, res) => {
  res.redirect("/");
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));// eslint-disable-line
