const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

// In-Memory Repository Fallback when MongoDB is offline
const RUNTIME_USERS = [
  { _id: 'usr_1', email: 'worker@forgemind.ai', password: 'password123', name: 'Marcus Vance', role: 'Worker', employeeId: 'EMP-9042', department: 'Stamping Bay' },
  { _id: 'usr_2', email: 'safety@forgemind.ai', password: 'password123', name: 'Elena Rostova', role: 'Safety Officer', employeeId: 'EHS-1092', department: 'Environmental Health' },
  { _id: 'usr_3', email: 'manager@forgemind.ai', password: 'password123', name: 'Alex Vance', role: 'Plant Manager', employeeId: 'EXEC-001', department: 'Executive Operations' }
];

class AuthService {
  /**
   * Register User
   */
  async registerUser({ name, email, password, role, employeeId, department, phone }) {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Check duplicate email in MongoDB
    let existingUser = null;
    try {
      existingUser = await User.findOne({ email: cleanEmail });
    } catch (e) {
      console.warn('MongoDB query notice, searching runtime fallback repository.');
    }

    if (!existingUser) {
      existingUser = RUNTIME_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    }

    if (existingUser) {
      const error = new Error('Email already exists');
      error.statusCode = 409;
      throw error;
    }

    // 2. Create User document in MongoDB
    let createdUser = null;
    try {
      createdUser = new User({
        name: name.trim(),
        email: cleanEmail,
        password: password,
        role: role,
        employeeId: employeeId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        department: department || 'Operations',
        phone: phone || '',
      });
      await createdUser.save();
    } catch (dbErr) {
      console.warn('MongoDB write notice, storing in runtime fallback repository:', dbErr.message);
    }

    // Fallback store in memory
    const hashedPassword = await bcrypt.hash(password, 10);
    const runtimeUser = {
      _id: createdUser?._id ? createdUser._id.toString() : `usr_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role,
      employeeId: employeeId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      department: department || 'Operations',
      phone: phone || '',
      isVerified: false,
      profileImage: '',
    };

    RUNTIME_USERS.push(runtimeUser);

    return {
      message: 'Account created successfully',
      user: {
        id: runtimeUser._id,
        name: runtimeUser.name,
        email: runtimeUser.email,
        role: runtimeUser.role,
        employeeId: runtimeUser.employeeId,
      },
    };
  }

  /**
   * Login User
   */
  async loginUser({ email, password }) {
    const cleanEmail = email.toLowerCase().trim();
    let dbUser = null;

    // 1. Search in MongoDB User Collection
    try {
      dbUser = await User.findOne({ email: cleanEmail }).select('+password +refreshToken');
    } catch (e) {
      console.warn('MongoDB query notice, searching runtime fallback repository');
    }

    // 2. Search in Runtime Fallback
    if (!dbUser) {
      const runtimeMatch = RUNTIME_USERS.find(
        (u) => (u.email || '').toLowerCase().trim() === cleanEmail
      );
      if (runtimeMatch) {
        const isHashed = runtimeMatch.password.startsWith('$2b$') || runtimeMatch.password.startsWith('$2a$');
        let hashedPass = runtimeMatch.password;
        if (!isHashed) {
          hashedPass = await bcrypt.hash(runtimeMatch.password, 10);
          runtimeMatch.password = hashedPass;
        }

        dbUser = {
          _id: runtimeMatch._id || `usr_${Date.now()}`,
          name: runtimeMatch.name,
          email: runtimeMatch.email,
          password: hashedPass,
          role: runtimeMatch.role,
          employeeId: runtimeMatch.employeeId || 'EMP-1001',
          matchPassword: async (inputPass) => await bcrypt.compare(inputPass, hashedPass),
          save: async () => {},
        };
      }
    }

    // User Not Found Error (404)
    if (!dbUser) {
      const error = new Error('User not found. Please register an account first.');
      error.statusCode = 404;
      throw error;
    }

    // Password Check Error (401)
    const isMatch = dbUser.matchPassword
      ? await dbUser.matchPassword(password)
      : await bcrypt.compare(password, dbUser.password);

    if (!isMatch) {
      const error = new Error('Incorrect password');
      error.statusCode = 401;
      throw error;
    }

    // Generate Tokens
    const payload = { id: dbUser._id.toString(), email: dbUser.email, role: dbUser.role, name: dbUser.name };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save refresh token on user document if DB connected
    try {
      if (dbUser.save && typeof dbUser.save === 'function') {
        dbUser.refreshToken = refreshToken;
        await dbUser.save();
      }
    } catch (saveErr) {}

    return {
      accessToken,
      refreshToken,
      user: {
        id: dbUser._id.toString(),
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        employeeId: dbUser.employeeId || 'EMP-1001',
      },
    };
  }

  /**
   * Refresh Access Token
   */
  async refreshAccessToken(token) {
    if (!token) {
      const error = new Error('Refresh token is required');
      error.statusCode = 400;
      throw error;
    }

    const decoded = verifyRefreshToken(token);
    const payload = { id: decoded.id, email: decoded.email, role: decoded.role, name: decoded.name };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Forgot Password (Generate Reset Token)
   */
  async forgotPassword(email) {
    const cleanEmail = email.toLowerCase().trim();
    let user = null;

    try {
      user = await User.findOne({ email: cleanEmail });
    } catch (e) {}

    if (!user) {
      user = RUNTIME_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    }

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    if (user.save && typeof user.save === 'function') {
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpire = resetPasswordExpire;
      await user.save();
    }

    return {
      message: 'Password reset token generated successfully',
      resetToken,
    };
  }

  /**
   * Reset Password
   */
  async resetPassword(resetToken, newPassword) {
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    let user = null;
    try {
      user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
    } catch (e) {}

    if (!user) {
      const error = new Error('Invalid or expired reset token');
      error.statusCode = 400;
      throw error;
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return {
      message: 'Password updated successfully',
    };
  }

  /**
   * Logout User
   */
  async logoutUser(userId) {
    try {
      await User.findByIdAndUpdate(userId, { refreshToken: null });
    } catch (e) {}
    return { message: 'Logged out successfully' };
  }

  /**
   * Get Profile
   */
  async getProfile(userId) {
    let user = null;
    try {
      user = await User.findById(userId).select('-password');
    } catch (e) {}

    if (!user) {
      user = RUNTIME_USERS.find((u) => u._id === userId || u.email === userId);
    }

    return user;
  }

  /**
   * Update Profile
   */
  async updateProfile(userId, updateData) {
    const allowedFields = ['name', 'phone', 'profileImage', 'department'];
    const filtered = {};

    Object.keys(updateData || {}).forEach((key) => {
      if (allowedFields.includes(key)) {
        filtered[key] = updateData[key];
      }
    });

    let updated = null;
    try {
      updated = await User.findByIdAndUpdate(userId, filtered, { new: true }).select('-password');
    } catch (e) {}

    if (!updated) {
      const idx = RUNTIME_USERS.findIndex((u) => u._id === userId);
      if (idx !== -1) {
        Object.assign(RUNTIME_USERS[idx], filtered);
        updated = RUNTIME_USERS[idx];
      }
    }

    return updated;
  }
}

module.exports = new AuthService();
