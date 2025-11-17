// Script to create initial admin user
import bcrypt from 'bcryptjs';
import connectDB from './mongodb.js';
import Admin from '../models/Admin.js';

export async function createInitialAdmin() {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@aiwellness.app' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = new Admin({
      name: 'Admin User',
      email: 'admin@aiwellness.app',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@aiwellness.app');
    console.log('Password: admin123');
    console.log('Please change the password after first login');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Run this function to create admin user
// createInitialAdmin();