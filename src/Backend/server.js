import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();

// --------------------------------------------------
// CORS
// --------------------------------------------------
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join("src/backend/uploads")));

// --------------------------------------------------
// REGISTER
// --------------------------------------------------
app.post("/register", async (req, res) => {
  const data = req.body;

  const hash = bcrypt.hashSync(data.Password, 14);
  const newUser = {
    ...data,
    password: hash,
    Confirm_Password: hash,
    profileimage: "",
  };

  const dbPath = "./src/backend/db.json";
  const db = JSON.parse(fs.readFileSync(dbPath));

  db.users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.send({ success: true });
});

// --------------------------------------------------
// LOGIN
// --------------------------------------------------
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

// --------------------------------------------------
// MULTER SETUP (IMAGE UPLOAD)
// --------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/backend/uploads/profile-images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// --------------------------------------------------
// PROFILE IMAGE UPLOAD
// --------------------------------------------------
app.post("/profile", upload.single("image"), (req, res) => {
  const { id } = req.body;
  console.log(req.body)

  if (!id) {
    return res.status(400).json({ success: false, message: "ID missing" });
  }

  const oldPath = req.file.path;
  const newPath = `src/backend/uploads/profile-images/${id}.jpg`;

  fs.renameSync(oldPath, newPath);

  const imagePath = `/uploads/profile-images/${id}.jpg`;

  const dbPath = "./src/backend/db.json";
  const db = JSON.parse(fs.readFileSync(dbPath));
  const user = db.users.find(u => u.id === id);

  user.profileimage = imagePath;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({ success: true, profileimage: imagePath });
});
// --------------------------------------------------
// Attendance Marker
// --------------------------------------------------

// --------------------------------------------------
// ATTENDANCE MARK
// --------------------------------------------------
app.post("/attendance", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId missing" });
  }

  const dbPath = "./src/backend/db.json";
  const db = JSON.parse(fs.readFileSync(dbPath));

  // ✅ validate user exists
  const user = db.users.find((u) => u.id === userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  }

  const today = new Date().toISOString().split("T")[0];

  // 🛡 prevent duplicate attendance
  const alreadyMarked = db.attendance.find(
    (a) => a.userId === userId && a.date === today
  );

  if (alreadyMarked) {
    return res.json({
      success: false,
      message: "Attendance already marked",
    });
  }

  const now = new Date();

  const attendance = {
    id: Date.now().toString(),
    userId: userId,
    name: user.Name,
    department: user.Department,
    role: user.Role,
    date: today,
    time: now.toTimeString().split(" ")[0],
    status: "present",
  };

  db.attendance.push(attendance);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({
    success: true,
    message: "Attendance marked",
    attendance,
  });
});


// --------------------------------------------------
app.listen(5000, () => console.log("Server started on port 5000"));
