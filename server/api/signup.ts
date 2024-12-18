import bcrypt from 'bcrypt';
import { pool } from '../utils/db';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, email, password } = body;
    // Validation
    if (username.length < 5) {
      throw createError({
        statusCode: 400,
        message: 'Username must be at least 5 characters long'
      });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw createError({
        statusCode: 401,
        message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      });
    }

    // Check if the email already exists
    const [rows] = await pool.execute('SELECT email FROM users WHERE email = ?', [email]);

    if (Array.isArray(rows) && rows.length > 0) {
      throw createError({ statusCode: 409, message: 'Email is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    return {
      success: true,
      message: 'User created successfully',
      data: result
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw createError({
        statusCode: error.statusCode,
        message: error.message
      });
    } else {
      console.error('Internal Server Error:', error);
      throw createError({
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  }
});
