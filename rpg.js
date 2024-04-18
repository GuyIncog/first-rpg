//List of player character classes
//Move to separate module later
//Consider if enemy classes should have a separate module
const healer = {
  class: "Healer",
  weapon: "Staff (d6 +2)",
  attackDicePower: 6,
  attackDiceNumber: 1,
  strength: 2,
  armor: 2,
  potions: 3,
  hitPoints: 20,
};

const ranger = {
  class: "Ranger",
  weapon: "Swords (2d6 +2)",
  attackDicePower: 6,
  attackDiceNumber: 2,
  strength: 2,
  armor: 4,
  potions: 2,
  hitPoints: 30,
};

const soldier = {
  class: "Soldier",
  weapon: "Warhammer (d10 +4)",
  attackDicePower: 10,
  attackDiceNumber: 1,
  strength: 4,
  armor: 6,
  potions: 1,
  hitPoints: 50,
};

//For attacks
const rollDie = (numSides) => Math.floor(Math.random() * numSides) + 1;
function multiDiceRoll(numRolls, numSides) {
  const diceRolls = [];
  for (let i = 0; i < numRolls; i++) {
    diceRolls.push(rollDie(numSides));
  }
  return diceRolls.reduce((sum, roll) => sum + roll, 0);
}

function updatePlayerMessage(message) {
  const playerMessage = document.getElementById("playerMessage");
  playerMessage.innerText = message;
  setTimeout(() => {
    playerMessage.innerText = "";
  }, 2500);
}

class Character {
  constructor(characterName, characterClass) {
    (this.name = characterName),
      (this.class = characterClass.class),
      (this.weapon = characterClass.weapon),
      (this.attackDicePower = characterClass.attackDicePower),
      (this.attackDiceNumber = characterClass.attackDiceNumber),
      (this.strength = characterClass.strength),
      (this.armor = characterClass.armor),
      (this.potions = characterClass.potions),
      (this.currentHitPoints = characterClass.hitPoints),
      (this._maxHitPoints = characterClass.hitPoints);
  }

  attack() {
    return (
      multiDiceRoll(this.attackDiceNumber, this.attackDicePower) + this.strength
    );
  }

  usePotion() {
    if (this.currentHitPoints === this._maxHitPoints) {
      updatePlayerMessage("Health is already full! Don't waste a potion!");
    } else if (this.potions === 0) {
      updatePlayerMessage("Out of healing potions!");
    } else {
      this.potions -= 1;
      this.currentHitPoints += this._maxHitPoints / 2;
    }
    if (this.currentHitPoints > this._maxHitPoints) {
      this.currentHitPoints = this._maxHitPoints;
      updatePlayerMessage("Health is now at maximum!");
    }
  }
}

//Functions involved in game start
let playerCharacter;

function createPlayerCharacter() {
  const playerName = document.getElementById("playerName").value;
  const playerClass = document.getElementById("playerClass").value;
  //Converts the string input from the form into a constant for the Character constructor
  const playerClassAsConstant = {
    healer: healer,
    ranger: ranger,
    soldier: soldier,
  }[playerClass];

  playerCharacter = new Character(playerName, playerClassAsConstant);
}

function displayPlayerStats() {
  const characterName = document.getElementById("characterName");
  characterName.innerText = `Name: ${playerCharacter.name}`;

  const characterClass = document.getElementById("characterClass");
  characterClass.innerText = `Class: ${playerCharacter.class}`;

  const characterWeapon = document.getElementById("characterWeapon");
  characterWeapon.innerText = `Weapon: ${playerCharacter.weapon}`;

  const characterHP = document.getElementById("characterHP");
  characterHP.innerText = `HP: ${playerCharacter.currentHitPoints} / ${playerCharacter._maxHitPoints}`;

  const characterPotions = document.getElementById("characterPotions");
  characterPotions.innerText = `Potions: ${playerCharacter.potions}`;
}

function displayGameScreen() {
  characterCreation.classList.toggle("hidden");
  gameScreen.classList.toggle("hidden");
}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  createPlayerCharacter();
  displayPlayerStats();
  displayGameScreen();
});

const potionButton = document.getElementById("usePotion");
potionButton.addEventListener("click", () => {
  playerCharacter.usePotion();
  displayPlayerStats();
});

//TO DO:
//Enemy classes
//HTML for enemy in game screen
//Attack button functionality
//Enemy response attack

//NICE TO HAVE:
//Images for players and enemies
