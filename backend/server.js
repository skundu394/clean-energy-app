const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 3000;
const secretKey = 'clean-energy-secret';
const mysql = require('mysql');
require('dotenv').config();

// Hardcoded credentials
const hardcodedUsername = 'Sri Harini';
const hardcodedPassword = 'Sri Harini';

// Database Connection
const dbConfig = {
  host:process.env.DB_HOST || 'localhost', // MySQL host
  user: process.env.DB_USER || 'root', // MySQL user
  password: process.env.DB_PASSWORD || '', // Password stored securely in .env
  database: process.env.DB_DATABASE || 'clean_energy', // MySQL database name
};
const db = mysql.createConnection(dbConfig);

// Connect to the database
db.connect((err) => {
  if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
  } else {
      console.log('Connected to the MySQL database.');
  }
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Login route (POST request)
app.post('/api/login', (req, res) => {
  console.log('Request body:', req.body); // Debug log
    const { username, password } = req.body;
    console.log('Received Username:', username);
    console.log('Received Password:', password);
    if (username === hardcodedUsername && password === hardcodedPassword) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Root route (to handle GET request at http://localhost:3000/)
app.get('/', (req, res) => {
    res.send('Welcome to the Clean Energy App Backend!');
});

// Endpoint for fetching chart data (Summary Page)
app.get('/api/summary-chart-data', (req, res) => {
  const query = 'SELECT * FROM summary_chart'; // SQL query to fetch data from `summary_chart` table

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ success: false, message: 'Database query failed' });
        } else {
            res.json(results); // Return the query results as a JSON response
        }
    });

  });

  // const summaryChartData = [
  //   { month: 'June', renewableEnergy: 70, nonRenewableEnergy: 30 },
  //   { month: 'July', renewableEnergy: 75, nonRenewableEnergy: 25 },
  //   { month: 'August', renewableEnergy: 80, nonRenewableEnergy: 20 },
  //   { month: 'September', renewableEnergy: 85, nonRenewableEnergy: 15 },
  //   { month: 'October', renewableEnergy: 90, nonRenewableEnergy: 10 },
  // ];
  // res.json(summaryChartData);


// Endpoint for fetching chart data (Reports Page)
app.get('/api/report-chart-data', (req, res) => {
  const query = 'SELECT * FROM report_chart'; // SQL query to fetch data from `report_chart` table

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ success: false, message: 'Database query failed' });
        } else {
            res.json(results); // Return the query results as a JSON response
        }
    });
  });

  // const reportChartData = [
  //     { country: 'Sweden', wind: 35, solar: 25, hydro: 40 },
  //     { country: 'Norway', wind: 30, solar: 20, hydro: 50 },
  //     { country: 'Finland', wind: 25, solar: 30, hydro: 45 },
  //     { country: 'Denmark', wind: 40, solar: 35, hydro: 25 },
  //     { country: 'Iceland', wind: 20, solar: 15, hydro: 65 },
  // ];
  // res.json(reportChartData);

// Start the server
app.listen(PORT, () => {
    console.log(`Clean Energy App backend running on http://localhost:${PORT}`);
});















// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const app = express();
// const PORT = 3000;
// const secretKey = 'clean-energy-secret';

// app.use(cors());
// app.use(express.json());

// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'admin' && password === 'admin') {
//     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//     res.json({ success: true, token });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid credentials' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Clean Energy App backend running on http://localhost:${PORT}`);
// });
