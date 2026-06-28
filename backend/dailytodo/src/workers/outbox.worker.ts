import publisher from "../kafka/event-publisher.js";
import outboxRepository from "../repositories/outbox.repository.js";

class OutboxWorker {

    async processBatch() {

        const events =
            await outboxRepository.getPendingEvents(100);

        for (const event of events) {

            try {

                await publisher.publish(

                    event.topic,

                    event.payload

                );

                await outboxRepository.markAsSent(
                    event.id
                );

            } catch (err) {

                console.error(err);

                await outboxRepository.markAsFailed(
                    event.id
                );

            }

        }

    }

}

export default new OutboxWorker();