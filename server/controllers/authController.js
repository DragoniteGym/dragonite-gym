const pool = require('../../db_models/pool');
const bcrypt = require('bcrypt'); // For hashing passwords

const handleLogin = async (req, res) => {
  const { email, password_hash } = req.body; // Changed from password to password_hash

  try {
    const result = await pool.query('SELECT * FROM login WHERE email = $1', [
      email,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password_hash, user.password_hash))) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const handleSignUp = async (req, res) => {
    const { email, password_hash, username, firstname, lastname } = req.body; // Added username, firstname, and lastname
  
    try {
      // Check if the email already exists in the login table
      const result = await pool.query('SELECT * FROM login WHERE email = $1', [
        email,
      ]);
  
      if (result.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password_hash, saltRounds);
  
      // Insert into users table
      const userResult = await pool.query(
        'INSERT INTO users (username, firstname, lastname) VALUES ($1, $2, $3) RETURNING user_id',
        [username, firstname, lastname]
      );
  
      const userId = userResult.rows[0].user_id;
  
      // Insert into login table with user_id
      await pool.query(
        'INSERT INTO login (user_id, email, password_hash) VALUES ($1, $2, $3)',
        [userId, email, hashedPassword]
      );
  
      res.status(201).json({ message: 'Sign-up successful' });
    } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
  handleLogin,
  handleSignUp,
};
