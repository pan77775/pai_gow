export const SUITS = {
  TIAN: "天",
  DI: "地",
  REN: "人",
  HE: "和",
  CHANG: "長",
  DUAN: "短",
  ZA: "雜",
  HOU: "猴",
};

export const SUIT_RANK = {
  [SUITS.TIAN]: 7,
  [SUITS.DI]: 6,
  [SUITS.REN]: 5,
  [SUITS.HE]: 4,
  [SUITS.CHANG]: 3,
  [SUITS.DUAN]: 2,
  [SUITS.ZA]: 1,
  [SUITS.HOU]: 0,
};

export const TILES = [
  // 天 [6,6]
  { id: "tian_1", name: "天", value: 12, suit: SUITS.TIAN, pairRank: 15, face: [6, 6] },
  { id: "tian_2", name: "天", value: 12, suit: SUITS.TIAN, pairRank: 15, face: [6, 6] },
  // 地 [1,1]
  { id: "di_1", name: "地", value: 2, suit: SUITS.DI, pairRank: 14, face: [1, 1] },
  { id: "di_2", name: "地", value: 2, suit: SUITS.DI, pairRank: 14, face: [1, 1] },
  // 人 [4,4]
  { id: "ren_1", name: "人", value: 8, suit: SUITS.REN, pairRank: 13, face: [4, 4] },
  { id: "ren_2", name: "人", value: 8, suit: SUITS.REN, pairRank: 13, face: [4, 4] },
  // 和 [1,3]
  { id: "he_1", name: "和", value: 4, suit: SUITS.HE, pairRank: 12, face: [1, 3] },
  { id: "he_2", name: "和", value: 4, suit: SUITS.HE, pairRank: 12, face: [1, 3] },

  // 長
  { id: "chang10_1", name: "長十", value: 10, suit: SUITS.CHANG, pairRank: 11, face: [5, 5] },
  { id: "chang10_2", name: "長十", value: 10, suit: SUITS.CHANG, pairRank: 11, face: [5, 5] },
  { id: "chang6_1", name: "長六", value: 6, suit: SUITS.CHANG, pairRank: 11, face: [3, 3] },
  { id: "chang6_2", name: "長六", value: 6, suit: SUITS.CHANG, pairRank: 11, face: [3, 3] },
  { id: "chang4_1", name: "長四", value: 4, suit: SUITS.CHANG, pairRank: 11, face: [2, 2] },
  { id: "chang4_2", name: "長四", value: 4, suit: SUITS.CHANG, pairRank: 11, face: [2, 2] },

  // 短
  { id: "duan11_1", name: "短十一", value: 11, suit: SUITS.DUAN, pairRank: 10, face: [5, 6] },
  { id: "duan11_2", name: "短十一", value: 11, suit: SUITS.DUAN, pairRank: 10, face: [5, 6] },
  { id: "duan10_1", name: "短十", value: 10, suit: SUITS.DUAN, pairRank: 10, face: [4, 6] },
  { id: "duan10_2", name: "短十", value: 10, suit: SUITS.DUAN, pairRank: 10, face: [4, 6] },
  { id: "duan7_1", name: "短七", value: 7, suit: SUITS.DUAN, pairRank: 10, face: [1, 6] },
  { id: "duan7_2", name: "短七", value: 7, suit: SUITS.DUAN, pairRank: 10, face: [1, 6] },
  { id: "duan6_1", name: "短六", value: 6, suit: SUITS.DUAN, pairRank: 10, face: [1, 5] },
  { id: "duan6_2", name: "短六", value: 6, suit: SUITS.DUAN, pairRank: 10, face: [1, 5] },

  // 雜 (每種由兩張不同的組成)
  { id: "za9_1", name: "雜九", value: 9, suit: SUITS.ZA, pairRank: 9, face: [3, 6] },
  { id: "za9_2", name: "雜九", value: 9, suit: SUITS.ZA, pairRank: 9, face: [4, 5] },
  { id: "za8_1", name: "雜八", value: 8, suit: SUITS.ZA, pairRank: 8, face: [2, 6] },
  { id: "za8_2", name: "雜八", value: 8, suit: SUITS.ZA, pairRank: 8, face: [3, 5] },
  { id: "za7_1", name: "雜七", value: 7, suit: SUITS.ZA, pairRank: 7, face: [2, 5] },
  { id: "za7_2", name: "雜七", value: 7, suit: SUITS.ZA, pairRank: 7, face: [3, 4] },
  { id: "za5_1", name: "雜五", value: 5, suit: SUITS.ZA, pairRank: 5, face: [2, 3] },
  { id: "za5_2", name: "雜五", value: 5, suit: SUITS.ZA, pairRank: 5, face: [1, 4] },

  // 猴 (1和2組成3點，2和4組成6點)
  { id: "hou_1", name: "猴", value: [3, 6], suit: SUITS.HOU, pairRank: 99, face: [1, 2] },
  { id: "hou_2", name: "猴", value: [3, 6], suit: SUITS.HOU, pairRank: 99, face: [2, 4] },
];

