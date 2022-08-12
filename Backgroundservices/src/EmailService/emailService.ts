import ejs from "ejs";
import sendMail from "../Helpers/Email";
import pool from "../Config/config.js";
import { log } from "console";
require("dotenv").config();


interface User {
  user_id: string;
  username: string;
  email: string;
  role: string;
  issent: string;
}

const SendEmails = async () => {
  let users = await pool.query(`SELECT * FROM users WHERE issent='0'`);
  users = users.rows
  


  for (let user of users) {
    ejs.renderFile(
      __dirname+"/../../templates/registration.ejs",
      { username: user.username},
      async (error, data) => {
        if(error){
          console.log(error);
          return
        }
        let messageoption = {
          from: process.env.EMAIL_SENDER,
          to: user.email,
          subject: "Registration Successfull",
          html: data,
        };

        try {
          await sendMail(messageoption);
          await pool.query(`UPDATE users SET issent='1' WHERE email = '${user.email}'`);
          console.log("Email is Sent");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};

export default SendEmails;
