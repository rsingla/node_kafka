import { Kafka } from "kafkajs";

class kafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  async produce(topic, message) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
    } catch (error) {
      console.log(error);
    } finally {
        await this.producer.disconnect();
    }
  }

    async consume(topic, callback) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = message.value.toString();
                    callback(value);
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default kafkaConfig;