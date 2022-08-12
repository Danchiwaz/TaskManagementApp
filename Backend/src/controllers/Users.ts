import { Request, RequestHandler, Response } from "express";
import pool from "../database/config.js";
import bcrypt from "bcrypt";
import { jwtTokens } from "../Helpers/jwt-helper.js";
import { Data } from "../interfaces/interfaces.js";

interface ExtendedRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

interface Extended extends Request {
  info?: Data;
}

export const insertUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(`CALL RegisterUser($1, $2, $3)`, [username,email,hashedPassword]);

    res.json({
      message: "Registered successfully.Please Login",
    });
  } catch (error) {
    res.json({
      message: "Username or Email exists",
    });
  }
};

export const getUsers = async (req: ExtendedRequest, res: Response) => {
  try {
    let users = await pool.query("select username from users where assigned_project ='no';");
    users = users.rows
    res.json({users:users});
    console.log(users)
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const LoginUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    if (user.rows.length === 0)
      return res.status(403).json({ message: "username is incorrect" });
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword)
      return res.status(401).json({ message: "password is incorrect" });
    let token = jwtTokens(user.rows[0]);
    res.json({
      token,
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
};

export const logoutUser = (req: ExtendedRequest, res: Response) => {
  localStorage.removeItem("token");
};

export const checkUser = async (req: Extended, res: Response) => {
  if (req.info) {
    res.json({
      user_id: req.info.user_id,
      username: req.info.username,
      email: req.info.email,
      role: req.info.role,
    });
  }
};
