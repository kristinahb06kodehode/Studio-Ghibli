const characterContainer = document.getElementById("character-container");
const collectibles = document.querySelectorAll(".collectible");
const obstacles = document.querySelectorAll(".obstacle");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let score = 0;
let selectedCharacter = "kiki"; // Initialize with the default character
const character = document.getElementById(`character-${selectedCharacter}`);

// Move the character left or right based on arrow key input
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" || event.key === "Left") {
    moveCharacter("left");
  } else if (event.key === "ArrowRight" || event.key === "Right") {
    moveCharacter("right");
  } else if (event.key === "ArrowUp" || event.key === "Up") {
    moveCharacter("up");
  } else if (event.key === "ArrowDown" || event.key === "Down") {
    moveCharacter("down");
  }
});

// Function to move the character
function moveCharacter(direction) {
  const character = document.getElementById(`character-${selectedCharacter}`);
  const characterStyle = getComputedStyle(character);
  const characterPositionX = parseFloat(characterStyle.left);
  const characterPositionY = parseFloat(characterStyle.top);
  const containerWidth = parseFloat(getComputedStyle(gameContainer).width);
  const containerHeight = parseFloat(getComputedStyle(gameContainer).height);
  const characterWidth = parseFloat(characterStyle.width);
  const characterHeight = parseFloat(characterStyle.height);

  if (direction === "left" && characterPositionX > 0) {
    character.style.left = characterPositionX - 10 + "px";
  } else if (
    direction === "right" &&
    characterPositionX + characterWidth < containerWidth
  ) {
    character.style.left = characterPositionX + 10 + "px";
  } else if (direction === "up" && characterPositionY > 0) {
    character.style.top = characterPositionY - 10 + "px";
  } else if (
    direction === "down" &&
    characterPositionY + characterHeight < containerHeight
  ) {
    character.style.top = characterPositionY + 10 + "px";
  }
}
// Randomize the positions of collectibles and obstacles
function randomPosition() {
  return Math.floor(Math.random() * 70) + 10;
}

collectibles.forEach((collectible) => {
  collectible.style.top = `${randomPosition()}%`;
  collectible.style.left = `${randomPosition()}%`;
});

obstacles.forEach((obstacle) => {
  obstacle.style.top = `${randomPosition()}%`;
  obstacle.style.left = `${randomPosition()}%`;
});

// Check for collisions with collectibles
function checkCollisions() {
  const character = document.getElementById(`character-${selectedCharacter}`);
  collectibles.forEach((collectible) => {
    if (isColliding(character, collectible)) {
      collectible.style.display = "none"; // Hide the collected item
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }
  });
}

// Function to check collisions between two elements
function isColliding(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

// Game loop
setInterval(() => {
  checkCollisions();
}, 1000);

// Event listener to detect changes in character selection
const characterSelection = document.querySelectorAll('input[name="character"]');
characterSelection.forEach((radioButton) => {
  radioButton.addEventListener("change", (event) => {
    selectedCharacter = event.target.value;
    toggleCharacter(selectedCharacter);
  });
});

// Function to toggle the visibility of character divs
function toggleCharacter(selectedCharacter) {
  // Hide all character divs
  document.querySelectorAll(".character").forEach((characterDiv) => {
    characterDiv.classList.add("hidden");
  });

  // Show the selected character div
  const selectedCharacterDiv = document.getElementById(
    `character-${selectedCharacter}`
  );
  selectedCharacterDiv.classList.remove("hidden");
}

// Initial character appearance
toggleCharacter("kiki");
