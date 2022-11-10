const args = require("minimist")(process.argv.slice(2));

const http = require("http");
const fs = require("fs");

let homeInfo = "";
let projectInfo = "";
let registrationInfo = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeInfo = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectInfo = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationInfo = registration;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectInfo);
        response.end();
        break;
      case "/registration":
        response.write(registrationInfo);
        response.end();
        break;
      default:
        response.write(homeInfo);
        response.end();
        break;
    }
  })
  .listen(args.port);
