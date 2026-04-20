const moviesData = [
  {
    id: 1,
    title: "The Super Mario Galaxy Movie",
    genre: "Adventure,Animation",
    language: "English",
    rating: 8.5,
    duration: "1h 38m",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VVJdj9hf5DlE6Ael9Ls3H-2sLPrIZ9SPT5RH1Ty1SETl_iS-tpMGSqzH-jNZn7-gieqY&s=10",
    description: "The Super Mario Galaxy Movie is an animated film based on the world of Super Mario Bros., and follows The Super Mario Bros. Movie, which released in 2023.",
    cast: ["Chris Pratt", "Anna Taylor-Joy"],
    status: "now"
  },
  {
    id: 2,
    title: "Project Hail Mary",
    genre: "Sci-Fi",
    language: "English",
    rating: 9.1,
    duration: "2h 30m",
    poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4xLzEwICAzMS41SysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00451760-bqrmlwxxqs-portrait.jpg",
    description: "Science teacher Ryland Grace wakes up alone on a spaceship, light-years from Earth. As his memory returns, he uncovers a mission to stop a mysterious substance killing the Sun and save Earth. An unexpected friendship may be the key..",
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
    description: "Dhurandhar The Revenge introduces Jaskirat Singh Rangi, tracing the chain of events that compel him to become Hamza Ali Mazari, and follows his rise as he operates deep inside Pakistan.",
    cast: ["Ranveer Singh", "Arjun Rampal"],
    status: "now"
  },
  {
    id: 4,
    title: "Toxic: A Fairy Tale for Grown-ups",
    genre: "Action",
    language: "Hindi",
    rating: tba,
    duration: "3h 50m",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiA1ARM8uVfYJ-KxP_3wlkJXBxSWV9bt8qjQ&s",
    description: "Set in Goa between the early 1940s and the 1970s, Toxic is a savage action-thriller saga that plunges into the rot festering beneath paradise. In this coastal land of fading colonial shadows and rising crime syndicates, a man forges his empire through blood, fear, and betrayal. Power is not granted-it is seized, and it always demands repayment. As smuggling routes become battlegrounds and loyalties unravel into suspicion, paranoia turns into a means of survival. In the end, the only force more powerful than the consequences of his choices is the abyss within him.",
    cast: ["Yash", "Kiara Advani"],
    status: "upcoming"
  },
  {
    id: 5,
    title: "MaatruBhumi: May War Rest in Peace",
    genre: "Action",
    language: "Hindi",
    rating: "TBA",
    duration: "2h 30m",
    poster: "https://img.mathrubhumi.com/view/acePublic/alias/contentid/1pttuaddpe3i5ixsnam/0/maathrubhumi-jpg.webp?f=3%3A2&q=0.75&w=900",
    description: "Dhurandhar The Revenge introduces Jaskirat Singh Rangi, tracing the chain of events that compel him to become Hamza Ali Mazari, and follows his rise as he operates deep inside Pakistan.",
    cast: ["Salman Khan"],
    status: "upcoming"
  },
  {
    id: 6,
    title: "Spider-Man: Brand New Day",
    genre: "Action",
    language: "English",
    rating: 9.4,
    duration: "TBA",
    poster: "https://cdn.marvel.com/content/2x/spidermanbrandnewday_lob_crd_01.jpg",
    description: "The fourth installment in the MCU Spider-Man franchise.",
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

/* API SIMULATION */

// Generic delay function
const simulateDelay = (data, time = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), time);
  });
};

/* MOVIES  */

// Get all movies
const getMovies = async () => {
  try {
    return await simulateDelay(moviesData);
  } catch (err) {
    throw new Error("Failed to fetch movies");
  }
};

// Get movie by ID
const getMovieById = async (id) => {
  try {
    const movie = moviesData.find(m => m.id === Number(id));
    if (!movie) throw new Error("Movie not found");
    return await simulateDelay(movie);
  } catch (err) {
    throw err;
  }
};

// Get Now Showing
const getNowShowing = async () => {
  return await simulateDelay(
    moviesData.filter(m => m.status === "now")
  );
};

// Get Upcoming
const getUpcoming = async () => {
  return await simulateDelay(
    moviesData.filter(m => m.status === "upcoming")
  );
};

// Search movies
const searchMovies = async (query) => {
  return await simulateDelay(
    moviesData.filter(m =>
      m.title.toLowerCase().includes(query.toLowerCase())
    )
  );
};

/* AUTH  */

const loginUser = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          token: "fake-jwt-token",
          user: { email }
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
};