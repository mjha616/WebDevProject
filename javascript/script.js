document.addEventListener('DOMContentLoaded', () => {

  renderMovies();
  renderMovieDetails();
  initSeatSelection();
  loadBookingSummary();
  handleAuth();

});

// MOVIES (HOME + MOVIES PAGE)

async function renderMovies() {
  const movieGrid = document.getElementById('movie-grid');
  const nowShowingGrid = document.getElementById('now-showing');
  const upcomingGrid = document.getElementById('upcoming');
  const searchInput = document.getElementById('search');

  const movies = await getMovies();

  const displayMovies = (list, container) => {
    if (!container) return;

    container.innerHTML = '';
    list.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';

      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.genre} • ${movie.language}</p>
        </div>
      `;

      card.onclick = () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
      };

      container.appendChild(card);
    });
  };

  // Home Page
  if (nowShowingGrid || upcomingGrid) {
    displayMovies(movies.filter(m => m.status === "now"), nowShowingGrid);
    displayMovies(movies.filter(m => m.status === "upcoming"), upcomingGrid);
  }

  // Movies Page
  if (movieGrid) {
    displayMovies(movies, movieGrid);

    // 🔍 Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = movies.filter(m =>
          m.title.toLowerCase().includes(value)
        );
        displayMovies(filtered, movieGrid);
      });
    }
  }
}


// MOVIE DETAILS

async function renderMovieDetails() {
  const container = document.getElementById('movie-details');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id');

  const movie = await getMovieById(movieId);

  if (!movie) return;

  container.innerHTML = `
    <div class="details-layout">
      <img src="${movie.poster}" class="details-poster">
      <div class="details-content">
        <h1>${movie.title}</h1>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Duration:</strong> ${movie.duration}</p>
        <p><strong>Rating:</strong> ${movie.rating}</p>
        <p><strong>Cast:</strong> ${movie.cast.join(', ')}</p>
        <p>${movie.description}</p>

        <a href="seat-selection.html?id=${movie.id}" class="btn">
          🎟️ Book Tickets
        </a>
      </div>
    </div>
  `;
}

// SEAT SELECTION
function initSeatSelection() {
  const container = document.getElementById('seat-grid');
  if (!container) return;

  const rows = 5;
  const cols = 8;
  const ticketPrice = 150;

  let selectedSeats = [];

  for (let r = 0; r < rows; r++) {
    const row = document.createElement('div');
    row.className = 'seat-row';

    for (let c = 1; c <= cols; c++) {
      const seatId = String.fromCharCode(65 + r) + c;

      const seat = document.createElement('div');
      seat.className = 'seat';
      seat.innerText = seatId;

      // Random booked
      if (Math.random() < 0.2) {
        seat.classList.add('booked');
      }

      seat.onclick = () => {
        if (seat.classList.contains('booked')) return;

        seat.classList.toggle('selected');

        if (selectedSeats.includes(seatId)) {
          selectedSeats = selectedSeats.filter(s => s !== seatId);
        } else {
          selectedSeats.push(seatId);
        }

        updatePrice();
      };

      row.appendChild(seat);
    }

    container.appendChild(row);
  }

  const priceDisplay = document.getElementById('total-price');
  const button = document.getElementById('confirm-booking');

  function updatePrice() {
    priceDisplay.innerText = selectedSeats.length * ticketPrice;
  }

  button.onclick = () => {
    if (selectedSeats.length === 0) {
      alert("Select at least one seat");
      return;
    }

    localStorage.setItem('seats', JSON.stringify(selectedSeats));
    localStorage.setItem('total', selectedSeats.length * ticketPrice);

    window.location.href = "booking-summary.html";
  };
}

// BOOKING SUMMARY

function loadBookingSummary() {
  const container = document.getElementById('summary-details');
  if (!container) return;

  const seats = JSON.parse(localStorage.getItem('seats')) || [];
  const total = localStorage.getItem('total');

  container.innerHTML = `
    <p><strong>Seats:</strong> ${seats.map(seat => seat.id).join(', ')}</p>
    <p><strong>Total:</strong> ₹${total}</p>
  `;
}

// AUTH


function handleAuth() {
  const form = document.getElementById('auth-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    alert("Login/Signup successful (Demo)");

    window.location.href = "index.html";
  });
}