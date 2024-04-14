const healer = {
  weapon: "staff",
  attackDicePower: 6,
  attackDiceNumber: 1,
  strength: 2,
  armor: 2,
  potions: 3,
  hitPoints: 20,
};

const ranger = {
  weapon: "swords",
  attackDicePower: 6,
  attackDiceNumber: 2,
  strength: 2,
  armor: 4,
  potions: 2,
  hitPoints: 30,
};

const soldier = {
  weapon: "warhammer",
  attackDicePower: 10,
  attackDiceNumber: 1,
  strength: 4,
  armor: 6,
  potions: 1,
  hitPoints: 50,
};

const rollDie = (numSides) => Math.floor(Math.random() * numSides) + 1;

function multiDiceRoll(numRolls, numSides) {
  const diceRolls = [];
  for (let i = 0; i < numRolls; i++) {
    diceRolls.push(rollDie(numSides));
  }
  return diceRolls.reduce((sum, roll) => sum + roll, 0);
}

class Character {
  constructor(characterName, characterClass) {
    (this.name = characterName),
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
      console.log("Health is already full! Don't waste a potion!");
    } else if (this.potions === 0) {
      console.log("Out of healing potions!");
    } else {
      this.potions -= 1;
      this.currentHitPoints += this._maxHitPoints / 2;
    }
    if (this.currentHitPoints > this._maxHitPoints) {
      this.currentHitPoints = this._maxHitPoints;
      console.log("Health is now at maximum!");
    }
  }
}

const aya = new Character("Aya", soldier);
