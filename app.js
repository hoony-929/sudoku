const TODAY = { year: 2026, month: 3, day: 11 };
const START_MONTH = 1;

const BASE_SOLUTION = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const DIFFICULTY_CONFIG = {
  easy: { label: "일반 모드 · 하", removals: 40 },
  medium: { label: "일반 모드 · 중", removals: 48 },
  hard: { label: "일반 모드 · 상", removals: 54 },
  daily: { label: "데일리 도전", removals: 52 }
};

const screens = {
  home: document.getElementById("homeScreen"),
  daily: document.getElementById("dailyScreen"),
  difficulty: document.getElementById("difficultyScreen"),
  game: document.getElementById("gameScreen")
};

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const hintMetaElement = document.getElementById("hintMeta");
const numberPadElement = document.getElementById("numberPad");
const hintCountElement = document.getElementById("hintCount");
const gameBadgeElement = document.getElementById("gameBadge");
const gameTitleElement = document.getElementById("gameTitle");
const dailyTitleElement = document.getElementById("dailyTitle");
const monthTabsElement = document.getElementById("monthTabs");
const calendarGridElement = document.getElementById("calendarGrid");
const dailySelectionTextElement = document.getElementById("dailySelectionText");
const completeOverlayElement = document.getElementById("completeOverlay");

const undoBtn = document.getElementById("undoBtn");
const eraseBtn = document.getElementById("eraseBtn");
const noteBtn = document.getElementById("noteBtn");
const hintBtn = document.getElementById("hintBtn");

const state = {
  currentScreen: "home",
  dailySelectedMonth: TODAY.month,
  dailySelectedDay: TODAY.day,
  game: null
};

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function mulberry32(seed) {
  let current = seed >>> 0;
  return function random() {
    current += 0x6d2b79f5;
    let result = current;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(array, random) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function cloneGrid(grid) {
  return grid.map((row) => [...row]);
}

function transpose(grid) {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}

function swapRowsWithinBands(grid, random) {
  const next = [];
  for (let band = 0; band < 3; band += 1) {
    const rows = [0, 1, 2].map((offset) => grid[band * 3 + offset]);
    next.push(...shuffled(rows, random));
  }
  return next;
}

function swapBands(grid, random) {
  const bands = [0, 1, 2].map((band) => grid.slice(band * 3, band * 3 + 3));
  return shuffled(bands, random).flat();
}

function remapDigits(grid, random) {
  const digits = shuffled([1, 2, 3, 4, 5, 6, 7, 8, 9], random);
  const map = new Map(digits.map((digit, index) => [index + 1, digit]));
  return grid.map((row) => row.map((value) => map.get(value)));
}

function generateSolution(seed) {
  const random = mulberry32(seed);
  let grid = cloneGrid(BASE_SOLUTION);
  grid = swapRowsWithinBands(grid, random);
  grid = swapBands(grid, random);
  grid = transpose(grid);
  grid = swapRowsWithinBands(grid, random);
  grid = swapBands(grid, random);
  grid = transpose(grid);
  return remapDigits(grid, random);
}

function generatePuzzle(solution, removals, seed) {
  const random = mulberry32(seed ^ 0x9e3779b9);
  const puzzle = cloneGrid(solution);
  const positions = [];

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      positions.push({ row, col });
    }
  }

  const rowClues = new Array(9).fill(9);
  const colClues = new Array(9).fill(9);
  const blockClues = new Array(9).fill(9);
  let removed = 0;

  shuffled(positions, random).forEach(({ row, col }) => {
    if (removed >= removals) {
      return;
    }

    const block = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    if (rowClues[row] <= 3 || colClues[col] <= 3 || blockClues[block] <= 3) {
      return;
    }

    puzzle[row][col] = 0;
    rowClues[row] -= 1;
    colClues[col] -= 1;
    blockClues[block] -= 1;
    removed += 1;
  });

  return puzzle;
}

function createCells(puzzle) {
  return puzzle.map((row, rowIndex) =>
    row.map((value, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      value,
      fixed: value !== 0,
      notes: []
    }))
  );
}

function cloneCells(cells) {
  return cells.map((row) => row.map((cell) => ({ ...cell, notes: [...cell.notes] })));
}

