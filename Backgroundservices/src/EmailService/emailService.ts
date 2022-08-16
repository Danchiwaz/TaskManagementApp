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


export const sendProjectEmail = async () => {
  let projects =
    await pool.query(`SELECT project.title, project.due_at, users.email, users.username
FROM project
INNER JOIN users
ON project.assigned_to = users.user_id WHERE users.assigned_project='yes';`);
  projects = projects.rows;

  for (let project of projects) {
    ejs.renderFile(
      __dirname + "/../../templates/projectAssigned.ejs",
      { username: project.username, title: project.title, due: project.due_at},
      async (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        let messageoption = {
          from: process.env.EMAIL_SENDER,
          to: project.email,
          subject: "Registration Successfull",
          html: data,
        };

        try {
          await sendMail(messageoption);
          await pool.query(
            `UPDATE users SET assigned_project='working' WHERE email = '${project.email}'`
          );
          console.log("Email is Sent");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};

export const CompleteProjectEmail = async () => {
  let projects = await pool.query("SELECT project.title, project.due_at, users.email, users.username,users.iscomplete FROM project INNER JOIN users ON project.assigned_to = users.user_id WHERE users.iscomplete='no'");
  projects = projects.rows;


  for (let project of projects) {
    ejs.renderFile(
      __dirname + "/../../templates/completeProject.ejs",
      { username: project.username, title: project.title, due: project.due_at },
      async (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        let messageoption = {
          from: project.email,
          to: process.env.EMAIL_SENDER,
          subject: "Project Complete",
          html: data,
        };

        try {
          await sendMail(messageoption);
          await pool.query(
            `UPDATE users SET iscomplete='sent' WHERE email = '${project.email}'`
          );
          console.log("Email is Sent");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};