TILES.forEach((t, i) => t.index = i);

let cachedHouseWayMap = null;

export const getAllHouseWayCombinations = () => {
  if (cachedHouseWayMap) return cachedHouseWayMap;

  // Generate all 35,960 combinations
  const houseWayMap = new Map();
  const n = TILES.length;
  for (let i = 0; i < n - 3; i++) {
    for (let j = i + 1; j < n - 2; j++) {
      for (let k = j + 1; k < n - 1; k++) {
        for (let l = k + 1; l < n; l++) {
          const hand = [TILES[i], TILES[j], TILES[k], TILES[l]];
          const evals = evaluateAllVariations(hand);
          const best = getHouseWayBest(hand, evals); // We need to extract logic

          // Use a 32-bit bitmask as the key for O(1) lookups
          const key = (1 << i) | (1 << j) | (1 << k) | (1 << l);
          houseWayMap.set(key, best);
        }
      }
    }
  }

  cachedHouseWayMap = houseWayMap;
  return cachedHouseWayMap;
};

let cachedUniqueEvalsMap = null;

export const getAllUniqueEvalsCombinations = () => {
  if (cachedUniqueEvalsMap) return cachedUniqueEvalsMap;

  const uniqueEvalsMap = new Map();
  const n = TILES.length;
  for (let i = 0; i < n - 3; i++) {
    for (let j = i + 1; j < n - 2; j++) {
      for (let k = j + 1; k < n - 1; k++) {
        for (let l = k + 1; l < n; l++) {
          const hand = [TILES[i], TILES[j], TILES[k], TILES[l]];
          const evals = evaluateAllVariations(hand);

          const uniqueEvals = [];
          const keys = new Set();
          for (const ev of evals) {
            const frontKey = ev.front.tiles.map(t => t.name).sort().join(',');
            const rearKey = ev.rear.tiles.map(t => t.name).sort().join(',');
            const fullKey = [frontKey, rearKey].sort().join('|');
            if (!keys.has(fullKey)) {
              keys.add(fullKey);
              uniqueEvals.push(ev);
            }
          }

          const key = (1 << i) | (1 << j) | (1 << k) | (1 << l);
          uniqueEvalsMap.set(key, uniqueEvals);
        }
      }
    }
  }

  cachedUniqueEvalsMap = uniqueEvalsMap;
  return cachedUniqueEvalsMap;
};

export const getTileValues = (tile) => {
  if (Array.isArray(tile.value)) return tile.value;
  return [tile.value];
};

export const hasName = (n1, n2, targetName) => n1 === targetName || n2 === targetName;
export const hasValue = (t1, t2, targetValue) => getTileValues(t1).includes(targetValue) || getTileValues(t2).includes(targetValue);


export const calculateHandRank = (tile1, tile2) => {
  // 對子 (Pairs)
  if (tile1.name === tile2.name && (tile1.suit === tile2.suit || tile1.pairRank === tile2.pairRank)) {
    return {
      type: "PAIR",
      name: `${tile1.name}對`,
      rankValue: 10000 + tile1.pairRank,
      tiles: [tile1, tile2]
    };
  }

  const n1 = tile1.name;
  const n2 = tile2.name;

  // 檢查王 (Wongs)
  if (hasName(n1, n2, "天") && hasValue(tile1, tile2, 9)) {
    return { type: "WONG", name: "天王", rankValue: 5002, tiles: [tile1, tile2] };
  }
  if (hasName(n1, n2, "地") && hasValue(tile1, tile2, 9)) {
    return { type: "WONG", name: "地王", rankValue: 5001, tiles: [tile1, tile2] };
  }

  // 檢查槓 (Gongs)
  if (hasName(n1, n2, "天") && hasValue(tile1, tile2, 8)) {
    return { type: "GONG", name: "天槓", rankValue: 4002, tiles: [tile1, tile2] };
  }
  if (hasName(n1, n2, "地") && hasValue(tile1, tile2, 8)) {
    return { type: "GONG", name: "地槓", rankValue: 4001, tiles: [tile1, tile2] };
  }

  // 一般點數
  const v1s = getTileValues(tile1);
  const v2s = getTileValues(tile2);
  let bestPoint = -1;
  let bestCombo = null;

  for (let v1 of v1s) {
    for (let v2 of v2s) {
      const pts = (v1 + v2) % 10;
      if (pts > bestPoint) {
        bestPoint = pts;
        bestCombo = { v1, v2 };
      }
    }
  }

  const getHighestSuitRank = (t1, t2) => Math.max(SUIT_RANK[t1.suit], SUIT_RANK[t2.suit]);
  const tieBreaker = getHighestSuitRank(tile1, tile2);

  return {
    type: "POINT",
    name: `${bestPoint}點`,
    points: bestPoint,
    rankValue: (bestPoint * 100) + tieBreaker,
    tiles: [tile1, tile2],
  };
};