function gameSnapshot(game) {
  return {
    cells: cloneCells(game.cells),
    selected: game.selected ? { ...game.selected } : null,
    noteMode: game.noteMode,
    hintsRemaining: game.hintsRemaining,
    highlightNumber: game.highlightNumber,
    blinkKey: game.blinkKey,
    completed: game.completed
  };
}

function restoreSnapshot(game, snapshot) {
  game.cells = cloneCells(snapshot.cells);
  game.selected = snapshot.selected ? { ...snapshot.selected } : null;
  game.noteMode = snapshot.noteMode;
  game.hintsRemaining = snapshot.hintsRemaining;
  game.highlightNumber = snapshot.highlightNumber;
  game.blinkKey = snapshot.blinkKey || null;
  game.completed = snapshot.completed;
}

function buildSession({ mode, title, badge, seed, removals }) {
  const solution = generateSolution(seed);
  const puzzle = generatePuzzle(solution, removals, seed + 17);
  return {
    mode,
    title,
    badge,
    solution,
    cells: createCells(puzzle),
    selected: null,
    noteMode: false,
    hintsRemaining: 3,
    history: [],
    highlightNumber: null,
    blinkKey: null,
    status: "칸을 선택하세요.",
    completed: false
  };
}

function openScreen(screenName) {
  state.currentScreen = screenName;
  Object.entries(screens).forEach(([name, element]) => {
    element.classList.toggle("hidden", name !== screenName);
  });
}

function setStatus(message) {
  if (state.game) {
    state.game.status = message;
  }
  statusElement.textContent = message;
}

function getSelectedCell(game) {
  if (!game || !game.selected) {
    return null;
  }
  return game.cells[game.selected.row][game.selected.col];
}

function isRelated(row, col, selected) {
  if (!selected) {
    return false;
  }

  const sameRow = selected.row === row;
  const sameCol = selected.col === col;
  const sameBlock =
    Math.floor(selected.row / 3) === Math.floor(row / 3) &&
    Math.floor(selected.col / 3) === Math.floor(col / 3);

  return sameRow || sameCol || sameBlock;
}

