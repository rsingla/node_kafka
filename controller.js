import kafkaConfig  from "./config.js";

const sendMessageToKafka = async (req, res) => {
    try {

        const { message } = req.body;
        const kafka = new kafkaConfig();

        const messages = [
            { key: 'key1',
             value: message },
        ]

        await kafka.produce("course-topic", message);
        res.status(200).json({ status: "ok!", message: "Message sent to Kafka" });

    } catch(error) {
        console.log(error);
    }
}

const controllers = {sendMessageToKafka}

export default controllers;