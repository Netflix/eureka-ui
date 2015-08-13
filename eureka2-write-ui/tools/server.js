import {createEntryHolder} from "../app-data/api/diagnostic/registry/entryholders/entryholder";
import {createEntryHolders} from "../app-data/api/diagnostic/registry/entryholders";

export function server(options) {
  var express = require("express");
  var bodyParser = require("body-parser");
  var path = require("path");
  var jsonfile = require('jsonfile');
  var app = express();

  // load bundle information from stats
  var stats = require("../build/stats.json");
  var publicPath = stats.publicPath;

  // serve the static assets
  app.use("/_assets", express.static(path.join(__dirname, "..", "build", "public"), {
    maxAge: "200d" // We can cache them as they include hashes
  }));
  app.use("/", express.static(path.join(__dirname, "..", "public"), {}));

  app.use(bodyParser.json());

  // -----------------------------------------------------------------------
  // Test data

  // Entry holders
  app.get("/api/diagnostic/registry/entryholders", function (req, resp) {
    var data = createEntryHolders(req.query);
    resp.send(data);
  });
  app.get("/api/diagnostic/registry/entryholders/*", function (req, resp) {
    var segments = req.path.match(/.*entryholders[/]([^_]*)_([^?]*)/);
    var data = createEntryHolder(segments[2], segments[1]);
    resp.send(data);
  });

  app.get("/api/*", function (req, resp) {
    var path = req.path.replace("/api", "app-data/api") + ".json";
    resp.download(path)
  });

  // application
  var fs = require("fs");
  var styleUrl = publicPath + "main.css?" + stats.hash;
  var scriptUrl = publicPath + [].concat(stats.assetsByChunkName.main)[0];

  var html = fs.readFileSync(path.resolve(__dirname, "../app/index-dev.html"), "utf-8")
    .replace("SCRIPT_URL", scriptUrl)
    .replace("CSS_URL", styleUrl);

  app.get("/*", function (req, res) {
    res.contentType = "text/html; charset=utf8";
    res.end(html);
  });

  var port = +(process.env.PORT || options.defaultPort || 8080);
  app.listen(port, function () {
    console.log("Server listening on port " + port);
  });
};
