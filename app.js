//List of player character classes
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

//Enemy classes
const rat = {
  class: "Rat",
  weapon: "Bite (d6 +1)",
  attackDicePower: 6,
  attackDiceNumber: 1,
  strength: 1,
  armor: 0,
  potions: 0,
  hitPoints: 10,
};

const wolf = {
  class: "Wolf",
  weapon: "Bite (d6 +3)",
  attackDicePower: 6,
  attackDiceNumber: 1,
  strength: 3,
  armor: 0,
  potions: 0,
  hitPoints: 20,
};

const bandit = {
  class: "Bandit",
  weapon: "Shank (d8 +2)",
  attackDicePower: 8,
  attackDiceNumber: 1,
  strength: 2,
  armor: 2,
  potions: 1,
  hitPoints: 30,
};

const wizard = {
  class: "Wizard",
  weapon: "Fireball (2d8)",
  attackDicePower: 8,
  attackDiceNumber: 2,
  strength: 0,
  armor: 1,
  potions: 2,
  hitPoints: 20,
};

//iterable list to load enemies in order
const enemyList = [rat, wolf, bandit, wizard];

function updatePlayerMessage(message) {
  const playerMessage = document.getElementById("playerMessage");
  playerMessage.innerText = message;
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
      (this._potionRestock = characterClass.potions),
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
let enemyCharacter;
let currentEnemy = 0;

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

//refreshes stats after every action
function displayCharacterStats() {
  const characterName = document.getElementById("characterName");
  characterName.innerText = `Name: ${playerCharacter.name}`;
  const characterClass = document.getElementById("characterClass");
  characterClass.innerText = `Class: ${playerCharacter.class}`;
  const characterWeapon = document.getElementById("characterWeapon");
  characterWeapon.innerText = `Weapon: ${playerCharacter.weapon}`;
  const characterArmor = document.getElementById("characterArmor");
  characterArmor.innerText = `Armor: ${playerCharacter.armor}`;
  const characterHP = document.getElementById("characterHP");
  characterHP.innerText = `HP: ${playerCharacter.currentHitPoints} / ${playerCharacter._maxHitPoints}`;
  const characterPotions = document.getElementById("characterPotions");
  characterPotions.innerText = `Potions: ${playerCharacter.potions}`;
  const enemyClass = document.getElementById("enemyClass");
  enemyClass.innerText = `Enemy: ${enemyCharacter.class}`;
  const enemyWeapon = document.getElementById("enemyWeapon");
  enemyWeapon.innerText = `Weapon: ${enemyCharacter.weapon}`;
  const enemyArmor = document.getElementById("enemyArmor");
  enemyArmor.innerText = `Armor: ${enemyCharacter.armor}`;
  const enemyHP = document.getElementById("enemyHP");
  enemyHP.innerText = `HP: ${enemyCharacter.currentHitPoints} / ${enemyCharacter._maxHitPoints}`;
  const enemyPotions = document.getElementById("enemyPotions");
  enemyPotions.innerText = `Potions: ${enemyCharacter.potions}`;
}

function loadEnemy(enemy) {
  enemyCharacter = new Character(enemy.class, enemy);
}

function displayGameScreen() {
  characterCreation.style.display = "none";
  gameScreen.classList.toggle("hidden");
}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  createPlayerCharacter();
  loadEnemy(enemyList[currentEnemy]);
  displayCharacterStats();
  displayGameScreen();
});

function drinkPotion(user) {
  if (user.currentHitPoints > 0) {
    user.usePotion();
  }
  displayCharacterStats();
}
const potionButton = document.getElementById("usePotion");
potionButton.addEventListener("click", () => {
  drinkPotion(playerCharacter);
});

//For attacks
const rollDie = (numSides) => Math.floor(Math.random() * numSides) + 1;
function multiDiceRoll(numRolls, numSides) {
  const diceRolls = [];
  for (let i = 0; i < numRolls; i++) {
    diceRolls.push(rollDie(numSides));
  }
  return diceRolls.reduce((sum, roll) => sum + roll, 0);
}

function attack(attacker, receiver) {
  if (receiver.currentHitPoints > 0 && attacker.currentHitPoints > 0) {
    let attackDamage = attacker.attack() - receiver.armor;
    attackDamage > 0
      ? (receiver.currentHitPoints -= attackDamage)
      : (attackDamage = 0);
    updatePlayerMessage(`${attacker.name} deals ${attackDamage} damage!`);
    displayCharacterStats();
  }
}

const nextFightButton = document.getElementById("nextFight");

const attackButton = document.getElementById("playerAttack");
attackButton.addEventListener("click", () => {
  attack(playerCharacter, enemyCharacter);
  //if enemy dies
  if (enemyCharacter.currentHitPoints < 1) {
    nextFightButton.style.visibility = "visible";
    updatePlayerMessage("Victory!");
  } else {
    //check if enemy should use a potion
    if (
      enemyCharacter.potions > 0 &&
      enemyCharacter.currentHitPoints < enemyCharacter._maxHitPoints / 2
    ) {
      enemyCharacter.usePotion();
    }
    //enemy attacks no matter what
    attack(enemyCharacter, playerCharacter);
  }
  //check for player death
  if (playerCharacter.currentHitPoints < 1) {
    updatePlayerMessage("You died! Try again.");
  }
});

nextFightButton.addEventListener("click", () => {
  currentEnemy += 1;
  if (enemyList[currentEnemy]) {
    loadEnemy(enemyList[currentEnemy]);
    playerCharacter.potions += playerCharacter._potionRestock;
    displayCharacterStats();
    updatePlayerMessage(`${enemyCharacter.class} has appeared!`);
    nextFightButton.style.visibility = "hidden";
  } else {
    const playerWindow = document.getElementById("playerWindow");
    playerWindow.style.display = "none";
    const enemyWindow = document.getElementById("enemyWindow");
    enemyWindow.style.display = "none";
    const winScreen = document.getElementById("winScreen");
    winScreen.style.display = "block";
  }
});

//TO DO:
//Make more enemies
//Stylize the win screen
//Consider rebalancing characters

//NICE TO HAVE:
//Images for players and enemies
//Figure out how to put a time gap between player attack and enemy attack
//without totally breaking the game
