const { TILES, analyzeHand, evaluateAllVariations, getHouseWayBest } = require('../src/utils/paiGow.js');

const NUM_ROUNDS = 10000;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function runSimulation(numDiscards) {
    let gtoWins = 0;
    let gtoTies = 0;
    let gtoLosses = 0;

    let hwWins = 0; // Keeping House Way tracking but primarily focusing on Max Exploit / GTO / Max Rear
    let hwTies = 0;
    let hwLosses = 0;

    let maxEvWins = 0;
    let maxEvTies = 0;
    let maxEvLosses = 0;

    let maxRearWins = 0;
    let maxRearTies = 0;
    let maxRearLosses = 0;

    console.log(`\n===========================================`);
    console.log(`Starting ${NUM_ROUNDS} Rounds (Discards Known: ${numDiscards})`);
    console.log(`===========================================`);

    const startTime = Date.now();

    for (let round = 0; round < NUM_ROUNDS; round++) {
        if (round > 0 && round % 1000 === 0) console.log(`Completed ${round} rounds...`);
        // 1. Setup deck and shuffle
        const deck = shuffle([...TILES]);
        let dIndex = 0;

        // 2. Discard X tiles (Player knows these)
        const discardPile = deck.slice(dIndex, dIndex + numDiscards);
        dIndex += numDiscards;

        // 3. Deal Player and Dealer
        const playerHand = deck.slice(dIndex, dIndex + 4);
        dIndex += 4;
        const dealerHand = deck.slice(dIndex, dIndex + 4);

        // 4. Analyze Player Hand
        const playerEvals = analyzeHand(playerHand, discardPile);
        const playerHW = playerEvals.find(e => e.isHouseWay);
        const playerMaxEV = playerEvals[0]; // best against House Way

        // Maximize Rear: the variation with the highest rear rank value
        let playerMaxRear = playerEvals[0];
        for (const ev of playerEvals) {
            if (ev.rear.rankValue > playerMaxRear.rear.rankValue) {
                playerMaxRear = ev;
            }
        }

        // Pick GTO action based on computed probabilities
        const rand = Math.random();
        let cumulative = 0;
        let playerGTO = playerEvals[0]; // fallback
        for (const ev of playerEvals) {
            cumulative += ev.gameTheoryRatio;
            if (rand <= cumulative) {
                playerGTO = ev;
                break;
            }
        }

        // 5. Dealer plays strict House Way without knowing Player's hand
        const { getAllHouseWayCombinations } = require('../src/utils/paiGow.js');
        const hwMap = getAllHouseWayCombinations();
        const dealerKey = (1 << dealerHand[0].index) | (1 << dealerHand[1].index) | (1 << dealerHand[2].index) | (1 << dealerHand[3].index);
        const dealerHW = hwMap.get(dealerKey);

        // 6. Resolve Match
        // Score logic: 1 win + 1 tie = +1. 2 wins = +2. Wait, Pai Gow rules: Win 2 = win, Win 1 Tie 1 = Win. Tie 2 = Tie. Win 1 Loss 1 = Tie.
        const scoreMatch = (p, d) => {
            const wF = p.front.rankValue > d.front.rankValue ? 1 : (p.front.rankValue === d.front.rankValue ? 0 : -1);
            const wR = p.rear.rankValue > d.rear.rankValue ? 1 : (p.rear.rankValue === d.rear.rankValue ? 0 : -1);
            return wF + wR;
        };

        const gtoScore = scoreMatch(playerGTO, dealerHW);
        if (gtoScore > 0) gtoWins++;
        else if (gtoScore < 0) gtoLosses++;
        else gtoTies++;

        const hwScore = scoreMatch(playerHW, dealerHW);
        if (hwScore > 0) hwWins++;
        else if (hwScore < 0) hwLosses++;
        else hwTies++;

        const maxEvScore = scoreMatch(playerMaxEV, dealerHW);
        if (maxEvScore > 0) maxEvWins++;
        else if (maxEvScore < 0) maxEvLosses++;
        else maxEvTies++;

        const maxRearScore = scoreMatch(playerMaxRear, dealerHW);
        if (maxRearScore > 0) maxRearWins++;
        else if (maxRearScore < 0) maxRearLosses++;
        else maxRearTies++;
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // EV calc (assuming 1 unit bet, 0% commission on wins - completely fair zero-sum)
    const calcEV = (wins, losses) => (wins - losses) / NUM_ROUNDS;

    console.log(`Time taken: ${duration}s`);
    console.log(`[Game Theory Optimal]   EV: ${calcEV(gtoWins, gtoLosses).toFixed(5)}`);
    console.log(`Wins: ${gtoWins} | Ties: ${gtoTies} | Losses: ${gtoLosses}`);
    console.log(`-------------------------------------------`);
    console.log(`[Max Exploit EV]        EV: ${calcEV(maxEvWins, maxEvLosses).toFixed(5)}`);
    console.log(`Wins: ${maxEvWins} | Ties: ${maxEvTies} | Losses: ${maxEvLosses}`);
    console.log(`-------------------------------------------`);
    console.log(`[Max Rear (後對最大)]   EV: ${calcEV(maxRearWins, maxRearLosses).toFixed(5)}`);
    console.log(`Wins: ${maxRearWins} | Ties: ${maxRearTies} | Losses: ${maxRearLosses}`);
    console.log(`-------------------------------------------`);
    console.log(`Baseline House Way was:  ${calcEV(hwWins, hwLosses).toFixed(5)}`);
    console.log(`GTO VS Max Exploit Diff: ${((calcEV(maxEvWins, maxEvLosses) - calcEV(gtoWins, gtoLosses)) * 100).toFixed(3)}% over GTO`);
}

// Ensure the matrices are cached by calling evaluate once if needed, though analyzeHand does it.
console.log("Warming up engine (Caching full House Way Map)...");
runSimulation(0);
