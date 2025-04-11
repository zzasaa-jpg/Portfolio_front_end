require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.port || 1312;

app.use(cors());

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get("/projects", async (req, res) => {
    try {
        const response = await axios.get(process.env.url);
        res.send(response.data)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching data");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
