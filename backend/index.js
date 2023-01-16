const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const server = express();
server.use(cors());
server.use(express.json());




server.listen(config.serverListeningPort, () => {
    console.log(`Listening at ${config.serverListeningPort}`);
}).on("error", (err) => {
    if (err.code == "EADDRINUSE")
        console.log(`Port No. ${config.serverListeningPort} is taken`);
    else {
        console.log("Unknown Error");
    }
});