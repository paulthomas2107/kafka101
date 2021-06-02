const { Kafka } = require("kafkajs");
run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "MyApp",
      brokers: ["null.local:9092"],
    });
    //
    const consumer = kafka.consumer({
      groupId: "test",
    });
    console.log("Connecting......");
    await consumer.connect();
    console.log("Connected OK");
    //
    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });
    //
    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Got message: ${result.message.value} on partition ${result.partition}`
        );
      },
    });

    //await consumer.disconnect(); // Keep running...
    //
  } catch (ex) {
    console.error(`Something happeed  ${ex}`);
  }
}
