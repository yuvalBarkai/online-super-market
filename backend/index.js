const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const server = express();
server.use(cors());
server.use(express.json());

const mediumController = require("./controllers/medium-controller");
const publicController = require("./controllers/pubic-controller");
const adminController = require("./controllers/admin-controller");

server.use(`${config.serverBaseAddr}/admin`, adminController);
server.use(`${config.serverBaseAddr}/public`, publicController);
server.use(`${config.serverBaseAddr}/medium`, mediumController);


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