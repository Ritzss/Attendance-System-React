import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import cors from "cors";

const app = express();


app.use(cors({
      origin: (origin, callback) => {
      if (!origin) return callback(null, true); // for mobile apps, postman, etc.

      // Allow all localhost ports
      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      // Block everything else
      callback(new Error("Not allowed by CORS"));
    },
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))

app.use(express.json());

app.post("/register",async(req, res)=>{
    const data = req.body;

    const hash =bcrypt.hashSync(data.Password,14);
    
    const newUser={...data,password:hash,Confirm_Password:hash}
    
    const db=JSON.parse(fs.readFileSync("./db.json"));
    db.users.push(newUser);
    fs.writeFileSync("./db.json",JSON.stringify(db,null,2));

    res.send({success:true})
})


app.post("/login", (req, res) => {
  const { Email, Password, Role } = req.body;

  const db = JSON.parse(fs.readFileSync("./src/backend/db.json"));
  const user = db.users.find((u) => u.Email === Email);

  if (!user) {
    return res.send({ success: false, message: "User not found!" });
  }

  const isMatch = bcrypt.compareSync(Password, user.password);
  if (!isMatch) {
    return res.send({ success: false, message: "Incorrect password!" });
  }

  if (user.Role !== Role) {
    return res.send({ success: false, message: "Role mismatch!" });
  }

  const cleanUser = { ...user };
  delete cleanUser.password;

  res.send({
    success: true,
    message: "Login successful",
    user: cleanUser,
  });
});




app.listen(5000,()=>console.log("Server has stated"))