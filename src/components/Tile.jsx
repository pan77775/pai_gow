import React from "react";

export default function Tile({ tile, onClick, selected, disabled }) {
    if (!tile) {
        // 佔位符
        return (
            <div className="w-[50px] h-[95px] rounded-md border border-white/10 bg-[#111] shadow-tile m-1"></div>
        );
    }

    // 利用 ID (去後綴) 作為圖片名稱，例如 tian_1 => tian.png
    const imageName = tile.id.split('_')[0];
    const imageSrc = `/images/${imageName}.png`;

    return (
        <div
            onClick={() => !disabled && onClick && onClick(tile)}
            className={`
        relative w-[50px] h-[95px] rounded-md m-1 cursor-pointer
        transition-all duration-200 bg-[#0a0a0a] shadow-tile
        flex items-center justify-center overflow-hidden
        border border-gray-700/50
        ${selected ? "ring-2 ring-casino-gold -translate-y-2 scale-105" : ""}
        ${disabled ? "opacity-90 cursor-default" : "hover:-translate-y-1 hover:shadow-lg"}
      `}
        >
            {/* 骨牌表面的高光反射層 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none rounded-md"></div>

            <img
                src={imageSrc}
                alt={tile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                    // 若圖片不存在，給予文字提示作為 fallback
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="text-white text-xs">${tile.name}</span>`;
                }}
            />
        </div>
    );
}
