const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Has@6791",
    database: "campusconnect"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Error ❌", err);
    } else {
        console.log("MySQL Connected 🚀");
    }
});

// Home
app.get("/", (req, res) => {
    res.send("CampusConnect Backend Running 🚀");
});

// Signup
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    const checkQuery = "SELECT * FROM users WHERE email = ?";

    db.query(checkQuery, [email], (err, result) => {
        if (err) {
            return res.json({
                success: false,
                message: "Database Error ❌"
            });
        }

        if (result.length > 0) {
            return res.json({
                success: false,
                message: "User already exists ❌"
            });
        }

        const insertQuery =
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(insertQuery, [name, email, password], (err) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Signup Failed ❌"
                });
            }

            res.json({
                success: true,
                message: "Signup Successful 🎉"
            });
        });
    });
});

// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query =
        "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, result) => {
        if (err) {
            return res.json({
                success: false,
                message: "Database Error ❌"
            });
        }

        if (result.length > 0) {
            res.json({
                success: true,
                message: "Login Successful 🎉",
                user: result[0]
            });
        } else {
            res.json({
                success: false,
                message: "Invalid Credentials ❌"
            });
        }
    });
});

// Add Note
app.post("/notes", (req,res)=>{

const {title,content}=req.body;

const query=
"INSERT INTO notes(title,content) VALUES (?,?)";

db.query(query,[title,content],(err)=>{

if(err){
return res.json({
success:false,
message:"Failed ❌"
});
}

res.json({
success:true,
message:"Note Added ✅"
});

});

});


// Get Notes

app.get("/notes",(req,res)=>{

db.query(
"SELECT * FROM notes ORDER BY id DESC",

(err,result)=>{

if(err){

return res.json({
success:false
});

}

res.json(result);

});

});

// Add Event

app.post("/events",(req,res)=>{

const {title,date}=req.body;

const query=
"INSERT INTO events(title,date) VALUES (?,?)";

db.query(query,[title,date],(err)=>{

if(err){

console.log(err);

return res.json({
success:false,
message:"Event add failed ❌"
});

}

res.json({
success:true,
message:"Event Added 🎉"
});

});

});


// Get Events

app.get("/events",(req,res)=>{

db.query(
"SELECT * FROM events ORDER BY id DESC",

(err,result)=>{

if(err){

return res.json({
success:false
});

}

res.json(result);

});

});
// Add Marketplace Item
app.post("/marketplace", (req, res) => {
  const { item, price, contact } = req.body;

  const query = "INSERT INTO marketplace (item, price, contact) VALUES (?, ?, ?)";

  db.query(query, [item, price, contact], (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Item add failed ❌" });
    }

    res.json({ success: true, message: "Item Added ✅" });
  });
});

// Get Marketplace Items
app.get("/marketplace", (req, res) => {
  db.query("SELECT * FROM marketplace ORDER BY id DESC", (err, result) => {
    if (err) {
      return res.json({ success: false });
    }

    res.json(result);
  });
});

// Add Lost Found Item
app.post("/lostfound", (req, res) => {
  const { item, description, contact } = req.body;

  const query = "INSERT INTO lostfound (item, description, contact) VALUES (?, ?, ?)";

  db.query(query, [item, description, contact], (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Lost item add failed ❌" });
    }

    res.json({ success: true, message: "Lost item added ✅" });
  });
});

// Get Lost Found Items
app.get("/lostfound", (req, res) => {
  db.query("SELECT * FROM lostfound ORDER BY id DESC", (err, result) => {
    if (err) {
      return res.json({ success: false });
    }

    res.json(result);
  });
});
// AI Assistant

app.post("/assistant",(req,res)=>{

const {message}=req.body;

let reply="Sorry, I don't understand.";

messageLower=message.toLowerCase();

if(messageLower.includes("java")){

reply=
"Java is an object-oriented programming language.";

}

else if(
messageLower.includes("dbms")
){

reply=
"DBMS manages and organizes data efficiently.";

}

else if(
messageLower.includes("sql")
){

reply=
"SQL is used to manage databases.";

}

else if(
messageLower.includes("hello")
){

reply=
"Hello 👋 Welcome to CampusConnect.";

}

res.json({
reply
});

});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});