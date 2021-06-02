const { Kafka } = require("kafkajs");
run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "MyApp",
      brokers: ["null.local:9092"],
    });
    //
    const admin = kafka.admin();
    console.log("Connecting......");
    await admin.connect();
    console.log("Connected OK");
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Created topics succesfully.");
    await admin.disconnect();
    //
  } catch (ex) {
    console.error(`Something happeed  ${ex}`);
  } finally {
    process.exit(0);
  }
}
