/* MOVIE BOOKING API — FRONTEND SERVICE LAYER All calls go to Express backend via Vite proxy */

const API_BASE = '/api';

//  Helper: get stored JWT token 
export const getToken = () => localStorage.getItem('token');

// Helper: auth headers 
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

//  Generic request handler 
const request = async (url, options = {}) => {
  const res = await fetch(`${API_BASE}${url}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

/*  MOVIES */

export const getMovies = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/movies${query ? `?${query}` : ''}`);
};

export const getMovieById = (id) => request(`/movies/${id}`);

export const getNowShowing = () => request('/movies/now-showing');

export const getUpcoming = () => request('/movies/upcoming');

export const getGenres = () => request('/movies/genres');

/* AUTH */

export const signupUser = ({ name, email, password }) =>
  request('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

export const loginUser = ({ email, password }) =>
  request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

/* SHOWTIMES (Seat locking USP) */

export const getShowtimeSeats = (movieId, date, time) => {
  const encodedDate = encodeURIComponent(date);
  const encodedTime = encodeURIComponent(time);
  return request(`/showtimes/${movieId}/${encodedDate}/${encodedTime}/seats`);
};

/* BOOKINGS */

export const createBooking = ({ movieId, seats, date, time, total }) =>
  request('/bookings', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ movieId, seats, date, time, total }),
  });

export const getMyBookings = () =>
  request('/bookings/my', {
    headers: authHeaders(),
  });