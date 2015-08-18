
import {server} from "./server";

server({
  separateStylesheet: true,
  defaultPort: 8080,
  forwardTo: "http://localhost:13003"
});
