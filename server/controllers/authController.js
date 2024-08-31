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
  const { email, password_hash } = req.body; // Changed from password to password_hash

  try {
    const result = await pool.query('SELECT * FROM login WHERE email = $1', [
      email,
    ]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds); // Changed from password to password_hash

    await pool.query(
      'INSERT INTO login (email, password_hash) VALUES ($1, $2)',
      [email, hashedPassword]
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
