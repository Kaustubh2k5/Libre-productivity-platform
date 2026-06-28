import outboxWorker from "./outbox.worker.js";
import { connectProducer } from "../kafka/producer.js";

async function bootstrap() {

    await connectProducer();

    console.log("Outbox worker started.");

    setInterval(async () => {

        await outboxWorker.processBatch();

    }, 5000);

}

bootstrap();