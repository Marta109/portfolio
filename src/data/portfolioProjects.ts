/**
 * Portfolio projects for the projects page.
 * Human-editable narrative copy lives in `src/content/projectsPortfolio.md`;
 * keep titles, links, and descriptions aligned when updating.
 *
 * Preview images: `public/images/projects/{id}.png` — replace placeholders with your screenshots.
 */
import type {WorkProjectTag} from "@/pages/projects/constants";

export type WorkProject = {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  taskUrl?: string;
  imageUrl: string;
  tagLabels: string[];
  filters: WorkProjectTag[];
};

export const PORTFOLIO_PROJECTS: WorkProject[] = [
  {
    id: "rss-puzzle-react",
    title: "RSS Puzzle (React Edition)",
    description:
      "Modern rebuild of English learning game. Players build English sentences from shuffled words with multiple difficulty levels and hint types (image, translation, pronunciation). Each completed round reveals a part of a famous painting — a unique mix of language learning and cultural discovery.\n\nEnhanced version of original JavaScript project with React 18 + Vite architecture, improved artwork discovery system, and advanced learning analytics.",
    liveUrl: "https://react-puzzle-rust.vercel.app/",
    repoUrl: "https://github.com/Marta109/React-Puzzle/",
    imageUrl: "/images/projects/rss-puzzle-react.png",
    tagLabels: ["REACT", "TYPESCRIPT", "VITE"],
    filters: ["react", "typescript"],
  },
  {
    id: "movie-bookmarks",
    title: "MovieBookmarks",
    description:
      "Interactive movie discovery platform with bookmarking system and film trivia quiz. Built with React and powered by TMDB API.\n\nKey features: movie search and detailed information viewing; save favorite movies to bookmarks; quiz section with questions about movies, actors, and genres; uses external API to fetch movie information.",
    liveUrl: "https://marta109.github.io/Movie-Bookmarks",
    repoUrl: "https://github.com/Marta109/Movie-Bookmarks",
    imageUrl: "/images/projects/movie-bookmarks.png",
    tagLabels: ["REACT", "TYPESCRIPT", "API"],
    filters: ["react", "typescript"],
  },
  {
    id: "memory-game",
    title: "Memory Game",
    description:
      "Interactive memory challenge built with React. Choose a theme (animals, flowers, tools, etc.), memorize the position of the pictures in 10 seconds, then guess where they were.",
    liveUrl: "https://marta109.github.io/Memory-game/",
    repoUrl: "https://github.com/Marta109/Memory-game",
    imageUrl: "/images/projects/memory-game.png",
    tagLabels: ["REACT", "TYPESCRIPT"],
    filters: ["react", "typescript"],
  },
  {
    id: "todo-app",
    title: "ToDo App",
    description:
      "Task management made simple. React-powered to-do list with full CRUD operations, filtering, and external data fetching.",
    liveUrl: "https://marta109.github.io/Todo/",
    repoUrl: "https://github.com/Marta109/Todo",
    imageUrl: "/images/projects/todo-app.png",
    tagLabels: ["REACT", "TYPESCRIPT"],
    filters: ["react", "typescript"],
  },
  {
    id: "rss-puzzle-js",
    title: "RSS Puzzle (JavaScript)",
    description:
      "Interactive English learning game. Assemble sentences from jumbled words with different difficulty levels, pronunciation, and hints.\n\nCreated as part of The Rolling Scopes School course (task with strict requirements, deadlines, and peer or mentor review).",
    liveUrl: "https://rolling-scopes-school.github.io/marta109-JSFE2023Q4/rss-puzzle/index.html",
    repoUrl: "https://github.com/Marta109/RSS-Puzzle",
    taskUrl: "https://github.com/rolling-scopes-school/tasks/tree/master/stage2/tasks/puzzle",
    imageUrl: "/images/projects/rss-puzzle-js.png",
    tagLabels: ["JAVASCRIPT"],
    filters: ["javascript"],
  },
  {
    id: "nonograms",
    title: "Nonograms",
    description:
      "Logic puzzle game where you reveal hidden pictures using number clues.\n\nRolling Scopes School task with strict requirements and review.",
    liveUrl: "https://rolling-scopes-school.github.io/marta109-JSFE2023Q4/nonograms/index.html",
    repoUrl: "https://github.com/Marta109/Nonograms",
    taskUrl: "https://github.com/rolling-scopes-school/tasks/tree/master/tasks/nonograms",
    imageUrl: "/images/projects/nonograms.png",
    tagLabels: ["JAVASCRIPT", " "],
    filters: ["javascript"],
  },
  {
    id: "hangman",
    title: "Hangman",
    description:
      "Classic word guessing game where you save the stick figure by guessing letters.\n\nRolling Scopes School task with strict requirements and review.",
    liveUrl: "https://rolling-scopes-school.github.io/marta109-JSFE2023Q4/hangman/index.html",
    repoUrl: "https://github.com/Marta109/Hangman",
    taskUrl: "https://github.com/rolling-scopes-school/tasks/tree/master/stage1/tasks/hangman",
    imageUrl: "/images/projects/hangman.png",
    tagLabels: ["JAVASCRIPT", " "],
    filters: ["javascript"],
  },
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "Customizable version with variable board size (3–20).",
    liveUrl: "https://marta109.github.io/Tic---Tac---Toe/",
    repoUrl: "https://github.com/Marta109/Tic---Tac---Toe",
    imageUrl: "/images/projects/tic-tac-toe.png",
    tagLabels: ["JAVASCRIPT"],
    filters: ["javascript"],
  },
  {
    id: "blog-post",
    title: "Blog-Post",
    description: "Book-focused blog platform with user registration and post creation.",
    liveUrl: "https://marta109.github.io/Blog-Post/index.html",
    repoUrl: "https://github.com/Marta109/Blog-Post",
    imageUrl: "/images/projects/blog-post.png",
    tagLabels: ["JAVASCRIPT"],
    filters: ["javascript"],
  },
  {
    id: "coffee-house",
    title: "Coffee House",
    description:
      "Responsive multi-page coffee shop website.\n\nRolling Scopes School task with strict requirements and review.",
    liveUrl: "https://rolling-scopes-school.github.io/marta109-JSFE2023Q4/coffee-house/home.html",
    repoUrl: "https://github.com/Marta109/Coffee-house",
    taskUrl:
      "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/coffee-house/coffee-house.md",
    imageUrl: "/images/projects/coffee-house.png",
    tagLabels: ["HTML / CSS", " "],
    filters: ["html-css"],
  },
  {
    id: "bouncy",
    title: "Bouncy",
    description: "Single-page creative website design.",
    liveUrl: "https://marta109.github.io/Bouncy/",
    repoUrl: "https://github.com/Marta109/Bouncy",
    imageUrl: "/images/projects/bouncy.png",
    tagLabels: ["HTML / CSS"],
    filters: ["html-css"],
  },
  {
    id: "travel",
    title: "Travel",
    description: "Single-page travel-themed website.",
    liveUrl: "https://marta109.github.io/Travel/",
    repoUrl: "https://github.com/Marta109/Travel",
    imageUrl: "/images/projects/travel.png",
    tagLabels: ["HTML / CSS"],
    filters: ["html-css"],
  },
  {
    id: "slider",
    title: "Slider",
    description: "Interactive image slider with keyboard and mouse controls.",
    liveUrl: "https://marta109.github.io/Slider/",
    repoUrl: "https://github.com/Marta109/Slider",
    imageUrl: "/images/projects/slider.png",
    tagLabels: ["HTML / CSS"],
    filters: ["html-css"],
  },
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Real-time text analysis tool counting words, sentences, characters, and more.",
    liveUrl: "https://marta109.github.io/Word_Counter/",
    repoUrl: "https://github.com/Marta109/word-counter",
    imageUrl: "/images/projects/word-counter.png",
    tagLabels: ["HTML / CSS"],
    filters: ["html-css"],
  },
];
