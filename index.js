import bodyParser from "body-parser";
import express from "express";

import KafkaConfig from "./config.js";
import controllers from "./controller.js";

const app = express();
const port = 3000;
const jsonParser = bodyParser.json();


app.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

app.post("/post", jsonParser, (req, res) => {
    console.log(req.body);
    res.send("Hello World!");
    }
);

app.post("/api/sent", jsonParser, controllers.sendMessageToKafka)

const kafkaConfig = new KafkaConfig();

kafkaConfig.consume("course-topic", (message) => {
    console.log(message);
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
