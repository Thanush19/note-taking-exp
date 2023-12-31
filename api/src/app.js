const express = require("express");

require("./db/mongoose.js");

const noteRouter = require("./routers/note-routers.js");
const userRouter = require("./routers/user-routers.js");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

app.use(noteRouter);
app.use(userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
