require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyparser = require("body-parser");
const Router = require("./routes/route");
const Router1 = require("./routes/Clientroutes");
const Router2 = require("./routes/engineer");
const Router4 = require("./routes/Taskroutes");
const RouterT = require("./routes/Team");
const Router5 = require("./routes/userroute");
const Router6 = require("./routes/Leadroutes");
const app = express();
const path = require("path");
const serverless = require("serverless-http");
const authRouter = require("./middleware/passport");

connectDB();

app.use(
  cors({
    origin: process.env._fronturl,
  })
);

app.use(express.json({ extended: true }));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env._fronturl);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/login", authRouter);

app.use("/project", Router);

app.use("/Client", Router1);

app.use("/engineer", Router2);

app.use("/task", Router4);

app.use("/Team", RouterT);

app.use("/user", Router5);

app.use("/lead", Router6);

module.exports.handler = serverless(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