function hasConflict(game, row, col, value) {
  if (!value) {
    return false;
  }

  for (let index = 0; index < 9; index += 1) {
    if (index !== col && game.cells[row][index].value === value) {
      return true;
    }
    if (index !== row && game.cells[index][col].value === value) {
      return true;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let currentRow = startRow; currentRow < startRow + 3; currentRow += 1) {
    for (let currentCol = startCol; currentCol < startCol + 3; currentCol += 1) {
      const sameCell = currentRow === row && currentCol === col;
      if (!sameCell && game.cells[currentRow][currentCol].value === value) {
        return true;
      }
    }
  }

  return false;
}

function getRowColConflicts(game, row, col, value) {
  const conflicts = [];
  if (!value) {
    return conflicts;
  }

  for (let index = 0; index < 9; index += 1) {
    if (index !== col && game.cells[row][index].value === value) {
      conflicts.push({ row, col: index });
    }
    if (index !== row && game.cells[index][col].value === value) {
      conflicts.push({ row: index, col });
    }
  }

  return conflicts;
}

function triggerConflictBlink(game, conflicts) {
  if (conflicts.length === 0) {
    return;
  }

  game.blinkKey = `${Date.now()}-${Math.random()}`;
  renderGame();

  setTimeout(() => {
    if (!state.game || state.game !== game) {
      return;
    }
    if (state.game.blinkKey === game.blinkKey) {
      state.game.blinkKey = null;
      renderGame();
    }
  }, 900);
}

function isConflictBlinkCell(game, cell) {
  if (!game.blinkKey || !game.selected) {
    return false;
  }

  const selectedCell = getSelectedCell(game);
  if (!selectedCell || selectedCell.value === 0) {
    return false;
  }

  return getRowColConflicts(game, selectedCell.row, selectedCell.col, selectedCell.value).some(
    (target) => target.row === cell.row && target.col === cell.col
  );
}

function isWrongCell(game, cell) {
  return !cell.fixed && cell.value !== 0 && cell.value !== game.solution[cell.row][cell.col];
}

function isComplete(game) {
  return game.cells.every((row) =>
    row.every((cell) => cell.value !== 0 && cell.value === game.solution[cell.row][cell.col])
  );
}

function saveHistory(game) {
  game.history.push(gameSnapshot(game));
}

function updateHighlightFromSelection(game) {
  const cell = getSelectedCell(game);
  game.highlightNumber = cell && cell.value !== 0 ? cell.value : null;
}

function clearNotesFromRowCol(game, row, col, number) {
  for (let index = 0; index < 9; index += 1) {
    if (index !== col) {
      game.cells[row][index].notes = game.cells[row][index].notes.filter((note) => note !== number);
    }
    if (index !== row) {
      game.cells[index][col].notes = game.cells[index][col].notes.filter((note) => note !== number);
    }
  }
}

function isNumberCompleteAcrossBlocks(game, number) {
  for (let blockRow = 0; blockRow < 3; blockRow += 1) {
    for (let blockCol = 0; blockCol < 3; blockCol += 1) {
      let found = false;
      for (let row = blockRow * 3; row < blockRow * 3 + 3; row += 1) {
        for (let col = blockCol * 3; col < blockCol * 3 + 3; col += 1) {
          if (game.cells[row][col].value === number) {
            found = true;
          }
        }
      }
      if (!found) {
        return false;
      }
    }
  }
  return true;
}

function getPlacedCount(game, number) {
  let count = 0;
  game.cells.forEach((row) => {
    row.forEach((cell) => {
      if (cell.value === number) {
        count += 1;
      }
    });
  });
  return count;
}

function isFutureDate(month, day) {
  if (month > TODAY.month) {
    return true;
  }
  if (month < TODAY.month) {
    return false;
  }
  return day > TODAY.day;
}

function normalizeSelectedDate() {
  if (state.dailySelectedMonth > TODAY.month) {
    state.dailySelectedMonth = TODAY.month;
    state.dailySelectedDay = TODAY.day;
  }

  const maxDay = state.dailySelectedMonth === TODAY.month ? TODAY.day : daysInMonth(TODAY.year, state.dailySelectedMonth);
  if (state.dailySelectedDay > maxDay) {
    state.dailySelectedDay = maxDay;
  }
}

function renderMonthTabs() {
  monthTabsElement.innerHTML = "";
  for (let month = START_MONTH; month <= TODAY.month; month += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "month-tab";
    button.textContent = `${month}월`;
    if (month === state.dailySelectedMonth) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      state.dailySelectedMonth = month;
      normalizeSelectedDate();
      renderDailyCalendar();
    });
    monthTabsElement.appendChild(button);
  }
}

function renderCalendar() {
  calendarGridElement.innerHTML = "";
  const firstWeekday = new Date(TODAY.year, state.dailySelectedMonth - 1, 1).getDay();
  const monthDays = daysInMonth(TODAY.year, state.dailySelectedMonth);

  for (let emptyIndex = 0; emptyIndex < firstWeekday; emptyIndex += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-empty";
    calendarGridElement.appendChild(emptyCell);
  }

  for (let day = 1; day <= monthDays; day += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(day);

    const isToday = state.dailySelectedMonth === TODAY.month && day === TODAY.day;
    const isSelected = day === state.dailySelectedDay;
    const disabled = isFutureDate(state.dailySelectedMonth, day);

    if (isToday) {
      button.classList.add("today");
    }
    if (isSelected) {
      button.classList.add("selected");
    }
    if (disabled) {
      button.disabled = true;
    } else {
      button.addEventListener("click", () => {
        state.dailySelectedDay = day;
        renderDailyCalendar();
      });
    }

    calendarGridElement.appendChild(button);
  }
}

function renderDailySelectionText() {
  const selectedText = `${state.dailySelectedMonth}월 ${state.dailySelectedDay}일 선택됨`;
  const isToday = state.dailySelectedMonth === TODAY.month && state.dailySelectedDay === TODAY.day;
  dailySelectionTextElement.textContent = isToday
    ? `${selectedText} · 오늘의 데일리 퍼즐이 열립니다.`
    : `${selectedText} · 선택한 날짜 기준 랜덤 퍼즐이 열립니다.`;
}

