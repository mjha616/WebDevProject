import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(formData);

      if (response?.token) {
        alert("Login successful!");
        // Future: localStorage.setItem("token", response.token);
        navigate('/');
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <div className="form-container">

        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Login to continue 🎬</p>

        {/* ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email Address</label>
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
            <label>Password</label>
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

          {/* BUTTON */}
          <button
            type="submit"
            className="btn full-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* SIGNUP LINK */}
        <p className="form-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

      </div>
    </section>
  );
};

export default Login;