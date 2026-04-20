// =========================================
//   MOVIES SEED DATA (Backend Source of Truth)
// =========================================

const moviesData = [
  {
    id: 1,
    title: "The Super Mario Galaxy Movie",
    genre: "Adventure",
    language: "English",
    rating: 8.5,
    duration: "1h 38m",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VVJdj9hf5DlE6Ael9Ls3H-2sLPrIZ9SPT5RH1Ty1SETl_iS-tpMGSqzH-jNZn7-gieqY&s=10",
    description: "The beloved plumber is back in an epic intergalactic adventure. Mario and his friends must traverse the stars to save Princess Peach from the clutches of Bowser, who has discovered a power source capable of reshaping the galaxy itself.",
    cast: ["Chris Pratt", "Anya Taylor-Joy", "Jack Black"],
    status: "now",
    trailer: null
  },
  {
    id: 2,
    title: "Project Hail Mary",
    genre: "Sci-Fi",
    language: "English",
    rating: 9.1,
    duration: "2h 30m",
    poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4xLzEwICAzMS42SysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00451760-bqrmlwxxqs-portrait.jpg",
    description: "A lone astronaut wakes up millions of miles from Earth with no memory of how he got there. As he pieces together the truth, he discovers he may be humanity's last hope against an extinction-level threat.",
    cast: ["Ryan Gosling", "Sandra Huller"],
    status: "now",
    trailer: null
  },
  {
    id: 3,
    title: "Dhurandhar: The Revenge",
    genre: "Action",
    language: "Hindi",
    rating: 9.4,
    duration: "3h 50m",
    poster: "https://preview.redd.it/new-official-poster-for-dhurandhar-the-revenge-v0-yl3vkwo6l0og1.jpeg?width=640&crop=smart&auto=webp&s=299983205b63389ff46f731a604bd3a0ebd97b23",
    description: "The rise of crime lord Hamza Ali Mazari takes a terrifying turn when a ghost from his past — a man he thought dead — returns with relentless fury to tear down his empire. A raw, visceral revenge saga.",
    cast: ["Ranveer Singh", "Arjun Rampal", "Aishwarya Rai"],
    status: "now",
    trailer: null
  },
  {
    id: 4,
    title: "Toxic",
    genre: "Action",
    language: "Hindi",
    rating: null,
    duration: "3h 50m",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiA1ARM8uVfYJ-KxP_3wlkJXBxSWV9bt8qjQ&s",
    description: "When a ruthless underworld kingpin's empire begins to crumble from within, loyalties are shattered and blood is spilled. A high-octane crime thriller about power, betrayal, and survival.",
    cast: ["Yash", "Kiara Advani"],
    status: "upcoming",
    trailer: null
  },
  {
    id: 5,
    title: "MaatruBhumi",
    genre: "Drama",
    language: "Hindi",
    rating: null,
    duration: "2h 30m",
    poster: "https://img.mathrubhumi.com/view/acePublic/alias/contentid/1pttuaddpe3i5ixsnam/0/maathrubhumi-jpg.webp?f=3%3A2&q=0.75&w=900",
    description: "Set against the backdrop of a nation at war, a soldier's unwavering love for his motherland is tested beyond imagination. An emotionally charged war epic that celebrates sacrifice and honor.",
    cast: ["Salman Khan"],
    status: "upcoming",
    trailer: null
  },
  {
    id: 6,
    title: "Spider-Man: Brand New Day",
    genre: "Action",
    language: "English",
    rating: null,
    duration: "TBA",
    poster: "https://cdn.marvel.com/content/2x/spidermanbrandnewday_lob_crd_01.jpg",
    description: "Peter Parker faces his most personal challenge yet — a world that no longer remembers Spider-Man. Rebuilding his life from scratch, he must forge a brand new legacy in the face of all-new threats.",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    status: "upcoming",
    trailer: null
  },
  {
    id: 7,
    title: "The Kerala Story 2",
    genre: "Drama",
    language: "Hindi",
    rating: 9.2,
    duration: "2h 11m",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/The_Kerala_Story_2.jpeg/250px-The_Kerala_Story_2.jpeg",
    description: "Across three Indian states, three young women defy family and tradition for love, only to slip into unseen cages of control and silence. What begins as romance mutates into manipulation, until the women strike back.",
    cast: ["Aditi Bhatia", "Ulka Gupta"],
    status: "now",
    trailer: null
  },
  {
    id: 8,
    title: "Ready or Not 2",
    genre: "Horror",
    language: "English",
    rating: 8.2,
    duration: "1h 50m",
    poster: "https://lh3.googleusercontent.com/proxy/X6olroEgnK-hfJ1cTCkZ00SjqWZUemBO_JDJR5O62skYVd2vt9z3-Lc8QZKjg12sXGXSltEUGUsziJ8T-DQUmzK_fjOzg6rCZYmXaVBfXAlUm-UOLQ",
    description: "Sisterhood. Vengeance. Power. They are back for round two and the hunt is bloodier than ever. Ready or not? The rules have changed — and this time, she's not the prey.",
    cast: ["Samara Weaving", "Kathryn Newton"],
    status: "now",
    trailer: null
  },
  {
    id: 9,
    title: "The Drama",
    genre: "Romance",
    language: "English",
    rating: null,
    duration: "TBA",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7ZffBxYpNEU5h6k9uL1alMQ2LrLYcUNurw&s",
    description: "Set in the final days before a wedding, Emma and Charlie face a revelation that sends their relationship spiraling into tension, uncertainty, and emotional chaos. Some truths can't be walked back.",
    cast: ["Robert Pattinson", "Zendaya"],
    status: "upcoming",
    trailer: null
  },
  {
    id: 10,
    title: "Behadd",
    genre: "Drama",
    language: "Gujarati",
    rating: 8.4,
    duration: "2h 11m",
    poster: "https://m.media-amazon.com/images/M/MV5BYWI0MDQzYmEtYjBkNi00ZjZiLTk1NTgtMmFmYzY5MjgwYTg3XkEyXkFqcGc@._V1_.jpg",
    description: "Krisha falls into a trap set by Shaswat, who hides his real identity. Drawn toward marriage, she faces the disturbing reality of deceit and forced conversion in this harrowing true-events inspired drama.",
    cast: ["Danish Gandhi", "Hitu Kondia"],
    status: "now",
    trailer: null
  }
];

export default moviesData;
