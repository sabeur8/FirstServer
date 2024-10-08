const mysql = require('mysql2')

const db = mysql.createPool({
    host: 'localhost',      // Database host (typically 'localhost')
    user: 'root',           // Your MySQL username
    password: '',   // Your MySQL password
    database: 'ant' // The database you want to connect to
});

db.getConnection((err, connection) => {
    if (err) {
    console.error('Error connecting to the database:', err);
    return;
    }
    console.log('Connected to the MySQL database');
    connection.release(); // Release connection after use
});

module.exports = db