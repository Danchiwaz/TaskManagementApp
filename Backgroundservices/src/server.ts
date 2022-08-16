import express from "express";
import cron from "node-cron";
import SendEmails, {CompleteProjectEmail, sendProjectEmail } from "./EmailService/emailService";


const app = express();

const run = () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("running a 5 seconds");
    await SendEmails();
    await sendProjectEmail()
    await CompleteProjectEmail()
  });
};
run();

app.listen(7000, () => {
  console.log("App is Running");
});
