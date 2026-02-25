import { TILES, evaluateAllVariations, getHouseWayBest } from './src/utils/paiGow.js';
import fs from 'fs';

const uniqueHands = new Map();
const n = TILES.length;

console.time("Generate CSV");
// 生成所有的組合 
for (let i = 0; i < n - 3; i++) {
    for (let j = i + 1; j < n - 2; j++) {
        for (let k = j + 1; k < n - 1; k++) {
            for (let l = k + 1; l < n; l++) {
                const hand = [TILES[i], TILES[j], TILES[k], TILES[l]];
                // 使用牌名來避免同名異 ID 被視為不同組合
                const handNames = hand.map(t => t.name).sort().join(', ');

                if (!uniqueHands.has(handNames)) {
                    // 在評估時，也套用過濾同樣花色的重複排法
                    let evals = evaluateAllVariations(hand);
                    const uniqueKeys = new Set();
                    const uniqueEvaluated = [];
                    for (const ev of evals) {
                        const frontKey = ev.front.tiles.map(t => t.name).sort().join(',');
                        const rearKey = ev.rear.tiles.map(t => t.name).sort().join(',');
                        const fullKey = [frontKey, rearKey].sort().join('|');
                        if (!uniqueKeys.has(fullKey)) {
                            uniqueKeys.add(fullKey);
                            uniqueEvaluated.push(ev);
                        }
                    }
                    evals = uniqueEvaluated;

                    const hw = getHouseWayBest(hand, evals);
                    uniqueHands.set(handNames, {
                        handStr: handNames,
                        frontStr: hw.front.tiles.map(t => t.name).join(', '),
                        rearStr: hw.rear.tiles.map(t => t.name).join(', '),
                        frontName: hw.front.name,
                        rearName: hw.rear.name
                    });
                }
            }
        }
    }
}

// 寫出 CSV
let csv = "手牌 (Hand),前段牌 (Front Tiles),後段牌 (Rear Tiles),前段牌型 (Front Rank),後段牌型 (Rear Rank)\n";
const keys = Array.from(uniqueHands.keys()).sort();
for (const key of keys) {
    const { handStr, frontStr, rearStr, frontName, rearName } = uniqueHands.get(key);
    csv += `"${handStr}","${frontStr}","${rearStr}","${frontName}","${rearName}"\n`;
}

// 加上 BOM \uFEFF 讓 Excel 用 UTF-8 中文不亂碼
fs.writeFileSync('./house_way_table.csv', "\uFEFF" + csv);
console.timeEnd("Generate CSV");
console.log(`Successfully generated ./house_way_table.csv with ${uniqueHands.size} unique hands!`);
