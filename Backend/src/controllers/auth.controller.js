const authService = require('../services/auth.service');
const { validateRegister, validateLogin, validateResetPassword } = require('../validators/auth.validator');

class AuthController {
  /**
   * POST /api/auth/register
   */
  async register(req, res) {
    try {
      const validation = validateRegister(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.errorMessage,
          errors: validation.errors,
        });
      }

      const result = await authService.registerUser(req.body);
      return res.status(201).json({
        success: true,
        message: result.message || 'Account created successfully',
        user: result.user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || 'Internal Server Error',
      });
    }
  }

  /**
   * POST /api/auth/login
   */
  async login(req, res) {
    try {
      const validation = validateLogin(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.errorMessage,
          errors: validation.errors,
        });
      }

      const result = await authService.loginUser(req.body);
      return res.status(200).json({
        success: true,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        token: result.accessToken, // Token alias for compatibility
        user: result.user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || 'Internal Server Error',
      });
    }
  }

  /**
   * POST /api/auth/refresh-token
   */
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshAccessToken(refreshToken);
      return res.status(200).json({
        success: true,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      const status = error.statusCode || 401;
      return res.status(status).json({
        success: false,
        message: error.message || 'Invalid refresh token',
      });
    }
  }

  /**
   * POST /api/auth/forgot-password
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }

      const result = await authService.forgotPassword(email);
      return res.status(200).json({
        success: true,
        message: result.message,
        resetToken: result.resetToken,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || 'Internal Server Error',
      });
    }
  }

  /**
   * POST /api/auth/reset-password
   */
  async resetPassword(req, res) {
    try {
      const validation = validateResetPassword(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.errorMessage,
        });
      }

      const { resetToken, password } = req.body;
      if (!resetToken) {
        return res.status(400).json({ success: false, message: 'Reset token is required' });
      }

      const result = await authService.resetPassword(resetToken, password);
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      const status = error.statusCode || 400;
      return res.status(status).json({
        success: false,
        message: error.message || 'Reset password failed',
      });
    }
  }

  /**
   * POST /api/auth/logout
   */
  async logout(req, res) {
    try {
      const userId = req.user?.id;
      if (userId) {
        await authService.logoutUser(userId);
      }
      return res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Logout failed',
      });
    }
  }

  /**
   * GET /api/auth/profile
   */
  async getProfile(req, res) {
    try {
      const user = await authService.getProfile(req.user.id);
      return res.status(200).json({
        success: true,
        user: user || req.user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch user profile',
      });
    }
  }

  /**
   * PUT /api/auth/profile
   */
  async updateProfile(req, res) {
    try {
      const updatedUser = await authService.updateProfile(req.user.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update user profile',
      });
    }
  }

  /**
   * GET /api/auth/me
   */
  async me(req, res) {
    return this.getProfile(req, res);
  }
}

const controllerInstance = new AuthController();

exports.register = controllerInstance.register.bind(controllerInstance);
exports.login = controllerInstance.login.bind(controllerInstance);
exports.refreshToken = controllerInstance.refreshToken.bind(controllerInstance);
exports.forgotPassword = controllerInstance.forgotPassword.bind(controllerInstance);
exports.resetPassword = controllerInstance.resetPassword.bind(controllerInstance);
exports.logout = controllerInstance.logout.bind(controllerInstance);
exports.getProfile = controllerInstance.getProfile.bind(controllerInstance);
exports.updateProfile = controllerInstance.updateProfile.bind(controllerInstance);
exports.me = controllerInstance.me.bind(controllerInstance);

exports.registerUser = exports.register;
exports.loginUser = exports.login;
exports.getMe = exports.getProfile;