function renderDailyCalendar() {
  dailyTitleElement.textContent = `${TODAY.year}년 ${state.dailySelectedMonth}월`;
  renderMonthTabs();
  renderCalendar();
  renderDailySelectionText();
}

function renderBoard() {
  const game = state.game;
  boardElement.innerHTML = "";

  game.cells.forEach((row) => {
    row.forEach((cell) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cell";
      button.setAttribute("aria-label", `${cell.row + 1}행 ${cell.col + 1}열`);

      if ((cell.col + 1) % 3 === 0 && cell.col !== 8) {
        button.classList.add("block-right");
      }
      if ((cell.row + 1) % 3 === 0 && cell.row !== 8) {
        button.classList.add("block-bottom");
      }
      if (cell.fixed) {
        button.classList.add("fixed");
      }
      if (game.selected && game.selected.row === cell.row && game.selected.col === cell.col) {
        button.classList.add("selected");
      } else if (isRelated(cell.row, cell.col, game.selected)) {
        button.classList.add("related");
      }
      if (game.highlightNumber && cell.value === game.highlightNumber) {
        button.classList.add("same-number");
      }
      if (isConflictBlinkCell(game, cell)) {
        button.classList.add("conflict-blink");
      }
      if (isWrongCell(game, cell)) {
        button.classList.add("wrong");
      }

      if (cell.value !== 0) {
        const value = document.createElement("span");
        value.className = "cell-value";
        value.textContent = String(cell.value);
        button.appendChild(value);
      } else {
        const notesGrid = document.createElement("div");
        notesGrid.className = "notes-grid";
        for (let number = 1; number <= 9; number += 1) {
          const noteItem = document.createElement("div");
          noteItem.className = "note-item";
          noteItem.textContent = cell.notes.includes(number) ? String(number) : "";
          notesGrid.appendChild(noteItem);
        }
        button.appendChild(notesGrid);
      }

      button.addEventListener("click", () => selectCell(cell.row, cell.col));
      boardElement.appendChild(button);
    });
  });
}

function renderNumberPad() {
  const game = state.game;
  numberPadElement.innerHTML = "";
  numberPadElement.classList.toggle("note-active", game.noteMode);

  for (let number = 1; number <= 9; number += 1) {
    const button = document.createElement("button");
    const value = document.createElement("span");
    const count = document.createElement("span");

    button.type = "button";
    button.className = "number-pad-btn";
    value.className = "number-pad-value";
    count.className = "number-pad-count";

    value.textContent = String(number);
    count.textContent = String(getPlacedCount(game, number));

    button.disabled = isNumberCompleteAcrossBlocks(game, number);
    button.appendChild(value);
    button.appendChild(count);
    button.addEventListener("click", () => handleNumberInput(number));
    numberPadElement.appendChild(button);
  }
}

function renderGameMeta() {
  const game = state.game;
  gameBadgeElement.textContent = game.badge;
  gameTitleElement.textContent = game.title;
  statusElement.textContent = game.status;
  hintMetaElement.textContent = `힌트 ${game.hintsRemaining}회 남음`;
  hintCountElement.textContent = String(game.hintsRemaining);
  noteBtn.classList.toggle("active", game.noteMode);
  undoBtn.disabled = game.history.length === 0;
  hintBtn.disabled = game.hintsRemaining === 0;
}

function renderGame() {
  if (!state.game) {
    return;
  }
  renderGameMeta();
  renderBoard();
  renderNumberPad();
}

function closeCompletionOverlay() {
  completeOverlayElement.classList.add("hidden");
  completeOverlayElement.setAttribute("aria-hidden", "true");
}

function showCompletionOverlay() {
  completeOverlayElement.classList.remove("hidden");
  completeOverlayElement.setAttribute("aria-hidden", "false");
}

function startGame(options) {
  state.game = buildSession(options);
  closeCompletionOverlay();
  openScreen("game");
  renderGame();
}

