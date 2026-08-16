const supabase = require('../config/supabase');

// PROTECT MIDDLEWARE (AUTHENTICATION)
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided!'
      });
    }

    // 1. Verify token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token!'
      });
    }

    // 2. Fetch latest user profile & role directly from DB
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found!'
      });
    }

    // Attach verified DB user profile to request
    req.user = profile;
    next();

  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
};

// AUTHORIZE MIDDLEWARE (ROLE-BASED ACCESS CONTROL)
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user's role from DB profile exists in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this route!`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };