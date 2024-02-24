const http = require("http");

const options = {
  host: "localhost",
  port: 8080,
  timeout: 2000, // 2 seconds
};

const request = http.request(options, (res) => {
  console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0); // success
  } else {
    process.exit(1); // failure
  }
});

request.on("error", function (err) {
  console.log("HEALTHCHECK FAILED", err);
  process.exit(1); // failure
});

request.end();
