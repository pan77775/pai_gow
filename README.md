# Pai Gow Core Engine & Simulator (GTO & House Way)

[繁體中文版 (Traditional Chinese)](README.zh-TW.md)

This project focuses on the core algorithms and computational engine for **Pai Gow Game Theory Optimal (GTO)** and **House Way** strategy analysis.

> **⚠️ Disclaimer**
> The algorithms implemented in this project are built upon the assumption of a **fair, zero-sum game with no house edge and no commission**.
> Real-world casinos take a 5% commission on wins and the banker wins all copy (tie) hands. The logic and EV values calculated by this engine are **STRICTLY NOT APPLICABLE to real-world casino environments**. Do not use this tool for actual gambling.

## Project Focus: Core Evaluation & Strategy Engine

The true value of this project lies in its deep and precise native JavaScript algorithmic implementations. The frontend serves solely as a visual verification and testing interface.

- **Comprehensive Evaluation Engine**:
  Implements the complete ranking logic for all 32 traditional Pai Gow dominoes. Accurately handles Gee Joon (Supreme), Wongs, Gongs, Pairs, and localized suit/rank hierarchies.
- **Authentic House Way Algorithm**:
  Features an implementation of traditional House Way defensive strategies. The algorithm dynamically processes edge cases (e.g., when to split pairs vs. keep them) to output the statistically optimal dealer arrangement.
- **GTO Mixed Strategy Matrix Solver**:
  Goes beyond simple maximum EV calculations. The engine builds payoff matrices against the entire remaining opponent hand space (up to over 20,000 combinations) to determine the mathematically optimal Mixed Strategy frequencies (e.g., 60% Play A, 40% Play B).
- **Extreme Performance & Caching**:
  Heavily utilizes 32-bit bitmasking and Pre-calculation Caching Maps. The engine flawlessly processes and evaluates up to 35,960 permutations in milliseconds, enabling heavy statistical analysis directly within a browser environment.

## Visual Frontend

- A responsive, drag-and-drop testing board built with React and Tailwind CSS.
- Renders accurate Domino dot patterns and displays real-time GT analysis reports, allowing developers to visually verify the engine's probability and strategy outputs.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```

## Standalone Scripts Directory

The `scripts/` directory contains Node.js tools designed to stress-test the core Pai Gow engine without the frontend:
- `testPerf.js`: benchmarking tool for hand combination generation.
- `testHouseWay.js`: tests and verifies specific House Way rule execution in isolated environments.
- `simulateGTO.cjs`: simulates long-running (hands > 10,000) GTO performance evaluations.
- `exportTable.js`: exports enormous pre-calculated caches to external files.
