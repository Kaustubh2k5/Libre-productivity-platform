import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "daily-todo-service",
    brokers: [
        process.env.KAFKA_BROKER!
    ]
});

export const producer = kafka.producer();

export async function connectProducer() {
    await producer.connect();
}

export async function disconnectProducer() {
    await producer.disconnect();
}