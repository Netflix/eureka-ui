
import {server} from "./server";

server({
  separateStylesheet: true,
  defaultPort: 8080,
  forwardTo: "http://ec2-50-19-255-75.compute-1.amazonaws.com:7101"
});
