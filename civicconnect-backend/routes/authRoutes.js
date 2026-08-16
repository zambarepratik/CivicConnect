const express = require('express');
const router = express.Router();

const { 
  bootstrapSuperAdmin, 
  signup, 
  login, 
  getMe, 
  getAllUsers, 
  createOfficer 
} = require('../controllers/authController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Public Routes
router.post('/bootstrap-super-admin', bootstrapSuperAdmin);
router.post('/signup', signup);
router.post('/login', login);

// Protected Routes
router.get('/me', protect, getMe);
router.get('/users', protect, authorize('admin', 'super_admin'), getAllUsers);
router.post('/create-officer', protect, authorize('super_admin'), createOfficer);

module.exports = router;