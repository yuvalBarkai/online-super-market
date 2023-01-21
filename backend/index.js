const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const server = express();
server.use(cors());
server.use(express.json());

const controller = require("./controllers/controller");

server.use("/", controller);

server.use("*", (req, res) => {
    res.send(`The address ${req.originalUrl} was not found`);
});

server.listen(config.serverListeningPort, () => {
    console.log(`Listening at ${config.serverListeningPort}`);
}).on("error", (err) => {
    if (err.code == "EADDRINUSE")
        console.log(`Error: Port No. ${config.serverListeningPort} is taken`);
    else {
        console.log("Error: Unknown Error");
    }
});