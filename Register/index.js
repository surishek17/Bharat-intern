const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_URI;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('connected', () => {
    console.log(`Connected to MongoDB at ${dbURL}`);
});
db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
});

app.post("/register", async (req, res) => {
    console.log("Request received at /register");
    console.log("Request method:", req.method);
    console.log("Request body:", req.body);
    try {
        const { name, email, password } = req.body;
        const existingUser = await Registration.findOne({ email });

        if (!existingUser) {
            const registrationData = new Registration({ name, email, password });
            await registrationData.save();
            res.send(`
                <html>
                    <head>
                        <style>
                            body { background-color: #e6f7ff; text-align: center; padding: 20px; }
                            h2 { color: #007bff; }
                        </style>
                    </head>
                    <body>
                        <h2>Successfully submitted the data</h2>
                    </body>
                </html>
            `);
        } else {
            res.send(`
                <html>
                    <head>
                        <style>
                            body { background-color: #ffe6e6; text-align: center; padding: 20px; }
                            h2 { color: #ff0000; }
                        </style>
                    </head>
                    <body>
                        <h2>User already exists</h2>
                    </body>
                </html>
            `);
        }
    } catch (error) {
        console.log("Error while registration:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
