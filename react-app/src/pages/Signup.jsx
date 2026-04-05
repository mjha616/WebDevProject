import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Pre-validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      alert("Sign up successful! Please log in.");
      navigate('/login');
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <div className="form-container">

        <h2 className="form-title" style={{ marginBottom: "0.5rem" }}>Create an Account</h2>
        <p className="form-subtitle" style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Join us to book tickets instantly 🍿</p>

        {/* ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* NAME */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group password-group">
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group password-group">
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ marginTop: '1rem', padding: '0.8rem', width: '100%', fontSize: '1rem' }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="form-footer" style={{ textAlign: "center", marginTop: "1.5rem" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--primary-color)", textDecoration: "none" }}>Login</Link>
        </p>

      </div>
    </section>
  );
};

export default Signup;
