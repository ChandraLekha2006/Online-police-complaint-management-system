const http = require("http");

const server = http.createServer((req, res) => {

  const name = "Chandra Lekha"; // your name

  res.writeHead(200, { "Content-Type": "text/html" });

  if (req.url === "/") {

    res.write(`<h2>Hello from ${name}'s Node.js Server</h2>`);

  } 
  else if (req.url === "/about") {

    res.write("<h2>About Page</h2>");
    res.write("<p>This server is created using Node.js</p>");

  } 
  else if (req.url === "/contact") {

    res.write("<h2>Contact Page</h2>");
    res.write("<p>Email: kasachandra@karunya.edu.in</p>");

  } 
  else {

    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h2>404 - Page Not Found</h2>");

  }

  res.end();
});

server.listen(3000, "0.0.0.0", () => {

  console.log("\n🚀 Server running at http://localhost:3000\n");

  console.log("👉 Open in browser:");
  console.log("   http://localhost:3000/        (Home)");
  console.log("   http://localhost:3000/about   (About Page)");
  console.log("   http://localhost:3000/contact (Contact Page)");
  console.log("   http://localhost:3000/test    (404 Test)\n");

});