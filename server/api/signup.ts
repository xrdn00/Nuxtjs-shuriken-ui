import { pool } from '../utils/db';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, email,password } = body;

    if (!username || !email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Name and email are required'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, email,password) VALUES (?, ?, ?)',
      [username, email,hashedPassword]
    );

    return {
      success: true,
      message: 'User created successfully',
      data: result
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message
    });
  }
});