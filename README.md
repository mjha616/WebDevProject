# Movie Ticket Booking Web App - College Project

This is a complete frontend project designed for a 3-member team. The project architecture is structured so that it can be seamlessly upgraded to a complete MERN stack (MongoDB, Express, React, Node.js) application in the next phase.

## Tech Stack Division

### Member 1: HTML + CSS (`/html-css`)
- Responsible for semantic HTML structure and responsive design.
- Uses vanilla CSS for styling (no external CSS frameworks to show core concepts).
- Files: `index.html`, `movies.html`, `movie-details.html`, `booking-summary.html`, `confirmation.html`, `login.html`, `signup.html`, `style.css`.

### Member 2: JavaScript (`/javascript`)
- Responsible for DOM manipulation and interactive logic.
- Implements dynamic movie loading, seat selection, and price calculation.
- Files: `script.js` (logic) and `data.js` (simulated database).

### Member 3: React (`/react-app`)
- Converts the entire Vanilla UI into modern, reusable React components.
- Sets up routing using React Router Data.
- Simulates API integration using `services/api.js`.

---

## 🚀 How to Run the Project Local

### Option A: Vanilla Version (HTML/CSS/JS)
1. Open the project folder `html-css`.
2. Double-click on `index.html` to open it in any web browser (Chrome/Firefox).
3. Navigation, seat selection, and price calculations will work automatically thanks to the linked `../javascript/script.js`.

### Option B: React Version
1. Open a terminal and navigate to the `react-app` folder:
   ```bash
   cd react-app
   ```
2. Install dependencies (Node.js must be installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the localhost URL provided in the terminal (usually `http://localhost:5173`).

---



