const { Kafka } = require("kafkajs");
const msg = process.argv[2];
run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "MyApp",
      brokers: ["null.local:9092"],
    });
    //
    const producer = kafka.producer();
    console.log("Connecting......");
    await producer.connect();
    console.log("Connected OK");
    //
    const partition = msg[0] < "N" ? 0 : 1;
    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });
    //
    console.log(`Result: ${JSON.stringify(result)}`);
    console.log("Created OK");
    await producer.disconnect();
    //
  } catch (ex) {
    console.error(`Something happeed  ${ex}`);
  } finally {
    process.exit(0);
  }
}