function startDailyChallenge() {
  const isToday = state.dailySelectedMonth === TODAY.month && state.dailySelectedDay === TODAY.day;
  const dateSeed = Number(`${TODAY.year}${String(state.dailySelectedMonth).padStart(2, "0")}${String(state.dailySelectedDay).padStart(2, "0")}`);
  const seed = isToday ? dateSeed : Math.floor(Math.random() * 1000000) + dateSeed;
  startGame({
    mode: "daily",
    title: `${state.dailySelectedMonth}월 ${state.dailySelectedDay}일 퍼즐`,
    badge: isToday ? "데일리 도전" : "랜덤 도전",
    seed,
    removals: DIFFICULTY_CONFIG.daily.removals
  });
}

function startClassicMode(difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const seed = Math.floor(Math.random() * 1000000) + Date.now();
  startGame({
    mode: difficulty,
    title: `난이도 ${difficulty === "easy" ? "하" : difficulty === "medium" ? "중" : "상"}`,
    badge: config.label,
    seed,
    removals: config.removals
  });
}

function selectCell(row, col) {
  const game = state.game;
  game.selected = { row, col };
  game.blinkKey = null;
  updateHighlightFromSelection(game);

  const cell = game.cells[row][col];
  if (cell.fixed) {
    setStatus("기본으로 주어진 숫자는 수정할 수 없습니다.");
  } else if (cell.value !== 0) {
    setStatus(game.noteMode ? "노트 모드가 켜져 있습니다." : "같은 숫자들이 함께 강조됩니다.");
  } else {
    setStatus(game.noteMode ? "노트 모드입니다." : "숫자를 입력하세요.");
  }

  renderGame();
}

function toggleValue(game, cell, number) {
  if (cell.value === number) {
    cell.value = 0;
    cell.notes = [];
    return { message: "숫자를 지웠습니다.", blink: [] };
  }

  const rowColConflicts = getRowColConflicts(game, cell.row, cell.col, number);
  if (rowColConflicts.length > 0) {
    return { message: "같은 가로줄이나 세로줄에 같은 숫자가 있습니다.", blink: rowColConflicts };
  }

  if (hasConflict(game, cell.row, cell.col, number)) {
    return { message: "같은 행, 열, 3x3 블록에 같은 숫자를 둘 수 없습니다.", blink: [] };
  }

  cell.value = number;
  cell.notes = [];

  if (number === game.solution[cell.row][cell.col]) {
    clearNotesFromRowCol(game, cell.row, cell.col, number);
  }

  return {
    message: number === game.solution[cell.row][cell.col] ? "숫자를 입력했습니다." : "틀린 숫자입니다. 빨간색으로 표시됩니다.",
    blink: []
  };
}

function toggleNote(game, cell, number) {
  const rowColConflicts = getRowColConflicts(game, cell.row, cell.col, number);
  if (rowColConflicts.length > 0) {
    return { message: "노트 모드에서도 같은 가로줄이나 세로줄 숫자는 표시할 수 없습니다.", blink: rowColConflicts };
  }

  if (cell.value === number) {
    cell.value = 0;
    return { message: "같은 숫자를 다시 눌러 값을 지웠습니다.", blink: [] };
  }

  if (cell.value !== 0) {
    cell.value = 0;
  }

  if (cell.notes.includes(number)) {
    cell.notes = cell.notes.filter((item) => item !== number);
    return { message: "노트를 지웠습니다.", blink: [] };
  }

  cell.notes = [...cell.notes, number].sort((a, b) => a - b);
  return { message: "노트를 표시했습니다.", blink: [] };
}

function finishIfComplete(game) {
  if (!game.completed && isComplete(game)) {
    game.completed = true;
    setStatus("완성했습니다! 스도쿠를 모두 맞췄습니다.");
    renderGame();
    showCompletionOverlay();
    return true;
  }
  return false;
}

function handleNumberInput(number) {
  const game = state.game;
  if (!game.selected) {
    setStatus("먼저 칸을 선택하세요.");
    renderGame();
    return;
  }

  const cell = getSelectedCell(game);
  if (cell.fixed) {
    const blink = getRowColConflicts(game, cell.row, cell.col, cell.value);
    triggerConflictBlink(game, blink);
    setStatus("기본 숫자는 변경할 수 없습니다.");
    renderGame();
    return;
  }

  saveHistory(game);
  const result = game.noteMode ? toggleNote(game, cell, number) : toggleValue(game, cell, number);

  if (result.message.includes("둘 수 없습니다") || result.message.includes("표시할 수 없습니다") || result.message.includes("같은 가로줄이나 세로줄")) {
    game.history.pop();
  }

  updateHighlightFromSelection(game);
  triggerConflictBlink(game, result.blink);

  if (!finishIfComplete(game)) {
    setStatus(result.message);
    renderGame();
  }
}

