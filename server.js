const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");

connectDb();

const app = express();

const PORT = process.env.PORT || 8888;

app.use(express.json());
app.use("/api/v1/contact", require("./routes/contactsRoutes"));
app.use("/api/v1/user", require("./routes/usersRoutes"));
app.use(errorHandler);

app.get("/test", (req, res) => {
  res.json({
    message: "This is a test end-point"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
