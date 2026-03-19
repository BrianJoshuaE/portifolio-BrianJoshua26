import express from "express";
import { env } from "./config/env.js";
import pool from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

try {
  const connection = await pool.getConnection();
  if (!connection) {
    console.log("Unable to connect to mysql");
  }
  console.log("Connected succesfully to the database");
} catch (error) {
  console.error("An erro occured", error);
}

//CREATE SYSTEM USER
app.post("/user", async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;
    if (
      !fullname.trim() ||
      !email.trim() ||
      !username.trim() ||
      !password.trim()
    ) {
      return res.status(400).json({
        message:
          "All fields are required, please verify and resubmit hdsfbsdbfj",
      });
    }

    const [result] = await pool.query(
      "SELECT username, email FROM users WHERE username = ? OR email = ?",
      [username.trim(), email.trim()],
    );
    if (result.length > 0) {
      return res.status(409).json({
        message: "Username or email already taken, please choose another",
      });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUserQuery =
      "INSERT INTO users (fullname, username, email, password) VALUES (?,?,?,?)";

    const [newUserResult] = await pool.query(newUserQuery, [
      fullname.trim(),
      username.trim(),
      email.trim(),
      hashedPassword,
    ]);

    if (newUserResult.affectedRows === 0) {
      return res.status(500).json({
        message: "Unable to create new user, please try again later",
      });
    }
    return res.status(201).json({
      message: "User created succesfully",
      id: newUserResult.insertId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error Occured",
      errorMessage: error,
    });
  }
});

//USER LOGIN
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim()) {
      return res.status(400).json({
        message: "Username and password is madatory",
      });
    }
    const [result] = await pool.query(
      "SELECT id, fullname, username, email, password FROM users WHERE username = ?",
      [username.trim()],
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "User details not found",
      });
    }
    const userData = result[0];
    const hashedPassword = userData.password;
    const checkPassword = await bcrypt.compare(password.trim(), hashedPassword);
    if (!checkPassword) {
      return res.status(404).json({
        message: "Invalid Credentials, please try again",
      });
    }
    const payload = {
      id: userData.id,
      email: userData.email,
      fullname: userData.fullname,
    };
    const token = jwt.sign(payload, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
    return res.status(200).json({
      message: "User succesfully Logged in",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error Occured",
      errorMessage: error,
    });
  }
});

//MIDDLE WARE
function authenticateToken(req, res, next) {
  const authHeaderDetails = req.headers.authorization;

  if (!authHeaderDetails) {
    return res.status(401).json({
      message: "Missing header details",
    });
  }
  const token = authHeaderDetails.split(" ")[1];

  if (!token) {
    return res.status(404).json({
      message: "You have a bearer token",
    });
  }
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or Expired",
      error: err,
    });
  }
}

app.get("/", authenticateToken, async (req, res) => {
  try {
    const randomAdviceQuery =
      "SELECT id, advice_description FROM advice ORDER BY RAND() LIMIT 1";
    const [result] = await pool.query(randomAdviceQuery);
    if (result.length === 0) {
      return res.status(404).json({
        message: "No advice found!, please try again later",
      });
    }
    return res.status(200).json({
      id: result[0].id,
      advice: result[0].advice_description,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error Occured",
      errorMessage: error,
    });
  }
});

//SEARCH ADVICE BY KEYWORD
//SEARCH ADVICE BY KEYWORD
app.get("/advice/search", async (req, res) => {
  try {
    const { keyword } = req.query;

    const [result] = await pool.query(
      "SELECT * FROM advice WHERE advice_description LIKE ?",
      [`%${keyword}%`]
    );

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error
    });
  }
});

//CREATING AN ADVICE
//CREATE NEW ADVICE
app.post("/advice", async (req, res) => {
  try {
    const { advice_description, created_by } = req.body;

    if (!advice_description) {
      return res.status(400).json({
        message: "Advice description is required"
      });
    }

    const [result] = await pool.query(
      "INSERT INTO advice (advice_description, created_by) VALUES (?,?)",
      [advice_description, created_by]
    );

    return res.status(201).json({
      message: "Advice created successfully",
      id: result.insertId
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error
    });
  }
});
//UPDATING AN ADVICE
//UPDATE ADVICE
app.put("/advice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { advice_description, updated_by } = req.body;

    const [result] = await pool.query(
      "UPDATE advice SET advice_description=?, updated_by=? WHERE id=?",
      [advice_description, updated_by, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Advice not found"
      });
    }

    return res.status(200).json({
      message: "Advice updated successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error
    });
  }
});

//DELETING ADVICE
//DELETE ADVICE
app.delete("/advice/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM advice WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Advice not found"
      });
    }

    return res.status(200).json({
      message: "Advice deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error
    });
  }
});

const PORT = env.appPort;
app.listen(PORT, () => {
  console.log(`Application running on http://localhost:${PORT}`);
});



//GET ADVICE BY ID
app.get("/advice/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "SELECT * FROM advice WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Advice not found"
      });
    }

    return res.status(200).json(result[0]);

  } catch (error) {
    return res.status(200).json({
      message: "Server error",
      error: error
    });
  }
});