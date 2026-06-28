import { producer } from "./producer.js";

export class KafkaPublisher {

    async publish(
        topic: string,
        payload: unknown
    ) {
        await producer.send({
            topic,
            messages: [
                {
                    value: JSON.stringify(payload)
                }
            ]

        });
    }
}

export default new KafkaPublisher();