function eraseSelectedCell() {
  const game = state.game;
  if (!game.selected) {
    setStatus("먼저 칸을 선택하세요.");
    renderGame();
    return;
  }

  const cell = getSelectedCell(game);
  if (cell.fixed) {
    setStatus("기본 숫자는 지울 수 없습니다.");
    renderGame();
    return;
  }

  if (cell.value === 0 && cell.notes.length === 0) {
    setStatus("이미 비어 있는 칸입니다.");
    renderGame();
    return;
  }

  saveHistory(game);
  cell.value = 0;
  cell.notes = [];
  game.blinkKey = null;
  updateHighlightFromSelection(game);
  setStatus("선택한 칸을 지웠습니다.");
  renderGame();
}

function toggleNoteMode() {
  const game = state.game;
  game.noteMode = !game.noteMode;
  setStatus(game.noteMode ? "노트 모드가 켜졌습니다." : "노트 모드가 꺼졌습니다.");
  renderGame();
}

function useHint() {
  const game = state.game;
  if (!game.selected) {
    setStatus("먼저 칸을 선택하세요.");
    renderGame();
    return;
  }
  if (game.hintsRemaining === 0) {
    setStatus("힌트는 모두 사용했습니다.");
    renderGame();
    return;
  }

  const cell = getSelectedCell(game);
  if (cell.fixed) {
    setStatus("기본 숫자가 있는 칸입니다.");
    renderGame();
    return;
  }

  const correctValue = game.solution[cell.row][cell.col];
  if (cell.value === correctValue) {
    setStatus("이미 올바른 숫자가 들어 있습니다.");
    renderGame();
    return;
  }

  saveHistory(game);
  cell.value = correctValue;
  cell.notes = [];
  clearNotesFromRowCol(game, cell.row, cell.col, correctValue);
  game.hintsRemaining -= 1;
  game.blinkKey = null;
  updateHighlightFromSelection(game);

  if (!finishIfComplete(game)) {
    setStatus(`힌트를 사용했습니다. 남은 힌트: ${game.hintsRemaining}`);
    renderGame();
  }
}

function undo() {
  const game = state.game;
  const snapshot = game.history.pop();
  if (!snapshot) {
    setStatus("되돌릴 동작이 없습니다.");
    renderGame();
    return;
  }

  restoreSnapshot(game, snapshot);
  closeCompletionOverlay();
  setStatus("이전 상태로 되돌렸습니다.");
  renderGame();
}

function goHome() {
  closeCompletionOverlay();
  openScreen("home");
}

document.getElementById("dailyEntryBtn").addEventListener("click", () => {
  state.dailySelectedMonth = TODAY.month;
  state.dailySelectedDay = TODAY.day;
  renderDailyCalendar();
  closeCompletionOverlay();
  openScreen("daily");
});

document.getElementById("startEntryBtn").addEventListener("click", () => {
  closeCompletionOverlay();
  openScreen("difficulty");
});

document.getElementById("dailyBackBtn").addEventListener("click", goHome);
document.getElementById("difficultyBackBtn").addEventListener("click", goHome);
document.getElementById("homeBtn").addEventListener("click", goHome);
document.getElementById("completeHomeBtn").addEventListener("click", goHome);
document.getElementById("dailyStartBtn").addEventListener("click", startDailyChallenge);

document.querySelectorAll(".difficulty-btn").forEach((button) => {
  button.addEventListener("click", () => {
    startClassicMode(button.dataset.difficulty);
  });
});

undoBtn.addEventListener("click", undo);
eraseBtn.addEventListener("click", eraseSelectedCell);
noteBtn.addEventListener("click", toggleNoteMode);
hintBtn.addEventListener("click", useHint);

normalizeSelectedDate();
renderDailyCalendar();
openScreen("home");
closeCompletionOverlay();


