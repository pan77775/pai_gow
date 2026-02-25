import React, { useState } from 'react';
import { TILES, analyzeHand } from './utils/paiGow';
import Tile from './components/Tile';

function App() {
  const [playerHand, setPlayerHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [targetArea, setTargetArea] = useState('player'); // 'player' | 'discard'

  // 未分配的牌
  const unallocatedTiles = TILES.filter(
    t => !playerHand.some(p => p.id === t.id) && !discardPile.some(d => d.id === t.id)
  );

  const handleTileClick = (tile, source) => {
    setSuggestions([]); // 任何變動都清除建議

    if (source === 'unallocated') {
      if (targetArea === 'player') {
        if (playerHand.length < 4) {
          setPlayerHand([...playerHand, tile]);
        } else {
          // 若手牌已滿 4 張，自動切換到棄牌堆繼續選
          setTargetArea('discard');
          if (discardPile.length < 16) setDiscardPile([...discardPile, tile]);
        }
      } else if (targetArea === 'discard') {
        if (discardPile.length < 16) setDiscardPile([...discardPile, tile]);
      }
    } else if (source === 'player') {
      setPlayerHand(playerHand.filter(t => t.id !== tile.id));
      setTargetArea('player'); // 點手牌拿掉時，自動切回選手牌模式
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
    // 使用 100dvh 確保佔滿手機一頁，並鎖定 overflow-hidden 禁止滑動
    <div className="h-[100dvh] w-full overflow-hidden bg-[#5b896b] py-2 lg:py-4 px-2 lg:px-6 flex flex-col font-sans text-white relative flex-1">
      {/* 頂部全區未分配牌，兩排陳列 */}
      <h1 className="text-base sm:text-2xl font-bold mb-2 lg:mb-4 mt-1 lg:mt-2 text-white/80 drop-shadow flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center sm:text-left shrink-0">
        天九牌 GTO 分析系統
        <span className="text-[10px] sm:text-xs font-normal text-white/50 bg-black/30 px-2 py-1 rounded">※ 點擊牌將其移入手牌 / 棄牌堆</span>
      </h1>

      <div className="mb-2 lg:mb-10 w-full flex justify-center shrink-0">
        {/* 手機版 (小於 lg): 8 欄自動折 4 列，不再需要 min-w-max 或外層縮放，因為 Tile 本身已經做了實質縮小 */}
        <div className="grid grid-cols-8 lg:grid-cols-[repeat(16,minmax(0,1fr))] gap-[2px] bg-black/20 p-2 lg:p-3 rounded-lg border border-black/40 shadow-inner mx-auto">
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

      <div className="flex gap-2 lg:gap-10 flex-col xl:flex-row w-full max-w-[1400px] mx-auto justify-center items-center xl:items-start shrink-0 overflow-y-auto lg:overflow-visible pb-4">
        {/* 左側與中間區塊 (標題與 Tiles) */}
        <div className="flex flex-col gap-2 lg:gap-6 w-full max-w-[600px] xl:w-auto items-center xl:items-start">

          {/* Tiles in your hand */}
          <div className="flex flex-col sm:flex-row items-center justify-between xl:justify-start gap-1 lg:gap-4 w-full">
            <h2
              className={`text-lg lg:text-2xl w-full sm:w-[280px] text-center xl:text-right drop-shadow-[1px_2px_3px_rgba(0,0,0,0.8)] font-medium tracking-wide cursor-pointer transition-colors ${targetArea === 'player' ? 'text-casino-gold font-bold' : 'text-white hover:text-white/80'}`}
              onClick={() => setTargetArea('player')}
            >
              Tiles in your hand:
            </h2>
            <div
              className={`flex gap-1 bg-black/10 p-2 rounded-lg border min-w-[170px] lg:min-w-[240px] justify-center cursor-pointer transition-all ${targetArea === 'player' ? 'border-casino-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] bg-black/30' : 'border-transparent hover:border-white/20'}`}
              onClick={() => setTargetArea('player')}
            >
              {playerHand.map(tile => (
                <Tile key={`p-${tile.id}`} tile={tile} onClick={() => handleTileClick(tile, 'player')} />
              ))}
              {Array.from({ length: Math.max(0, 4 - playerHand.length) }).map((_, i) => (
                <div key={`empty-p-${i}`} className="w-[35px] h-[66.5px] lg:w-[50px] lg:h-[95px] m-[1px] sm:m-[2px] opacity-0" /> // 佔位以防點擊穿透 Tile.jsx 的 empty state
              ))}
              {/* Overlay 裝飾：避免因為只有四張牌點不到外框，讓整個 div 底色可見，並利用絕對定位覆蓋處理點擊 */}
              {playerHand.length < 4 && (
                <div className="absolute inset-0 pointer-events-none" />
              )}
            </div>
          </div>

          {/* Discards / Dealer */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between xl:justify-start gap-1 lg:gap-4 mt-1 lg:mt-2 w-full">
            <h2
              className={`text-lg lg:text-2xl w-full sm:w-[280px] text-center xl:text-right drop-shadow-[1px_2px_3px_rgba(0,0,0,0.8)] font-medium tracking-wide mt-0 sm:mt-2 cursor-pointer transition-colors ${targetArea === 'discard' ? 'text-casino-gold font-bold' : 'text-white hover:text-white/80'}`}
              onClick={() => setTargetArea('discard')}
            >
              Tiles in discard pile:
            </h2>
            <div
              className={`grid grid-cols-8 gap-[2px] bg-black/10 p-2 lg:p-3 rounded-lg border w-max mx-auto xl:mx-0 transition-all cursor-pointer ${targetArea === 'discard' ? 'border-casino-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] bg-black/30' : 'border-black/20 hover:border-white/20 shadow-inner'}`}
              onClick={() => setTargetArea('discard')}
            >
              {discardPile.map(tile => (
                <Tile key={`d-${tile.id}`} tile={tile} onClick={() => handleTileClick(tile, 'discard')} />
              ))}
              {Array.from({ length: Math.max(0, 16 - discardPile.length) }).map((_, i) => (
                <div
                  key={`empty-d-${i}`}
                  className="w-[35px] h-[66.5px] lg:w-[50px] lg:h-[95px] rounded-md border-2 border-dashed border-white/20 m-[1px] sm:m-[2px] flex items-center justify-center text-white/30 text-[10px] lg:text-xs shadow-inner transition-colors pointer-events-none"
                >
                  空位
                </div>
              ))}
            </div>
          </div>

          {/* 控制按鈕區 */}
          <div className="flex flex-wrap gap-2 lg:gap-4 mt-2 lg:mt-6 justify-center xl:justify-start xl:ml-[296px]">
            <button
              onClick={reset}
              className="px-4 sm:px-6 py-2 bg-[#d8d8d8] text-black font-bold text-sm lg:text-lg rounded shadow-3d-btn active:shadow-3d-btn-pressed hover:bg-white transition-all transform active:translate-y-1"
            >
              Reset
            </button>
            <button
              onClick={randomHand}
              className="px-4 sm:px-6 py-2 bg-[#d8d8d8] text-black font-bold text-sm lg:text-lg rounded shadow-3d-btn active:shadow-3d-btn-pressed hover:bg-white transition-all transform active:translate-y-1"
            >
              Random Hand
            </button>
            <button
              onClick={analyze}
              className="px-4 sm:px-6 py-2 bg-[#d8d8d8] text-black font-bold text-sm lg:text-lg rounded shadow-3d-btn active:shadow-3d-btn-pressed hover:bg-white transition-all transform active:translate-y-1 sm:ml-4 w-full sm:w-auto mt-2 sm:mt-0"
            >
              Analyze
            </button>
          </div>
        </div>

        {/* 彈出式分析結果 Modal */}
        {suggestions.length > 0 && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white text-black shadow-2xl rounded-lg border-2 border-black max-w-[600px] w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Modal 標題與關閉按鈕 */}
              <div className="bg-[#1b3a26] text-white p-3 flex justify-between items-center border-b-2 border-black">
                <h3 className="font-bold text-lg drop-shadow">Analysis Results</h3>
                <button
                  onClick={() => setSuggestions([])}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold h-8 w-8 rounded flex items-center justify-center shadow-inner"
                >
                  ✕
                </button>
              </div>

              {/* 表格內容區塊，允許內部滾動避免超過螢幕 */}
              <div className="overflow-auto w-full">
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
                        <td className="p-2 border-r border-black/30 font-bold bg-[#cdedd7]/50">{s.winRateStats.wins.toLocaleString()}</td>
                        <td className="p-2 border-r border-black/30 text-gray-600">{s.winRateStats.ties.toLocaleString()}</td>
                        <td className="p-2 border-r border-black/30 text-gray-500">{s.winRateStats.losses.toLocaleString()}</td>
                        <td className="p-2 font-bold text-blue-800">{s.ev > 0 ? "+" : ""}{s.ev.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-gray-100 border-t border-black/20 text-xs text-right text-gray-600">
                * Highlighted row represents the GTO (highest EV) strategy
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
