import { Request, RequestHandler, Response } from "express";
import pool from "../database/config.js";
import bcrypt from "bcrypt";
import { jwtTokens } from "../Helpers/jwt-helper.js";
import { Data } from "../interfaces/interfaces.js";
import { assign } from "nodemailer/lib/shared/index.js";

interface ExtendedRequest extends Request {
  body: {
    title: string;
    description: string;
    due_at: string;
    assigned_to: string;
  };
}

export const insertProject = async (req: ExtendedRequest, res: Response) => {
  try {
    const { title,description,due_at, assigned_to } = req.body;
    let user_asigned = await pool.query(`SELECT user_id FROM users where username = '${assigned_to}'`);
    console.log(user_asigned);
    
    const newProject = await pool.query(`INSERT INTO project(title, description, due_at, assigned_to) VALUES('${title}', '${description}', '${due_at}', '${assigned_to}')`);

    res.json({
      message: "You have Added project Successfully",
    });
  } catch (error) {
    res.json({
      message: "Failed to add Project",
    });
    console.log(error);
    
  }
};

export const getProjects = async (req: ExtendedRequest, res: Response) => {
  try {
    let projects = await pool.query("SELECT * FROM project");
    projects = projects.rows;
    res.json({
      projects: projects,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

