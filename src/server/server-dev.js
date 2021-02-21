import path from "path";
import express from "express";

import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../../webpack.dev.config";

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, "index.html");

const PORT = process.env.PORT || 3000;

const compiler = webpack(config);

const server = express();

server.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

server.use(express.static(DIST_DIR));

server.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});

server.get("/*", (req, res) => {
  res.redirect("/");
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
