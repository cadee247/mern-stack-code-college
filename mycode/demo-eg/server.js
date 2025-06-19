const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/demoeg", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello from demo-eg 👋");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});