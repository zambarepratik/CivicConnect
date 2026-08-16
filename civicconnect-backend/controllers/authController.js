const supabase = require('../config/supabase');

// SIGNUP LOGIC (PUBLIC USER REGISTRATION)
const signup = async (req, res) => {
  try {
    // 1. Extract only standard user fields from request body
    const { email, password, fullName } = req.body;

    // Hardcode user role to prevent unauthorized privilege escalation
    const userRole = 'user';

    // Validation: Check required fields
    if (!email || !password || !fullName) {
      return res.status(400).json({ 
        success: false, 
        message: "Email, password, and full name are required!" 
      });
    }

    // 2. Create account in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // 3. Save user details in profiles table with enforced 'user' role
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: fullName,
          email: email,
          role: userRole,
          department: null
        }
      ]);

    if (profileError) throw profileError;

    // 4. Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: authData.user.id,
        email,
        fullName,
        role: userRole
      }
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// LOGIN LOGIC
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation: Check required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required!" 
      });
    }

    // 2. Sign in using Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;

    // 3. Fetch user profile details including role
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    // 4. Send access token and profile info in response
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token: data.session.access_token,
      user: profileData
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET LOGGED-IN USER PROFILE (PROTECTED)
const getMe = async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      user: profile
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET ALL USERS (ADMIN ONLY)
const getAllUsers = async (req, res) => {
  try {
    // 1. Fetch all user data from profiles table
    const { data: users, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) throw error;

    // 2. Send success response with total count and users list
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// CREATE OFFICER (SUPER ADMIN ONLY)
const createOfficer = async (req, res) => {
  try {
    const { email, password, fullName, department } = req.body;

    // 1. Validation: Check required officer fields
    if (!email || !password || !fullName || !department) {
      return res.status(400).json({
        success: false,
        message: "Email, password, full name, and department are required!"
      });
    }

    // 2. Create account in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // 3. Insert into profiles with enforced 'officer' role and department
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: fullName,
          email: email,
          role: 'officer',
          department: department
        }
      ]);

    if (profileError) throw profileError;

    // 4. Return success response
    res.status(201).json({
      success: true,
      message: "Officer account created successfully!",
      officer: {
        id: authData.user.id,
        email,
        fullName,
        role: 'officer',
        department
      }
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
// BOOTSTRAP SUPER ADMIN (INITIAL SETUP)
const bootstrapSuperAdmin = async (req, res) => {
  try {
    const { email, password, fullName, secretKey } = req.body;

    // Check secret key from env or fallback hardcoded key
    const validSecret = process.env.ADMIN_SECRET_KEY || process.env.SUPER_ADMIN_SECRET || "PratikSecretKey123";

    if (secretKey !== validSecret) {
      return res.status(403).json({ 
        success: false, 
        message: "Invalid Secret Key!" 
      });
    }

    if (!email || !password || !fullName) {
      return res.status(400).json({ 
        success: false, 
        message: "Email, password, and full name are required!" 
      });
    }

    // Create Super Admin in Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Insert as 'super_admin' in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: fullName,
          email: email,
          role: 'super_admin',
          department: null
        }
      ]);

    if (profileError) throw profileError;

    res.status(201).json({
      success: true,
      message: "Super Admin created successfully!",
      user: {
        id: authData.user.id,
        email,
        fullName,
        role: 'super_admin'
      }
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


module.exports = { bootstrapSuperAdmin,signup, login, getMe, getAllUsers,createOfficer  };