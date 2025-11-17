import jwt from 'jsonwebtoken';
import User from '../models/User';
import Admin from '../models/Admin';
import connectDB from '../lib/mongodb';

export async function verifyToken(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return { error: 'No token provided' };
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    await connectDB();
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return { error: 'User not found' };
    }

    return { user };
  } catch (error) {
    return { error: 'Invalid token' };
  }
}

export async function verifyAdmin(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return { error: 'No token provided' };
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    await connectDB();
    
    const admin = await Admin.findById(decoded.adminId);
    if (!admin || admin.role !== 'admin') {
      return { error: 'Admin access required' };
    }

    return { admin };
  } catch (error) {
    return { error: 'Invalid admin token' };
  }
}

export function requirePremium(user) {
  return user.subscription_status === 'premium';
}