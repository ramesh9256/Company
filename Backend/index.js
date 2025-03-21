require('dotenv').config();
const express = require('express');
const db = require('./Config/db');
const cors = require('cors');
const employee = require('./models/userModel');


const app = express();
app.use(cors());
app.use(express.json());

const generateDummyData = () => {
    const names = ["Harry", "John", "Alice", "Bob", "Emma", "Michael", "Sophia", "David", "Olivia", "Liam"];
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];
    const languages = ["JavaScript", "Python", "Java", "C++", "Go"];
  
    return Array.from({ length: 10 }, () => ({
      name: names[Math.floor(Math.random() * names.length)],
      salary: Math.floor(Math.random() * 9000000) + 1000000,
      language: languages[Math.floor(Math.random() * languages.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      isManager: Math.random() < 0.5,
    }));
  };

  app.get("/generate-data", async (req, res) => {
    console.log(req.body);
    
    try {
      await employee.deleteMany(); // Clear Collection
      const dummyData = generateDummyData();
      await employee.insertMany(dummyData);
      res.status(200).json({ message: "Data generated successfully!", data: dummyData });
    } catch (error) {
      res.status(500).json({ message: "Error generating data", error });
    }
  });


  app.get('/' , (req,res) => {
    res.send("hey google");
  })


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