export const evaluateAllVariations = (handTiles) => {
  if (handTiles.length !== 4) return [];

  // 窮舉三種分法
  const variations = [
    { frontOrig: [handTiles[0], handTiles[1]], rearOrig: [handTiles[2], handTiles[3]] },
    { frontOrig: [handTiles[0], handTiles[2]], rearOrig: [handTiles[1], handTiles[3]] },
    { frontOrig: [handTiles[0], handTiles[3]], rearOrig: [handTiles[1], handTiles[2]] },
  ];

  return variations.map(v => {
    let r1 = calculateHandRank(v.frontOrig[0], v.frontOrig[1]);
    let r2 = calculateHandRank(v.rearOrig[0], v.rearOrig[1]);

    // 排列：規定後段必須大於等於前段
    if (r1.rankValue > r2.rankValue) {
      const temp = r1;
      r1 = r2;
      r2 = temp;
    }

    return {
      front: r1,
      rear: r2,
      // 這裡的 totalScore 只用作參考，後續 House Way 會自行挑選最佳解
      totalScore: r2.rankValue * 100000 + r1.rankValue,
      originalV: v
    };
  });
};

// ========== House Way Logic (傳統排法) ==========
export const getHouseWayBest = (handTiles, currentEvals) => {
  // 傳入的 evals，拷貝一份避免干擾
  let validEvals = [...currentEvals];

  const getHandPts = (h) => {
    if (h.type === 'WONG' || h.type === 'GONG') return 9;
    if (h.type === 'PAIR') return 10;
    return h.points !== undefined ? h.points : 0;
  };

  // 輔助函式：計算對子數量與尋找對子
  const pairsInHand = validEvals[0].originalV.frontOrig[0].name === validEvals[0].originalV.frontOrig[1].name ? 1 : 0
    + (validEvals[0].originalV.rearOrig[0].name === validEvals[0].originalV.rearOrig[1].name ? 1 : 0);

  const hasPair = validEvals.find(e => e.rear.type === 'PAIR' || e.front.type === 'PAIR');
  const hasTwoPairs = validEvals.find(e => e.rear.type === 'PAIR' && e.front.type === 'PAIR');

  // 如果有兩個對子，絕對不拆 ("Never split two pair.")
  if (hasTwoPairs) {
    return hasTwoPairs;
  }

  // 如果有一個對子，根據規則決定是否拆牌
  if (hasPair) {
    const pairEval = hasPair;
    const pairType = pairEval.rear.type === 'PAIR' ? pairEval.rear : pairEval.front;
    const pairName = pairType.name; // e.g., "天對", "地對", "猴對", "長四對"...
    const otherTiles = handTiles.filter(t => !pairType.tiles.some(pt => pt.id === t.id));

    const v1s = getTileValues(otherTiles[0]);
    const v2s = getTileValues(otherTiles[1]);
    const isTiles = (vA, vB) => (v1s.includes(vA) && v2s.includes(vB)) || (v1s.includes(vB) && v2s.includes(vA));

    let shouldSplit = false;

    // Never split 4s, 5s, 6s, 10s, 11s.
    const noSplitPairs = ["和對", "長四對", "雜五對", "長六對", "短六對", "長十對", "短十對", "短十一對"];
    if (noSplitPairs.includes(pairName)) {
      shouldSplit = false;
    }
    // Split Gee Joon (猴對) with 4-6, 5-6, and 6-6
    else if (pairName === "猴對") {
      if (isTiles(4, 6) || isTiles(5, 6) || isTiles(6, 6)) {
        shouldSplit = true;
      }
    }
    // Split 2s and 12s to make 6/8 or better, and with 9-11
    else if (pairName === "天對" || pairName === "地對") {
      if (isTiles(9, 11)) shouldSplit = true;
      // Check if splitting can make 6/8 or better
      const splitEvals = validEvals.filter(e => e !== pairEval);
      for (const se of splitEvals) {
        if (getHandPts(se.front) >= 6 && getHandPts(se.rear) >= 8) shouldSplit = true;
      }
    }
    // Split 7s to make 7/9 or better
    else if (pairName === "雜七對" || pairName === "短七對") {
      const splitEvals = validEvals.filter(e => e !== pairEval);
      for (const se of splitEvals) {
        if (getHandPts(se.front) >= 7 && getHandPts(se.rear) >= 9) shouldSplit = true;
      }
    }
    // Split 8s to make 7/9 or 8/8 or better
    else if (pairName === "人對" || pairName === "雜八對") {
      const splitEvals = validEvals.filter(e => e !== pairEval);
      for (const se of splitEvals) {
        if ((getHandPts(se.front) >= 7 && getHandPts(se.rear) >= 9) || (getHandPts(se.front) >= 8 && getHandPts(se.rear) >= 8)) {
          shouldSplit = true;
        }
      }
    }
    // Split 9s to make 9/9 or better
    else if (pairName === "雜九對") {
      const splitEvals = validEvals.filter(e => e !== pairEval);
      for (const se of splitEvals) {
        if (getHandPts(se.front) >= 9 && getHandPts(se.rear) >= 9) shouldSplit = true;
      }
    }

    if (!shouldSplit) {
      return pairEval; // 不拆就是保留對子的那個排法
    } else {
      // 如果要拆牌，不能保留對子的排法
      validEvals = validEvals.filter(e => e !== pairEval);
    }
  }

  // 輔助函式：判斷是否為 Wong (天/地 + 9點), Gong (天/地 + 8點), High Nine (天/地 + 7點)
  const isWong = (e) => e.rear.type === 'WONG';
  const isGong = (e) => e.rear.type === 'GONG';
  const isHighNine = (e) => e.rear.points === 9 && (hasName(e.rear.tiles[0].name, e.rear.tiles[1].name, "天") || hasName(e.rear.tiles[0].name, e.rear.tiles[1].name, "地"));

  const wghEvals = validEvals.filter(e => isWong(e) || isGong(e) || isHighNine(e));
  if (wghEvals.length > 0) {
    if (wghEvals.length === 1) {
      // 只有一種選擇，直接回傳
      return wghEvals[0];
    } else {
      // 如果有2種以上的選擇，根據第四張牌決定優先順序
      // Find the 4th tile (the one in the front hand that is NOT part of the pair making the Wong/Gong/HighNine)
      // Usually the hand is (WGH Pair) + (Other Two). The 'other two' are e.front.tiles[0] and e.front.tiles[1].

      const getWghType = (e) => isWong(e) ? 'WONG' : (isGong(e) ? 'GONG' : 'HIGH_NINE');

      // Rule: Play High Nine if you can, otherwise play Gong, with Exceptions.
      let preferredType = 'HIGH_NINE'; // Default preference if we can make it
      if (!wghEvals.some(e => getWghType(e) === 'HIGH_NINE')) {
        preferredType = 'GONG';
      }

      // Check exceptions based on hand tiles
      const hasTileValue = (val) => handTiles.some(t => getTileValues(t).includes(val));
      const hasTileId = (idPrefix) => handTiles.some(t => t.id.startsWith(idPrefix));

      if (hasTileValue(11)) {
        // Play Wong instead of Gong or High Nine if the fourth tile is an 11.
        preferredType = 'WONG';
      } else if (hasTileId("chang4_") || hasTileId("he_")) {
        // Play Wong instead of High Nine if the fourth tile is a low 4 ("和" is 4, "長四" is 4, here typically low 4 means 和)
        if (hasTileId("he_") || hasTileId("chang4_")) { // broadly interpreting 'low 4' as any 4 that isn't high (but we only have 和 and 長四 for 4s. 和 is Rank 12, 長四 is Rank 11)
          preferredType = 'WONG';
        }
      } else if (hasTileId("chang4_") || hasTileId("he_")) {
        // Play Gong instead of High Nine if the fourth tile is a 4.
        // Wait, the previous rule covers low 4 -> Wong. So this means High 4 -> Gong.
        // Let's refine parsing.
        // H4 = "和", L4 = "長四".
        // Play Wong instead of High Nine if 4th tile is L4 (Chang 4)
        // Play Gong instead of High Nine if 4th tile is H4 (He)
      }

      // Better way to check the specific 4th tile exception:
      const hasL4 = hasTileId("chang4_");
      const hasH4 = hasTileId("he_");
      const hasL8 = hasTileId("za8_"); // 雜八
      const has5 = hasTileId("za5_") || hasTileId("duan6_"); // Wait, 5 is 雜五
      const hasZa5 = hasTileId("za5_");

      if (hasTileValue(11)) {
        preferredType = 'WONG';
      } else if (hasL4) {
        // Play Wong instead of High Nine if the fourth tile is a low 4
        if (wghEvals.some(e => getWghType(e) === 'WONG')) preferredType = 'WONG';
      } else if (hasH4) {
        // Play Gong instead of High Nine if the fourth tile is a 4 (H4)
        if (wghEvals.some(e => getWghType(e) === 'GONG')) preferredType = 'GONG';
      } else if (hasZa5 && hasL8) {
        // Play Gong instead of High Nine if the fourth tile is a 5 and the 8 is a low 8.
        if (wghEvals.some(e => getWghType(e) === 'GONG')) preferredType = 'GONG';
      }

      // Filter to preferred type
      const preferredEvals = wghEvals.filter(e => getWghType(e) === preferredType);
      const evalsToConsider = preferredEvals.length > 0 ? preferredEvals : wghEvals;

      // 玩最好的 High Hand，但遇到能提升 Low Hand 時也優先保障 Low Hand (Maximizing Front)
      let bestWGH = evalsToConsider[0];
      for (let i = 1; i < evalsToConsider.length; i++) {
        if (evalsToConsider[i].front.rankValue > bestWGH.front.rankValue) {
          bestWGH = evalsToConsider[i];
        }
      }
      return bestWGH;
    }
  }

  // All Other: Play the best low hand you can make, unless it ranks lower than 3-with-H6 and the best high hand is worth 7 or more points.
  // We need to handle the Exceptions first before defaulting to bestLow vs bestHigh.
  // Exceptions compare validEvals to find specific 8/9, 8/8 vs 7/9, 7/8, or 6-7/7-9 choices.

  // Helper to find specific eval by points
  const getEvalPoints = (e) => ({ f: getHandPts(e.front), r: getHandPts(e.rear) });
  const hasRankingTile = (e, rankVal) =>
    SUIT_RANK[e.front.tiles[0].suit] >= rankVal || SUIT_RANK[e.front.tiles[1].suit] >= rankVal ||
    SUIT_RANK[e.rear.tiles[0].suit] >= rankVal || SUIT_RANK[e.rear.tiles[1].suit] >= rankVal;

  // Let's iterate through the specific exceptions:
  const isPts = (e, p1, p2) => {
    const pts = getEvalPoints(e);
    return (pts.f === p1 && pts.r === p2) || (pts.f === p2 && pts.r === p1);
  };

  // Ex 1: If you have two ways to play 8/9, play the best high hand.
  const evals89 = validEvals.filter(e => isPts(e, 8, 9));
  if (evals89.length >= 2) {
    let best = evals89[0];
    for (let i = 1; i < evals89.length; i++) {
      if (evals89[i].rear.rankValue > best.rear.rankValue) best = evals89[i];
    }
    return best;
  }

  // Ex 2: If you have a choice between 8/8 and 7/9, play the best high hand if it separates the highest two tiles.
  // "Highest two tiles" means the two tiles with the highest individual values/ranks. For simplicity we check rank.
  const evals88 = validEvals.filter(e => isPts(e, 8, 8));
  const evals79 = validEvals.filter(e => isPts(e, 7, 9));
  if (evals88.length > 0 && evals79.length > 0) {
    // Check if 7/9 separates the highest two tiles.
    const sortedTiles = [...handTiles].sort((a, b) => b.value === a.value ? b.pairRank - a.pairRank : b.value - a.value);
    const t1 = sortedTiles[0];
    const t2 = sortedTiles[1];

    // Find the best 7/9 high hand
    let best79 = evals79[0];
    for (let i = 1; i < evals79.length; i++) {
      if (evals79[i].rear.rankValue > best79.rear.rankValue) best79 = evals79[i];
    }

    // Does best79 separate t1 and t2? (one in front, one in rear)
    const inFront = (t) => best79.front.tiles.some(pt => pt.id === t.id);
    const inRear = (t) => best79.rear.tiles.some(pt => pt.id === t.id);

    if ((inFront(t1) && inRear(t2)) || (inFront(t2) && inRear(t1))) {
      return best79; // Play 7/9 (best high hand)
    }
    // Otherwise it defaults to normal logic (which naturally prefers 8/8 because it maximizes low hand 8 > 7).
  }

  // Ex 3: If you have two ways to play 7/8, and your tiles include 2 and 12, play the 12 in the high hand.
  const evals78 = validEvals.filter(e => isPts(e, 7, 8));
  if (evals78.length >= 2 && handTiles.some(t => getTileValues(t).includes(2)) && handTiles.some(t => getTileValues(t).includes(12))) {
    // Find the 7/8 eval where the 12 (天) is in the rear (high hand)
    const bestWith12Rear = evals78.find(e => e.rear.tiles.some(t => t.value === 12));
    if (bestWith12Rear) return bestWith12Rear;
  }

  // Ex 4: If you have two ways to play 6/7, 6/8, 6/9, or 7/9, play the best high hand if it separates the highest two tiles.
  const checkSepEx4 = (p1, p2) => {
    const evals = validEvals.filter(e => isPts(e, p1, p2));
    if (evals.length >= 2) {
      let bestHighEval = evals[0];
      for (let i = 1; i < evals.length; i++) {
        if (evals[i].rear.rankValue > bestHighEval.rear.rankValue) bestHighEval = evals[i];
      }

      const sortedTiles = [...handTiles].sort((a, b) => {
        const vA = Array.isArray(a.value) ? Math.max(...a.value) : a.value;
        const vB = Array.isArray(b.value) ? Math.max(...b.value) : b.value;
        return vB === vA ? b.pairRank - a.pairRank : vB - vA;
      });
      const t1 = sortedTiles[0];
      const t2 = sortedTiles[1];

      const inFront = (t) => bestHighEval.front.tiles.some(pt => pt.id === t.id);
      const inRear = (t) => bestHighEval.rear.tiles.some(pt => pt.id === t.id);

      if ((inFront(t1) && inRear(t2)) || (inFront(t2) && inRear(t1))) {
        return bestHighEval;
      }
    }
    return null;
  };

  const ex4Matches = [checkSepEx4(6, 7), checkSepEx4(6, 8), checkSepEx4(6, 9), checkSepEx4(7, 9)];
  const validEx4 = ex4Matches.find(m => m !== null);
  if (validEx4) return validEx4;


  // Base case: Play the best low hand you can make
  let bestLow = validEvals[0];
  for (let i = 1; i < validEvals.length; i++) {
    if (validEvals[i].front.rankValue > bestLow.front.rankValue) {
      bestLow = validEvals[i];
    }
  }

  // Base exception: If the best low hand ranks lower than 3-with-H6 and the best high hand is 7 or more, play best high hand.
  // 3-with-H6 corresponds to rankValue for 3 points plus tieBreaker >= Chong(3). 
  // Rank of H6 (Chong) is SUIT_RANK.CHANG = 3.
  // So "lower than 3-with-H6" means either < 3 points, OR 3 points but tie breaker < 3 (i.e. highest suit is 0, 1, or 2).
  const isLowerThan3WithH6 = (evalMatch) => {
    const pts = getHandPts(evalMatch.front);
    if (pts < 3) return true;
    if (pts === 3) {
      // Check highest suit rank in front hand
      const hr = Math.max(SUIT_RANK[evalMatch.front.tiles[0].suit], SUIT_RANK[evalMatch.front.tiles[1].suit]);
      if (hr < SUIT_RANK[SUITS.CHANG]) return true;
    }
    return false;
  };

  if (isLowerThan3WithH6(bestLow)) {
    let bestHigh = validEvals[0];
    for (let i = 1; i < validEvals.length; i++) {
      if (validEvals[i].rear.rankValue > bestHigh.rear.rankValue) {
        bestHigh = validEvals[i];
      }
    }
    if (getHandPts(bestHigh.rear) >= 7) {
      return bestHigh;
    }
  }

  return bestLow;
};

