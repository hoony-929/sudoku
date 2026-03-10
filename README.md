# Sudoku App

## Run

1. Open PowerShell in `D:\sudoku-app`
2. Run `npm.cmd run dev`
3. Open `http://127.0.0.1:4173`

## Features

- 9x9 Sudoku board
- Daily challenge and classic mode
- Undo, erase, notes, and hints
- Note conflict checks for row, column, and 3x3 block
- Number pad count badges
- Hint confirmation popup
- Multilingual UI in Korean, English, Japanese, and Chinese
- Daily completion marker on the calendar

## Files

- `index.html`: layout and modal structure
- `styles.css`: visual styles and responsive layout
- `app.js`: game logic, translations, calendar flow, and modal logic
- `server.js`: local static dev server

## AdSense Setup

- This project now includes a policy-safer AdSense mount only on the home screen.
- It stays hidden until you fill `D:\sudoku-app\ads-config.js` with your approved AdSense values.
- Edit `client` to your `ca-pub-...` value.
- Edit `slots.home` to your AdSense display ad slot id.
- Avoid placing ads next to the game number pad or hint buttons.
- Do not show forced ads after mistakes or on every action.
