const mongoose = require("mongoose");

const DBurl = process.env.DBUrl;

mongoose
  .connect(DBurl)
  .then((result) => {
    if (result) {
      console.log("DB Connected successfully");
    } else {
      console.log("Something went wrong");
    }
  });