export const calculateWinRates = (handTiles, analyzedVariations, discardPile = []) => {
  // 1. Gather all remaining tiles
  const knownTileIds = new Set([...handTiles.map(t => t.id), ...discardPile.map(t => t.id)]);
  const remainingTiles = TILES.filter(t => !knownTileIds.has(t.id));

  // 預期會有 28 張牌，C(28, 4) = 20,475 種組合
  let totalCombinations = 0;

  // 為了效能，不要在這裡每次動態計算 20475 組的 HouseWay
  // 我們直接使用 cache
  const hwMap = getAllHouseWayCombinations();

  const stats = analyzedVariations.map(() => ({ wins: 0, ties: 0, losses: 0 }));

  const n = remainingTiles.length;
  for (let i = 0; i < n - 3; i++) {
    for (let j = i + 1; j < n - 2; j++) {
      for (let k = j + 1; k < n - 1; k++) {
        for (let l = k + 1; l < n; l++) {
          totalCombinations++;
          const dealerKey = (1 << remainingTiles[i].index) | (1 << remainingTiles[j].index) | (1 << remainingTiles[k].index) | (1 << remainingTiles[l].index);
          const dealerHW = hwMap.get(dealerKey);

          if (!dealerHW) continue;

          for (let v = 0; v < analyzedVariations.length; v++) {
            const playerFront = analyzedVariations[v].front.rankValue;
            const playerRear = analyzedVariations[v].rear.rankValue;

            const dealerFront = dealerHW.front.rankValue;
            const dealerRear = dealerHW.rear.rankValue;

            // 使用積分制判斷勝負 (依照使用者規則：一平一勝算贏)
            // 贏 = 1, 平手 (完全同Rank) = 0, 輸 = -1
            const wF = playerFront > dealerFront ? 1 : (playerFront === dealerFront ? 0 : -1);
            const wR = playerRear > dealerRear ? 1 : (playerRear === dealerRear ? 0 : -1);

            const score = wF + wR;

            if (score > 0) {
              stats[v].wins++;
            } else if (score < 0) {
              stats[v].losses++;
            } else {
              stats[v].ties++;
            }
          }
        }
      }
    }
  }

  return { totalCombinations, stats };
};

