const clickerImage = document.getElementById("clicker-image");
const coinsDisplay = document.getElementById("coins-display");

function normalizeNumber(number) {
    const suffixes = [
        '', ' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion',
        ' sextillion', ' septillion', ' octillion', ' nonillion', ' decillion',
        ' undecillion', ' duodecillion', ' tredecillion', ' quattuordecillion', ' quindecillion'
    ];
    if (number < 1000) return number.toFixed(1);
    let i = 0;
    let num = number;
    while (num >= 1000 && i < suffixes.length - 1) {
        num /= 1000;
        i++;
    }
    return num.toFixed(2) + suffixes[i];
}



class Game {
    constructor(coins, gameProductionRate, clickingPower) {
        this._coins = coins;
        this._gameProductionRate = gameProductionRate;
        this._clickingPower = clickingPower;
    }

    get coins() {
        return this._coins;
    }
    get gameProductionRate() {
        return this._gameProductionRate;
    }
    get clickingPower() {
        return this._clickingPower;
    }

    set coins(newCoins) {
        this._coins = newCoins;
        coinsDisplay.textContent = normalizeNumber(this._coins);
    }
    set gameProductionRate(newGameProductionRate) {
        this._gameProductionRate = newGameProductionRate;
    }
    set clickingPower(newClickingPower) {
        this._clickingPower = newClickingPower;
    }
}

const game = new Game(0, 0, 1);

class Building {
    constructor(name, price, productionRate, buildingDescription) {
        this._name = name;
        this._price = price;
        this._priceDisplay = document.getElementById(`${name}-price`);
        this._priceDisplay.textContent = '$' + normalizeNumber(this._price);
        this._productionRate = productionRate;
        this._button = document.getElementById(`${name}-button`);
        this._quantity = 0;
        this._quantityDisplay = document.getElementById(`${name}-quantity`);
        this._quantityDisplay.textContent = this._quantity;
        this._totalProductionRate = this._productionRate * this._quantity;
        this._buildingDescription = buildingDescription;
    }

    // Getters
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get productionRate() {
        return this._productionRate;
    }
    get button() {
        return this._button;
    }
    get quantity() {
        return this._quantity;
    }
    get totalProductionRate() {
        return this._totalProductionRate;
    }
    get buildingDescription() {
        return this._buildingDescription;
    }

    // Setters
    set name(newName) {
        this._name = newName;
    }
    set price(newPrice) {
        this._price = newPrice;
        if (this._priceDisplay) {
            this._priceDisplay.textContent = '$' + normalizeNumber(this._price);
        }
    }
    set productionRate(newProductionRate) {
        this._productionRate = newProductionRate;
    }
    set button(newButton) {
        this._button = newButton;
    }
    set quantity(newQuantity) {
        this._quantity = newQuantity;
        this._totalProductionRate = this._productionRate * this._quantity;
        if (this._quantityDisplay) {
            this._quantityDisplay.textContent = this._quantity;
        }
    }
    set totalProductionRate(newTotalProductionRate) {
        this._totalProductionRate = newTotalProductionRate;
    }
    set buildingDescription(newBuildingDescription) {
        this._buildingDescription = newBuildingDescription;
    }
}

cursorBuilding = new Building("cursor", 15, 0.1, "Hand of Lebron");
basketballBuilding = new Building("basketball", 100, 1, "His Power");
farmBuilding = new Building("farm", 1100, 8, "Le'seeds are grown here");
mineBuilding = new Building("mine", 12000, 47, "Le'gold mines are used to support Le'economy");
factoryBuilding = new Building("factory", 130000, 260, "Mass production of Le'goods");
bankBuilding = new Building("bank", 1400000, 1400, "Le'Coin quantative easing and interest rate manipulation");
templeBuilding = new Building("temple", 20000000, 7800, "Servants of LeBron pray here");
wizardBuilding = new Building("wizard", 330000000, 44000, "Le'Spells are casted here to materialize Le'Coins");
shipmentBuilding = new Building("shipment", 5100000000, 260000, "Aliens have adopted the Le'Economy");
alchemyBuilding = new Building("alchemy", 75000000000, 1600000, "Chemistry at the forefront of Le'Coin production");
portalBuilding = new Building("portal", 1000000000000, 10000000, "Mass transportation of Le'Coins from other dimensions");
timemachineBuilding = new Building("timemachine", 14000000000000, 65000000, "Le'coins pulled from past and future timelines");
condenserBuilding = new Building("condenser", 170000000000000, 430000000, "particles are smashed together to produce new Le'Coin varients");
prismBuilding = new Building("prism", 2100000000000000, 2900000000, "Light is converted to Le'Goods to support the Le'Economy");

const buildings = [
    cursorBuilding,
    basketballBuilding,
    farmBuilding,
    mineBuilding,
    factoryBuilding,
    bankBuilding,
    templeBuilding,
    wizardBuilding,
    shipmentBuilding,
    alchemyBuilding,
    portalBuilding,
    timemachineBuilding,
    condenserBuilding,
    prismBuilding
]

function getTotalProductionRate() {
    return buildings.reduce((sum, building) => sum + building.totalProductionRate, 0);
}

//when building is clicked
buildings.forEach((building) => {
    building.button.addEventListener("click", () => {
        if (game.coins >= building.price) {
            game.coins -= building.price;
            building.quantity += 1;
            building.price = building.price * 1.15;
        }
    })
})



clickerImage.addEventListener("click", () => {
    game.coins += game.clickingPower;
})

let lastTimestamp = performance.now();
let coinRemainder = 0;

function animateCoins(timestamp) {
    const elapsed = (timestamp - lastTimestamp) / 1000; // seconds since last frame
    lastTimestamp = timestamp;

    const productionPerSecond = getTotalProductionRate();
    const coinsToAdd = productionPerSecond * elapsed + coinRemainder;
    game.coins += coinsToAdd;
    coinRemainder = 0; // No need to keep fractional part since coins can be fractional

    requestAnimationFrame(animateCoins);
}

requestAnimationFrame(animateCoins);

const popup = document.getElementById("building-popup");
const popupContent = document.getElementById("building-popup-content");

buildings.forEach((building) => {
    building.button.addEventListener("mouseenter", (e) => {
        // Fill in your info here; example below:
        popupContent.innerHTML = `
            <strong>${building.name.charAt(0).toUpperCase() + building.name.slice(1)}</strong><br>
            Price: $${normalizeNumber(building.price)}<br>
            Production: ${normalizeNumber(building.productionRate)}/sec<br>
            Owned: ${building.quantity}
            <br><em style="font-size: 7px;">'${building.buildingDescription}'</em>
        `;

        // Get button position
        const rect = building.button.getBoundingClientRect();
        // Position popup to the left of the button, vertically centered
        popup.style.top = `${rect.top - 20}px`;
        popup.style.left = `${rect.left - popup.offsetWidth - 250}px`;
        popup.style.display = "block";
    });

    building.button.addEventListener("mouseleave", () => {
        // Hide popup when mouse leaves button
        popup.style.display = "none";
    });

    //hide popup if mouse leaves the popup itself
    popup.addEventListener("mouseleave", () => {
        popup.style.display = "none";
    });

    //Keep popup visible if mouse enters it
    popup.addEventListener("mouseenter", () => {
        popup.style.display = "block";
    });
});