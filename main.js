document.getElementById("current-year").textContent = new Date().getFullYear();

// Game data array
const gameData = [
  {
    id: 1,
    title: "Tic-Tac-Toe",
    description: "",
    icon: "tic-tac-toe.png",
    highScore: 0,
    path: "games/tic-tac-toe/index.html",
  },
  {
    id: 2,
    title: "Snake",
    description: "Explore the universe and battle alien forces",
    icon: "snake.jpeg",
    highScore: 0,
    path: "games/snake/index.html",
  },
  {
    id: 3,
    title: "2048-Game",
    description: "Explore the universe and battle alien forces",
    icon: "2048.jpeg",
    highScore: 0,
    path: "games/2048/index.html",
  },
  {
    id: 4,
    title: "Dino Jump",
    description: "Explore the universe and battle alien forces",
    icon: "dino.png",
    highScore: 0,
    path: "games/dinojump/index.html",
  },
  {
    id: 5,
    title: "Pong",
    description: "Explore the universe and battle alien forces",
    icon: "pong.jpeg",
    highScore: 0,
    path: "games/pong/index.html",
  },
  {
    id: 6,
    title: "Space Invaders",
    description: "Explore the universe and battle alien forces",
    icon: "space.png",
    highScore: 0,
    path: "games/spacee/index.html",
  },
  {
    id: 7,
    title: "Sudoku",
    description: "Explore the universe and battle alien forces",
    icon: "sudoku.png",
    highScore: 0,
    path: "games/sudoku/index.html",
  },
  {
    id: 8,
    title: "Rock-Paper-Scissors",
    description: "Explore the universe and battle alien forces",
    icon: "rps.jpeg",
    highScore: 0,
    path: "games/rps/index.html",
  },
  {
    id: 9,
    title: "Breakout",
    description: "Explore the universe and battle alien forces",
    icon: "breakout.png",
    highScore: 0,
    path: "games/breakout/index.html",
  },
  {
    id: 10,
    title: "Connect 4",
    description: "Explore the universe and battle alien forces",
    icon: "connect.jpeg",
    highScore: 0,
    path: "games/Connect4/index.html",
  }
];

const gamesGrid = document.getElementById("games-grid");
const themeToggle = document.getElementById("theme-toggle");
const playButton = document.getElementById("play-button");
const scoreUpdate = document.getElementById("score-update");
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

loadThemePreference();

createGameTiles();

themeToggle.addEventListener("click", toggleTheme);


function createGameTiles() {
  gamesGrid.innerHTML = "";
  gameData.forEach((game) => {
    const tile = document.createElement("div");
    tile.className = "game-tile";
    tile.dataset.id = game.id;

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = `High Score: ${game.highScore}`;

    const image = document.createElement("img");
    image.className = "game-image";
    if (game.icon && game.icon !== "") {
      image.src = `images/${game.icon}`;
      image.alt = `${game.title} icon`;
    } else {
      image.src = "cover.png"; 
      image.alt = "Game icon";
    }
    const info = document.createElement("div");
    info.className = "game-info";

    const title = document.createElement("h3");
    title.className = "game-title";
    title.textContent = game.title;

    const description = document.createElement("p");
    description.className = "game-description";
    description.textContent = game.description;

    info.appendChild(title);
    info.appendChild(description);

    tile.appendChild(tooltip);
    tile.appendChild(image);
    tile.appendChild(info);

    tile.addEventListener("click", () => {
      window.open(game.path, "_blank");
    });

    gamesGrid.appendChild(tile);
  });
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const isDarkMode = body.classList.contains("dark-mode");
  themeToggle.innerHTML = isDarkMode
    ? '<span class="theme-icon">☀️</span> Light Mode'
    : '<span class="theme-icon">🌙</span> Dark Mode';


  localStorage.setItem("darkMode", isDarkMode);
}

function loadThemePreference() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<span class="theme-icon">☀️</span> Light Mode';
  }
}

function search() {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".game-tile").forEach((tile) => {
      const title = tile.querySelector(".game-title").textContent.toLowerCase();
      const desc = tile.querySelector(".game-description").textContent.toLowerCase();
      tile.style.display =
        title.includes(query) || desc.includes(query) ? "block" : "none";
    });
  }
searchButton.addEventListener("click", search );