export const analyzeHand = (handTiles, discardPile = []) => {
  if (handTiles.length !== 4) return [];

  let evaluated = evaluateAllVariations(handTiles);

  // 1. 去除重複 (拿對子時，不同張但同樣的花色組成的排法會重複)
  const uniqueKeys = new Set();
  const uniqueEvaluated = [];
  for (const ev of evaluated) {
    const frontKey = ev.front.tiles.map(t => t.name).sort().join(',');
    const rearKey = ev.rear.tiles.map(t => t.name).sort().join(',');
    const fullKey = [frontKey, rearKey].sort().join('|');
    if (!uniqueKeys.has(fullKey)) {
      uniqueKeys.add(fullKey);
      uniqueEvaluated.push(ev);
    }
  }
  evaluated = uniqueEvaluated;

  const houseWayBest = getHouseWayBest(handTiles, evaluated);

  // 計算 House Way 預期勝率
  const winRates = calculateWinRates(handTiles, evaluated, discardPile);

  // === Game Theory Matrix Solver (Grid Search Approximation) ===
  // We want to find the optimal mixed strategy over `evaluated` (player variations).
  // Strategy: [p1, p2, p3] where sum(p) = 1.
  // For each opponent hand (4 remaining tiles), opponent knows their hand and our discard pile, but not our hand.
  // Opponent picks the split that minimizes our expected payout.

  const knownTileIds = new Set([...handTiles.map(t => t.id), ...discardPile.map(t => t.id)]);
  const remainingTiles = TILES.filter(t => !knownTileIds.has(t.id));
  const n = remainingTiles.length;

  // 1. Precompute payoff matrices for every possible opponent hand
  const hwMap = getAllHouseWayCombinations(); // Use this to get valid splits, we'll evaluate ALL their splits
  const uniqueEvalsMap = getAllUniqueEvalsCombinations();
  const oppHandMatrices = [];

  for (let i = 0; i < n - 3; i++) {
    for (let j = i + 1; j < n - 2; j++) {
      for (let k = j + 1; k < n - 1; k++) {
        for (let l = k + 1; l < n; l++) {
          const oppKey = (1 << remainingTiles[i].index) | (1 << remainingTiles[j].index) | (1 << remainingTiles[k].index) | (1 << remainingTiles[l].index);
          const oppUniqueEvals = uniqueEvalsMap.get(oppKey);

          // Matrix M [playerVarIndex][oppVarIndex] = payoff for player
          const matrix = [];
          for (let pi = 0; pi < evaluated.length; pi++) {
            const pEval = evaluated[pi];
            matrix[pi] = [];
            for (let oi = 0; oi < oppUniqueEvals.length; oi++) {
              const oEval = oppUniqueEvals[oi];

              const wF = pEval.front.rankValue > oEval.front.rankValue ? 1 : (pEval.front.rankValue === oEval.front.rankValue ? 0 : -1);
              const wR = pEval.rear.rankValue > oEval.rear.rankValue ? 1 : (pEval.rear.rankValue === oEval.rear.rankValue ? 0 : -1);
              const score = wF + wR;

              // Payoff: +1 (Win), 0 (Tie), -1 (Loss). Fair Zero-Sum without commission.
              matrix[pi][oi] = score > 0 ? 1 : (score < 0 ? -1 : 0);
            }
          }
          oppHandMatrices.push(matrix);
        }
      }
    }
  }

  // 1.5 Aggregate identical opponent matrices to drastically speed up Grid Search
  const uniqueMatricesMap = new Map();
  for (let mIdx = 0; mIdx < oppHandMatrices.length; mIdx++) {
    const M = oppHandMatrices[mIdx];
    // Encode matrix into a string hash
    const hash = M.map(row => row.join(',')).join('|');
    const existing = uniqueMatricesMap.get(hash);
    if (existing) {
      existing.count += 1;
    } else {
      uniqueMatricesMap.set(hash, { M, count: 1 });
    }
  }
  const uniqueMatrices = Array.from(uniqueMatricesMap.values());
  const matrixCount = oppHandMatrices.length;

  // 2. Grid Search to find optimal [p1, p2, p3...] (up to 3 variations usually)
  let bestGTEv = -Infinity;
  let bestStrategy = [];

  const numVars = evaluated.length;
  if (numVars === 1) {
    bestStrategy = [1.0];
    let totalEV = 0;
    for (const { M, count } of uniqueMatrices) {
      // Opponent minimizes our EV -> picks min over their choices
      let minPlayerEv = Infinity;
      for (let oi = 0; oi < M[0].length; oi++) { // they only have length choices
        const evForOppChoice = M[0][oi] * 1.0;
        if (evForOppChoice < minPlayerEv) minPlayerEv = evForOppChoice;
      }
      totalEV += minPlayerEv * count;
    }
    bestGTEv = totalEV / matrixCount;
  } else if (numVars === 2) {
    for (let p1 = 0; p1 <= 100; p1 += 2) {
      const prob1 = p1 / 100;
      const prob2 = 1 - prob1;
      let totalEV = 0;
      for (const { M, count } of uniqueMatrices) {
        let minPlayerEv = Infinity;
        for (let oi = 0; oi < M[0].length; oi++) {
          let ev = prob1 * M[0][oi] + prob2 * M[1][oi];
          if (ev < minPlayerEv) minPlayerEv = ev;
        }
        totalEV += minPlayerEv * count;
      }
      if (totalEV > bestGTEv) {
        bestGTEv = totalEV;
        bestStrategy = [prob1, prob2];
      }
    }
    bestGTEv /= matrixCount;
  } else if (numVars === 3) {
    for (let p1 = 0; p1 <= 100; p1 += 2) {
      for (let p2 = 0; p2 <= 100 - p1; p2 += 2) {
        const prob1 = p1 / 100;
        const prob2 = p2 / 100;
        const prob3 = 1 - prob1 - prob2;
        let totalEV = 0;
        for (const { M, count } of uniqueMatrices) {
          let minPlayerEv = Infinity;
          for (let oi = 0; oi < M[0].length; oi++) {
            let ev = prob1 * M[0][oi] + prob2 * M[1][oi] + prob3 * M[2][oi];
            if (ev < minPlayerEv) minPlayerEv = ev;
          }
          totalEV += minPlayerEv * count;
        }
        if (totalEV > bestGTEv) {
          bestGTEv = totalEV;
          bestStrategy = [prob1, prob2, prob3];
        }
      }
    }
    bestGTEv /= matrixCount;
  }

  // 寫入勝率與 Game Theory 結果到每一個 variation
  evaluated.forEach((ev, idx) => {
    ev.isHouseWay = (ev === houseWayBest);
    ev.winRateStats = winRates.stats[idx];
    ev.winPercentage = ((ev.winRateStats.wins / winRates.totalCombinations) * 100).toFixed(2);
    ev.lossPercentage = ((ev.winRateStats.losses / winRates.totalCombinations) * 100).toFixed(2);
    ev.tiePercentage = ((ev.winRateStats.ties / winRates.totalCombinations) * 100).toFixed(2);
    // 公平對決: 勝率 EV (無視佣金)
    const hwExpectedValue = (ev.winRateStats.wins - ev.winRateStats.losses) / winRates.totalCombinations;
    ev.ev = hwExpectedValue;

    // Game Theory Ratio
    ev.gameTheoryRatio = bestStrategy[idx] !== undefined ? bestStrategy[idx] : 0;
    ev.gameTheoryEV = bestGTEv;
  });

  // 將 EV 等級排序，或是按照勝率排
  evaluated.sort((a, b) => b.ev - a.ev);

  return evaluated;
};
