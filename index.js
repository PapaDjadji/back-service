const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRoutes = require("./src/routes/api.js");
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT;

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URL, {
}).then(() => {
  console.log("Connected to the Database successfully");
})
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  });

app.use(cors());

// Middleware
app.use(bodyParser.json());

registerRoutes(app);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
