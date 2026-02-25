import React from "react";

// Helper function to render dots based on number and red/white rules
const renderDots = (tile, num, isTop) => {
    // 依據天九牌規則決定紅色點：
    // 1點、4點 為全紅。
    // 其餘(2,3,5,6) 預設為全白。
    const isRed = (num === 1 || num === 4);
    const dotClass = `dot ${isRed ? 'dot-red' : ''}`;

    switch (num) {
        case 1:
            // 只有「地牌」的紅心是放大尺寸，其他牌的 1 點維持正常大小
            const isDi = (tile.name === '地');
            return <div className={`${dotClass} dot-center ${isDi ? 'dot-large' : ''}`}></div>;
        case 2:
            if (isTop) {
                return (
                    <>
                        <div className={`${dotClass} dot-top-left`}></div>
                        <div className={`${dotClass} dot-top-right`}></div>
                    </>
                );
            } else {
                return (
                    <>
                        <div className={`${dotClass} dot-bottom-left`}></div>
                        <div className={`${dotClass} dot-bottom-right`}></div>
                    </>
                );
            }
        case 3:
            return (
                <>
                    <div className={`${dotClass} dot-top-left`}></div>
                    <div className={`${dotClass} dot-center`}></div>
                    <div className={`${dotClass} dot-bottom-right`}></div>
                </>
            );
        case 4:
            return (
                <>
                    <div className={`${dotClass} dot-top-left`}></div>
                    <div className={`${dotClass} dot-top-right`}></div>
                    <div className={`${dotClass} dot-bottom-left`}></div>
                    <div className={`${dotClass} dot-bottom-right`}></div>
                </>
            );
        case 5:
            return (
                <>
                    <div className={`${dotClass} dot-top-left`}></div>
                    <div className={`${dotClass} dot-top-right`}></div>
                    <div className={`${dotClass} dot-center`}></div>
                    <div className={`${dotClass} dot-bottom-left`}></div>
                    <div className={`${dotClass} dot-bottom-right`}></div>
                </>
            );
        case 6:
            // 天牌[6,6] 的特別規則：
            // 上方 6 點: 左三顆紅點、右三顆白點。下方 6 點: 左三面白點、右三顆紅點。
            if (tile.name === '天') {
                const redLeft = isTop;
                const leftClass = `dot ${redLeft ? 'dot-red' : ''}`;
                const rightClass = `dot ${redLeft ? '' : 'dot-red'}`;
                return (
                    <>
                        <div className={`${leftClass} dot-top-left`}></div>
                        <div className={`${leftClass} dot-mid-left`}></div>
                        <div className={`${leftClass} dot-bottom-left`}></div>
                        <div className={`${rightClass} dot-top-right`}></div>
                        <div className={`${rightClass} dot-mid-right`}></div>
                        <div className={`${rightClass} dot-bottom-right`}></div>
                    </>
                );
            }

            // 一般的 6 點全白 (例如 短六 等牌)
            return (
                <>
                    <div className={`${dotClass} dot-top-left`}></div>
                    <div className={`${dotClass} dot-mid-left`}></div>
                    <div className={`${dotClass} dot-bottom-left`}></div>
                    <div className={`${dotClass} dot-top-right`}></div>
                    <div className={`${dotClass} dot-mid-right`}></div>
                    <div className={`${dotClass} dot-bottom-right`}></div>
                </>
            );
        default:
            return null;
    }
};

export default function Tile({ tile, onClick, selected, disabled, small = false }) {
    // 雙層 Responsive 架構：外層決定 Flex/Grid 佔據空間，內層負責原尺寸畫面等比縮放
    // 原始 50x95 (1:1.9). 手機版採用 35x66.5 (scale: 0.7), small 版為 22.5x42.75 (scale: 0.45)
    const outerWidth = small ? "w-[23px]" : "w-[35px] lg:w-[50px]";
    const outerHeight = small ? "h-[43px]" : "h-[66.5px] lg:h-[95px]";
    const innerScale = small ? "scale-[0.45]" : "scale-[0.7] lg:scale-100";

    if (!tile) {
        // 佔位符
        return (
            <div className={`${outerWidth} ${outerHeight} shrink-0 m-[1px] sm:m-[2px]`}>
                <div className={`w-[50px] h-[95px] origin-top-left transform ${innerScale}`}>
                    <div className="w-full h-full rounded-md border border-white/10 bg-black shadow-tile flex items-center justify-center opacity-40"></div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`${outerWidth} ${outerHeight} shrink-0 m-[1px] sm:m-[2px] cursor-pointer`}
            onClick={() => !disabled && onClick && onClick(tile)}
        >
            {/* 靜態比例鎖定層 */}
            <div className={`w-[50px] h-[95px] origin-top-left transform ${innerScale}`}>
                {/* 狀態動畫與骨牌核心層 */}
                <div
                    className={`
                        relative w-full h-full rounded-md
                        transition-all duration-200 bg-black shadow-tile flex flex-col justify-between
                        border border-gray-700/50
                        ${selected ? "ring-2 ring-casino-gold -translate-y-2 scale-105" : ""}
                        ${disabled ? "opacity-20 cursor-default" : "hover:-translate-y-1 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)]"}
                    `}
                >
                    {/* 骨牌表面的高光反射層 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-md z-10"></div>

                    {/* 上半部點數 (不再需要動態 scale，因為已被外層統包縮放) */}
                    <div className={`dice-face dots-${tile.face[0]} flex-1 origin-top`}>
                        {renderDots(tile, tile.face[0], true)}
                    </div>

                    {/* 中間的白色分隔線 (骨牌特徵) */}
                    <div className="w-[80%] h-px bg-gray-600/60 mx-auto z-0 shadow-[0_1px_1px_rgba(0,0,0,0.8)]"></div>

                    {/* 下半部點數 */}
                    <div className={`dice-face dots-${tile.face[1]} flex-1 origin-bottom`}>
                        {renderDots(tile, tile.face[1], false)}
                    </div>
                </div>
            </div>
        </div>
    );
}
