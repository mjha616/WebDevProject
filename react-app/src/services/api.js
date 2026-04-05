/* =========================================
   CLEAN MOVIE DATA (FIXED)
========================================= */

const moviesData = [
  {
    id: 1,
    title: "The Super Mario Galaxy Movie",
    genre: "Adventure, Animation",
    language: "English",
    rating: 8.5,
    duration: "1h 38m",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VVJdj9hf5DlE6Ael9Ls3H-2sLPrIZ9SPT5RH1Ty1SETl_iS-tpMGSqzH-jNZn7-gieqY&s=10",
    description: "Animated Mario universe expansion.",
    cast: ["Chris Pratt", "Anya Taylor-Joy"],
    status: "now"
  },
  {
    id: 2,
    title: "Project Hail Mary",
    genre: "Sci-Fi",
    language: "English",
    rating: 9.1,
    duration: "2h 30m",
    poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4xLzEwICAzMS42SysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00451760-bqrmlwxxqs-portrait.jpg",
    description: "Astronaut saves Earth.",
    cast: ["Ryan Gosling", "Sandra Huller"],
    status: "now"
  },
  {
    id: 3,
    title: "Dhurandhar The Revenge",
    genre: "Action",
    language: "Hindi",
    rating: 9.4,
    duration: "3h 50m",
    poster: "https://preview.redd.it/new-official-poster-for-dhurandhar-the-revenge-v0-yl3vkwo6l0og1.jpeg?width=640&crop=smart&auto=webp&s=299983205b63389ff46f731a604bd3a0ebd97b23",
    description: "Rise of Hamza Ali Mazari.",
    cast: ["Ranveer Singh", "Arjun Rampal"],
    status: "now"
  },
  {
    id: 4,
    title: "Toxic",
    genre: "Action",
    language: "Hindi",
    rating: null,
    duration: "3h 50m",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiA1ARM8uVfYJ-KxP_3wlkJXBxSWV9bt8qjQ&s",
    description: "Crime empire story.",
    cast: ["Yash", "Kiara Advani"],
    status: "upcoming"
  },
  {
    id: 5,
    title: "MaatruBhumi",
    genre: "Action",
    language: "Hindi",
    rating: null,
    duration: "2h 30m",
    poster: "https://img.mathrubhumi.com/view/acePublic/alias/contentid/1pttuaddpe3i5ixsnam/0/maathrubhumi-jpg.webp?f=3%3A2&q=0.75&w=900",
    description: "War-based story.",
    cast: ["Salman Khan"],
    status: "upcoming"
  },
  {
    id: 6,
    title: "Spider-Man: Brand New Day",
    genre: "Action",
    language: "English",
    rating: null,
    duration: "TBA",
    poster: "https://cdn.marvel.com/content/2x/spidermanbrandnewday_lob_crd_01.jpg",
    description: "Next Spider-Man story.",
    cast: ["Tom Holland", "Zendaya"],
    status: "upcoming"
  },
  {
    id: 7,
    title: "The Kerala Story 2:Goes Beyond",
    genre: "Drama",
    language: "Hindi",
    rating: 9.2,
    duration: "2h 11m",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/The_Kerala_Story_2.jpeg/250px-The_Kerala_Story_2.jpeg",
    description: "Across three Indian states, three young women defy family and tradition for love, only to slip into unseen cages of control and silence. What begins as romance and rebellion mutates into manipulation and loss of freedom, until the women strike back, turning captivity into a battlefield for survival.",
    cast: ["Aditi Bhatia", "Ulka Gupta"],
    status: "now"
  },
  {
    id: 8,
    title: "Ready or Not 2: Here I Come",
    genre: "Horror",
    language: "English",
    rating: 8.2,
    duration: "1h 50m",
    poster: "https://lh3.googleusercontent.com/proxy/X6olroEgnK-hfJ1cTCkZ00SjqWZUemBO_JDJR5O62skYVd2vt9z3-Lc8QZKjg12sXGXSltEUGUsziJ8T-DQUmzK_fjOzg6rCZYmXaVBfXAlUm-UOLQ",
    description: "Sisterhood. Vengeance. Power - the hunt is on. Ready or not? They are back for round two.",
    cast: ["Samara Weaving", "Kathryn Newton"],
    status: "now"
  },
  {
    id: 9,
    title: "The Drama",
    genre: "Romance,Drama",
    language: "English",
    rating: null,
    duration: "upcoming",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7ZffBxYpNEU5h6k9uL1alMQ2LrLYcUNurw&s",
    description: "Set in the final days before a wedding, the story follows Emma and Charlie as one revelation sends their relationship spiraling into tension, uncertainty, and emotional chaos.",
    cast: ["Robert Pattison", "Zendaya"],
    status: "upcoming"
  },
  {
    id: 10,
    title: "Behadd",
    genre: "Drama",
    language: "Gujarati",
    rating: 8.4,
    duration: "2h 11m",
    poster: "https://m.media-amazon.com/images/M/MV5BYWI0MDQzYmEtYjBkNi00ZjZiLTk1NTgtMmFmYzY5MjgwYTg3XkEyXkFqcGc@._V1_.jpg",
    description: "The story follows Krisha, a young girl who falls into a trap set by a boy named Shaswat, who hides his real name and identity. Unaware of his true intentions, Krisha is drawn toward marriage, only to face the disturbing reality of deceit and forced religious conversion.",
    cast: ["Danish Gandhi", "Hitu Kondia"],
    status: "now"
  }
];

/* =========================================
   API ENGINE
========================================= */

const simulateAPI = (data, delay = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

/* =========================================
   NORMALIZATION (SAFE)
========================================= */

const normalizeMovie = (movie) => ({
  ...movie,
  rating: movie.rating ?? "N/A",
  duration: movie.duration || "TBA",
  cast: movie.cast || [],
});

/* =========================================
   MOVIE APIs
========================================= */

export const getMovies = async () => {
  return simulateAPI(moviesData.map(normalizeMovie));
};

export const getMovieById = async (id) => {
  const movie = moviesData.find(m => m.id === Number(id));
  if (!movie) throw new Error("Movie not found");
  return simulateAPI(normalizeMovie(movie));
};

export const getNowShowing = async () => {
  return simulateAPI(
    moviesData
      .filter(m => m.status === "now")
      .map(normalizeMovie)
  );
};

export const getUpcoming = async () => {
  return simulateAPI(
    moviesData
      .filter(m => m.status === "upcoming")
      .map(normalizeMovie)
  );
};

/* =========================================
   AUTH
========================================= */

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  return simulateAPI({
    token: "fake-jwt-token",
    user: { email }
  }, 500);
};