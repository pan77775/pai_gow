import { TILES, analyzeHand } from './src/utils/paiGow.js';

console.time("Generate all combinations");
const combinations = [];
const n = TILES.length;
for (let i = 0; i < n - 3; i++) {
    for (let j = i + 1; j < n - 2; j++) {
        for (let k = j + 1; k < n - 1; k++) {
            for (let l = k + 1; l < n; l++) {
                combinations.push([TILES[i], TILES[j], TILES[k], TILES[l]]);
            }
        }
    }
}
console.timeEnd("Generate all combinations");
console.log(`Total combinations: ${combinations.length}`);

console.time("Analyze all combinations");
const precalculated = combinations.map(hand => {
    const result = analyzeHand(hand);
    // House way is the first element
    return {
        handIds: hand.map(t => t.id).sort().join(','),
        best: {
            frontScore: result[0].front.rankValue,
            rearScore: result[0].rear.rankValue,
        }
    };
});
console.timeEnd("Analyze all combinations");
