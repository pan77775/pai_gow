import { TILES, analyzeHand } from './src/utils/paiGow.js';

// Helper to manually find tiles by name + value
const getTile = (name, faceStr) => {
    return TILES.find(t => t.name === name && t.face.join(',') === faceStr);
};

// Test 1: Split Gee Joon with 6-4
// Needs 猴, 猴, and two other tiles that make 6 and 4 (e.g. 長六, 長四)
console.log("--- Test 1: Split Gee Joon ---");
const hand1 = [
    TILES.find(t => t.id === 'hou_1'),
    TILES.find(t => t.id === 'hou_2'),
    TILES.find(t => t.id === 'chang6_1'),
    TILES.find(t => t.id === 'chang4_1'),
];
let result = analyzeHand(hand1);
console.log("Best Front Name:", result[0].front.name); // Should be 猴
console.log("Best Rear Name:", result[0].rear.name);   // Should be 猴
console.log("Front tiles:", result[0].front.tiles.map(t => t.name).join(', '));
console.log("Rear tiles:", result[0].rear.tiles.map(t => t.name).join(', '));

// Test 2: Do not split 10s Pair
console.log("\n--- Test 2: Keep 10s Pair ---");
const hand2 = [
    TILES.find(t => t.id === 'chang10_1'),
    TILES.find(t => t.id === 'chang10_2'),
    TILES.find(t => t.id === 'chang6_1'),
    TILES.find(t => t.id === 'chang4_1'),
];
result = analyzeHand(hand2);
console.log("Best Front Name:", result[0].front.name); // Should be 0點
console.log("Best Rear Name:", result[0].rear.name);   // Should be 長十對
console.log("Front tiles:", result[0].front.tiles.map(t => t.name).join(', '));
console.log("Rear tiles:", result[0].rear.tiles.map(t => t.name).join(', '));

// Test 3: Play High Nine instead of Gong if possible
console.log("\n--- Test 3: Play High Nine or Gong ---");
const hand3 = [
    TILES.find(t => t.id === 'tian_1'),
    TILES.find(t => t.id === 'di_1'),   // Teen and Day
    TILES.find(t => t.id === 'za7_1'),  // 7 point
    TILES.find(t => t.id === 'za8_1'),  // 8 point
];
result = analyzeHand(hand3);
console.log("Best Front Name:", result[0].front.name); // Should be 0點
console.log("Best Rear Name:", result[0].rear.name);   // Should be 9點 (High Nine)
console.log("Front tiles:", result[0].front.tiles.map(t => t.name).join(', '));
console.log("Rear tiles:", result[0].rear.tiles.map(t => t.name).join(', '));

// Test 4: Exception - Front is small (<3 pts) but Rear can be 7 or higher
console.log("\n--- Test 4: Exception maximize Rear ---");
// We want a hand where max front gives < 3 points but rear is < 7
// vs max rear gives >= 7 points
const hand4 = [
    TILES.find(t => t.id === 'chang10_1'), // 10
    TILES.find(t => t.id === 'za8_1'),     // 8
    TILES.find(t => t.id === 'za7_1'),     // 7
    TILES.find(t => t.id === 'he_1'),      // 4
];
// Combinations:
// 10+8 = 18(8) ; 7+4 = 11(1)   => Rear 8, Front 1
// 10+7 = 17(7) ; 8+4 = 12(2)   => Rear 7, Front 2
// 10+4 = 14(4) ; 8+7 = 15(5)   => Rear 5, Front 4 <-- Max Front (4) vs Max Rear (8)
// Wait, max front is 4. So the exception wouldn't trigger, it would pick Front 4 Rear 5.
// Let's create one where max front is 2.
// e.g., 10, 11, 4, 7 -> 
// combo 1: 10+11=1(1), 4+7=11(1) => 1, 1
// combo 2: 10+4=14(4), 11+7=18(8)=> 4, 8 -> max front is 4>2, so no.
// What about 10, 10, 11, 11 -> pair of 10s won't trigger exception, pairs handled first.
// Just simple point hand with max front 2.
// Available points: e.g. 5, 6, 6, 7.
// 5+6=1, 6+7=3 (Wait, Front must be <= Rear, so Front 1, Rear 3)
// 5+7=2, 6+6=2 (Front 2, Rear 2)
// So max front is 2. Rear is 2. But we need Rear >= 7 for Exception.
// If Rear can be >= 7, but max front is 2.
// Max possible points total is x+y+w+z (mod 10). If total sum is 28 -> pairs sum to 8?
// We want max front = 2, max rear = 7. If rear = 7, front = sum - 7 (mod 10) or sum - 17.
// If sum is 19 -> 19 (mod 10) = 9. So 7 and 2. 7+2=9.
// Can we make a 7 and a 2, such that the other combinations don't give a front > 2?
// Try: 12(Teen), 5(Za 5), 11(Duan 11), 1(not possible, 2 is Di).
// Let's use 12, 5 (sum 17->7). The others must sum to 2.
// Use 11, 11. 11+11=2(2). So we have 12+5=7, 11+11=2 => Front 2, Rear 7.
// Other combos:
// 12+11 = 3, 5+11 = 6. Front 3, Rear 6. Max front is 3. Exception doesn't trigger.
// To prevent front 3:
// Let's write a script to randomly generate hands and look for exception cases.
