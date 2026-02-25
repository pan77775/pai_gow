import React, { useState } from 'react';
import { TILES, analyzeHand } from './utils/paiGow';
import Tile from './components/Tile';

function App() {
  const [playerHand, setPlayerHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // 未分配的牌
  const unallocatedTiles = TILES.filter(
    t => !playerHand.some(p => p.id === t.id) && !discardPile.some(d => d.id === t.id)
  );

  const handleTileClick = (tile, source) => {
    setSuggestions([]); // 任何變動都清除建議

    if (source === 'unallocated') {
      if (playerHand.length < 4) {
        setPlayerHand([...playerHand, tile]);
      } else if (discardPile.length < 16) {
        setDiscardPile([...discardPile, tile]);
      }
    } else if (source === 'player') {
      setPlayerHand(playerHand.filter(t => t.id !== tile.id));
    } else if (source === 'discard') {
      setDiscardPile(discardPile.filter(t => t.id !== tile.id));
    }
  };

  const reset = () => {
    setPlayerHand([]);
    setDiscardPile([]);
    setSuggestions([]);
  };

  const randomHand = () => {
    reset();
    const shuffled = [...TILES].sort(() => 0.5 - Math.random());
    setPlayerHand(shuffled.slice(0, 4));
    // 預設棄牌堆給個隨機數量嗎？為了專注測試，我們就不自動塞棄牌了，讓玩家自己選
  };

  const analyze = () => {
    if (playerHand.length !== 4) {
      alert("請選擇 4 張牌作為玩家手牌！");
      return;
    }
    const results = analyzeHand(playerHand, discardPile);
    setSuggestions(results);
  };

  return (
    <div className="min-h-screen py-6 px-4 md:px-10 flex flex-col font-sans text-white">
      {/* 頂部全區未分配牌，兩排陳列 */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-white/80 drop-shadow flex flex-col sm:flex-row items-center gap-2 md:gap-4 text-center sm:text-left">
        天九牌 GTO 分析系統
        <span className="text-xs font-normal text-white/50 bg-black/30 px-2 py-1 rounded">※ 點擊牌將其移入手牌 / 棄牌堆</span>
      </h1>

      <div className="mb-8 md:mb-10 w-full flex justify-center overflow-x-auto pb-4">
        <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-[2px] max-w-fit bg-black/20 p-2 rounded-lg border border-black/40 shadow-inner">
          {TILES.map((tile) => {
            const isUsed = playerHand.some(p => p.id === tile.id) || discardPile.some(d => d.id === tile.id);
            return (
              <Tile
                key={tile.id}
                tile={tile}
                disabled={isUsed}
                onClick={() => handleTileClick(tile, 'unallocated')}
              />
            );
          })}
        </div>
      </div>

      <div className="flex gap-10 flex-col xl:flex-row w-full max-w-[1400px] justify-center items-center xl:items-start">
        {/* 左側與中間區塊 (標題與 Tiles) */}
        <div className="flex flex-col gap-6 w-full max-w-[600px] xl:w-auto">

          {/* Tiles in your hand */}
          <div className="flex flex-col sm:flex-row items-center justify-between xl:justify-start gap-2 sm:gap-4">
            <h2 className="text-xl sm:text-2xl w-full sm:w-[280px] text-center sm:text-right text-white drop-shadow-[1px_2px_3px_rgba(0,0,0,0.8)] font-medium tracking-wide">
              Tiles in your hand:
            </h2>
            <div className="flex gap-1 bg-black/10 p-2 rounded-lg border border-transparent min-w-[240px] justify-center">
              {playerHand.map(tile => (
                <Tile key={`p-${tile.id}`} tile={tile} onClick={() => handleTileClick(tile, 'player')} />
              ))}
              {Array.from({ length: Math.max(0, 4 - playerHand.length) }).map((_, i) => (
                <Tile key={`empty-p-${i}`} tile={null} />
              ))}
            </div>
          </div>

          {/* Discards / Dealer */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between xl:justify-start gap-2 sm:gap-4 mt-2">
            <h2 className="text-xl sm:text-2xl w-full sm:w-[280px] text-center sm:text-right text-white drop-shadow-[1px_2px_3px_rgba(0,0,0,0.8)] font-medium tracking-wide mt-0 sm:mt-2">
              Tiles in discard pile:
            </h2>
            <div className="flex flex-wrap max-w-[480px] gap-1 bg-black/10 p-2 rounded-lg border border-black/20 min-h-[115px]">
              {discardPile.map(tile => (
                <Tile key={`d-${tile.id}`} tile={tile} onClick={() => handleTileClick(tile, 'discard')} />
              ))}
              {discardPile.length < 16 && (
                <div
                  className="w-[50px] h-[95px] rounded-md border-2 border-dashed border-white/20 hover:bg-black/20 m-[2px] flex items-center justify-center text-white/30 text-xs cursor-pointer shadow-inner transition-colors"
                  onClick={() => alert("從上方未分配區點擊加入")}
                >
                  空位
                </div>
              )}
            </div>
          </div>

          {/* 控制按鈕區 */}
          <div className="flex flex-wrap gap-4 mt-4 sm:mt-6 justify-center xl:justify-start sm:ml-[296px]">
            <button
              onClick={reset}
              className="px-4 sm:px-6 py-2 bg-[#d8d8d8] text-black font-bold text-base sm:text-lg rounded shadow-3d-btn active:shadow-3d-btn-pressed hover:bg-white transition-all transform active:translate-y-1"
            >
              Reset
            </button>
            <button
              onClick={randomHand}
              className="px-4 sm:px-6 py-2 bg-[#d8d8d8] text-black font-bold text-base sm:text-lg rounded shadow-3d-btn active:shadow-3d-btn-pressed hover:bg-white transition-all transform active:translate-y-1"
            >
              Random Hand
            </button>
            <button
              onClick={analyze}
              className="px-4 sm:px-6 py-2 bg-[#d8d8d8] text-black font-bold text-base sm:text-lg rounded shadow-3d-btn active:shadow-3d-btn-pressed hover:bg-white transition-all transform active:translate-y-1 sm:ml-4 w-full sm:w-auto mt-2 sm:mt-0"
            >
              Analyze
            </button>
          </div>
        </div>

        {/* 右側分析結果表格區塊 */}
        {suggestions.length > 0 && (
          <div className="flex-1 w-full bg-white text-black shadow-2xl overflow-x-auto rounded-sm border-2 border-black max-w-[600px] self-center xl:self-start mt-8 xl:mt-0">
            <table className="w-full min-w-[340px] border-collapse text-xs sm:text-sm">
              <thead className="bg-[#4aa5d4] text-white font-bold text-base border-b-2 border-black">
                <tr>
                  <th className="p-2 border-r border-black/30 w-[180px]">Play</th>
                  <th className="p-2 border-r border-black/30">Win</th>
                  <th className="p-2 border-r border-black/30">Push</th>
                  <th className="p-2 border-r border-black/30">Lose</th>
                  <th className="p-2">Return</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((s, index) => (
                  <tr key={index} className={`border-b border-black/30 text-center font-mono ${index === 0 ? "bg-yellow-300 font-bold" : "bg-white"}`}>
                    <td className="p-2 border-r border-black/30 flex items-center justify-center gap-1">
                      {/* 縮小的排法展示 */}
                      <div className="flex flex-col gap-1 pr-2 border-r border-black/20">
                        <div className="flex gap-[2px]">
                          {s.front.tiles.map(t => (
                            <Tile key={`f-${t.id}`} tile={t} small disabled />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pl-1">
                        <div className="flex gap-[2px]">
                          {s.rear.tiles.map(t => (
                            <Tile key={`r-${t.id}`} tile={t} small disabled />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 border-r border-black/30 text-right pr-4">
                      {s.winRateStats.wins.toLocaleString()}
                    </td>
                    <td className="p-2 border-r border-black/30 text-right pr-4">
                      {s.winRateStats.ties.toLocaleString()}
                    </td>
                    <td className="p-2 border-r border-black/30 text-right pr-4">
                      {s.winRateStats.losses.toLocaleString()}
                    </td>
                    <td className="p-2 text-right pr-4 tracking-wide font-bold">
                      {s.ev > 0 ? "+" : ""}{s.ev.toFixed(6)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
