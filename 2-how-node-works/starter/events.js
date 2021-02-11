const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Rajeev");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left.`);
});

myEmitter.emit("newSale", 90);

///////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved");
  res.end("Request recieved");
});

server.on("request", (req, res) => {
  console.log("Another request");
});

server.on("close", (req, res) => {
  console.log("Server closed");
});

server.listen(8000, () => {
  console.log("Waiting for requests...");
});
