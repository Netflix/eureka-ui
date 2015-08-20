import {server} from "./server";

server({
  devMode: true,
  separateStylesheet: true,
  defaultPort: 8080,
  forwardTo: "http://localhost:13003"
});
