import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";

const app = express();
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



app.listen(5000,()=>console.log("Server has stated"))