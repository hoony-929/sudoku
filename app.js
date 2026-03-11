
const TODAY = { year: 2026, month: 3, day: 11 };
const START_MONTH = 1;
const LANGUAGES = ["ko", "en", "ja", "zh"];
const DAILY_STORAGE_KEY = "sudoku-completed-days";
const MAX_MISTAKES = 5;

const TRANSLATIONS = {
  ko: {
    homeEyebrow: "Minimal Sudoku",
    homeTitle: "Sudoku",
    homeCopy: "데일리 도전, 일반 모드, 실시간 언어 전환까지 한 화면에서 바로 즐길 수 있는 스도쿠입니다.",
    homeHelp: "설명 보기",
    dailyEntry: "데일리 도전",
    startEntry: "START",
    back: "뒤로",
    dailyEyebrow: "Daily Challenge",
    dailyCopy: "2026년 1월부터 오늘인 3월 11일까지 선택할 수 있습니다. 미래 날짜는 잠겨 있습니다.",
    dailyStart: "선택한 날짜로 시작",
    difficultyEyebrow: "Classic Mode",
    difficultyTitle: "난이도 선택",
    easyLabel: "하",
    easyCopy: "가볍게 시작하는 퍼즐",
    mediumLabel: "중",
    mediumCopy: "생각할 거리가 있는 퍼즐",
    hardLabel: "상",
    hardCopy: "집중해서 푸는 퍼즐",
    undo: "실행 취소",
    erase: "지우개",
    note: "노트",
    hint: "힌트",
    completeTitle: "완료!",
    completeCopy: "모든 숫자를 채워 퍼즐을 해결했습니다.",
    completeHome: "처음으로",
    settingsHomeTitle: "설정",
    settingsGameTitle: "게임 설정",
    settingsHomeCopy: "언어를 바꾸면 첫 화면 문구가 즉시 반영됩니다.",
    settingsGameCopy: "언어를 바꾸면 게임 화면과 도움말 문구가 즉시 반영됩니다.",
    settingsLanguage: "언어",
    settingsHomeAction: "처음으로",
    hintModalTitle: "힌트를 사용하시겠습니까?",
    hintModalCopy: "'예'를 눌러야지만 힌트가 사용됩니다.",
    restartModalTitle: "다시 시작하시겠습니까?",
    restartModalCopy: "이미 완료한 날짜입니다.",
    yes: "예",
    no: "아니오",
    weekday0: "일",
    weekday1: "월",
    weekday2: "화",
    weekday3: "수",
    weekday4: "목",
    weekday5: "금",
    weekday6: "토",
    monthTab: "{month}월",
    dailyMonthTitle: "{year}년 {month}월",
    dailySelectionToday: "{month}월 {day}일 선택됨 · 오늘의 데일리 퍼즐이 열립니다.",
    dailySelectionRandom: "{month}월 {day}일 선택됨 · 선택한 날짜 기준 랜덤 퍼즐이 열립니다.",
    badgeDaily: "데일리 도전",
    badgeRandom: "랜덤 도전",
    badgeEasy: "일반 모드 · 하",
    badgeMedium: "일반 모드 · 중",
    badgeHard: "일반 모드 · 상",
    gameTitleDaily: "{month}월 {day}일 퍼즐",
    gameTitleDifficulty: "난이도 {label}",
    difficultyWordEasy: "하",
    difficultyWordMedium: "중",
    difficultyWordHard: "상",
    hintRemaining: "힌트 {count}회 남음",
    mistakesLabel: "오답 {count}/5",
    elapsedLabel: "경과시간 {time}",
    helpTitle: "설명 보기",
    helpIntro: "스도쿠 기본 규칙과 키보드 사용법을 한 번에 볼 수 있습니다.",
    helpRulesTitle: "스도쿠 규칙",
    helpRule1: "같은 가로줄에는 같은 숫자가 들어갈 수 없습니다.",
    helpRule2: "같은 세로줄에는 같은 숫자가 들어갈 수 없습니다.",
    helpRule3: "같은 3x3 블록 안에도 같은 숫자가 들어갈 수 없습니다.",
    helpControlsTitle: "조작 방법",
    helpControl1: "칸을 선택한 뒤 아래 숫자 버튼이나 키보드 숫자 1~9를 누르면 입력됩니다.",
    helpControl2: "Delete 또는 Backspace를 누르면 지우개와 같은 동작을 합니다.",
    helpControl3: "노트 모드에서는 같은 규칙을 지키는 후보 숫자만 메모할 수 있습니다.",
    helpControl4: "힌트는 총 3번까지 사용할 수 있고, 확인 팝업에서 '예'를 눌러야 사용됩니다.",
    helpControl5: "숫자가 모두 맞으면 완료 애니메이션이 표시됩니다.",
    helpStepRulesRow: "가로줄 규칙",
    helpStepRulesColumn: "세로줄 규칙",
    helpStepRulesBlock: "3x3 블록 규칙",
    helpStepControls: "조작 방법",
    helpPrev: "이전",
    helpNext: "다음",
    helpDone: "확인",
    failTitle: "실패했습니다",
    failCopy: "오답 5회를 모두 사용했습니다. 다시 도전하거나 돌아갈 수 있습니다.",
    failRetry: "다시 도전",
    failBack: "돌아가기"
  },
  en: {
    homeEyebrow: "Minimal Sudoku",
    homeTitle: "Sudoku",
    homeCopy: "Play daily challenges, classic mode, and live language switching from one polished screen.",
    homeHelp: "How To Play",
    dailyEntry: "Daily Challenge",
    startEntry: "START",
    back: "Back",
    dailyEyebrow: "Daily Challenge",
    dailyCopy: "You can pick any date from January 2026 to today, March 11. Future dates stay locked.",
    dailyStart: "Start Selected Date",
    difficultyEyebrow: "Classic Mode",
    difficultyTitle: "Choose Difficulty",
    easyLabel: "Easy",
    easyCopy: "A lighter puzzle to warm up",
    mediumLabel: "Medium",
    mediumCopy: "A balanced puzzle with some bite",
    hardLabel: "Hard",
    hardCopy: "A tougher puzzle for focus",
    undo: "Undo",
    erase: "Erase",
    note: "Notes",
    hint: "Hint",
    completeTitle: "Complete!",
    completeCopy: "You filled every number and solved the puzzle.",
    completeHome: "Home",
    settingsHomeTitle: "Settings",
    settingsGameTitle: "Game Settings",
    settingsHomeCopy: "Changing the language updates the home screen immediately.",
    settingsGameCopy: "Changing the language updates the game screen and help text instantly.",
    settingsLanguage: "Language",
    settingsHomeAction: "Go Home",
    hintModalTitle: "Use a hint?",
    hintModalCopy: "A hint is only consumed when you press 'Yes'.",
    restartModalTitle: "Start again?",
    restartModalCopy: "This daily challenge is already cleared.",
    yes: "Yes",
    no: "No",
    weekday0: "Sun",
    weekday1: "Mon",
    weekday2: "Tue",
    weekday3: "Wed",
    weekday4: "Thu",
    weekday5: "Fri",
    weekday6: "Sat",
    monthTab: "{month}",
    dailyMonthTitle: "{monthName} {year}",
    dailySelectionToday: "{monthName} {day} selected · Today's daily puzzle will open.",
    dailySelectionRandom: "{monthName} {day} selected · A random puzzle for that date will open.",
    badgeDaily: "Daily Challenge",
    badgeRandom: "Random Challenge",
    badgeEasy: "Classic · Easy",
    badgeMedium: "Classic · Medium",
    badgeHard: "Classic · Hard",
    gameTitleDaily: "{monthName} {day} Puzzle",
    gameTitleDifficulty: "{label} Difficulty",
    difficultyWordEasy: "Easy",
    difficultyWordMedium: "Medium",
    difficultyWordHard: "Hard",
    hintRemaining: "{count} hints left",
    mistakesLabel: "Mistakes {count}/5",
    elapsedLabel: "Time {time}",
    helpTitle: "How To Play",
    helpIntro: "Here are the core rules and keyboard shortcuts.",
    helpRulesTitle: "Sudoku Rules",
    helpRule1: "The same number cannot appear twice in any row.",
    helpRule2: "The same number cannot appear twice in any column.",
    helpRule3: "The same number cannot appear twice in any 3x3 block.",
    helpControlsTitle: "Controls",
    helpControl1: "Select a cell, then use the number buttons or keyboard keys 1-9 to enter values.",
    helpControl2: "Delete or Backspace works like the eraser button.",
    helpControl3: "In note mode, only candidates that follow the same Sudoku rules can be added.",
    helpControl4: "You can use up to 3 hints, and a hint is only spent after pressing 'Yes'.",
    helpControl5: "A completion animation appears once every number is correct.",
    helpStepRulesRow: "Row Rule",
    helpStepRulesColumn: "Column Rule",
    helpStepRulesBlock: "3x3 Block Rule",
    helpStepControls: "Controls",
    helpPrev: "Back",
    helpNext: "Next",
    helpDone: "Done",
    failTitle: "Failed",
    failCopy: "You used all 5 mistakes. You can retry this puzzle or go back.",
    failRetry: "Retry",
    failBack: "Go Back"
  },
  ja: {
    homeEyebrow: "Minimal Sudoku",
    homeTitle: "Sudoku",
    homeCopy: "デイリーチャレンジ、通常モード、言語切り替えをひとつの画面で楽しめる数独です。",
    homeHelp: "説明を見る",
    dailyEntry: "デイリーチャレンジ",
    startEntry: "START",
    back: "戻る",
    dailyEyebrow: "Daily Challenge",
    dailyCopy: "2026年1月から本日3月11日まで選択できます。未来の日付はロックされています。",
    dailyStart: "この日付で開始",
    difficultyEyebrow: "Classic Mode",
    difficultyTitle: "難易度を選択",
    easyLabel: "初級",
    easyCopy: "軽く始められるパズル",
    mediumLabel: "中級",
    mediumCopy: "ほどよく考えるパズル",
    hardLabel: "上級",
    hardCopy: "集中して解くパズル",
    undo: "元に戻す",
    erase: "消しゴム",
    note: "メモ",
    hint: "ヒント",
    completeTitle: "クリア!",
    completeCopy: "すべての数字を埋めてパズルを解きました。",
    completeHome: "ホームへ",
    settingsHomeTitle: "設定",
    settingsGameTitle: "ゲーム設定",
    settingsHomeCopy: "言語を変えるとホーム画面の文言がすぐに切り替わります。",
    settingsGameCopy: "言語を変えるとゲーム画面とヘルプがすぐに切り替わります。",
    settingsLanguage: "言語",
    settingsHomeAction: "ホームへ",
    hintModalTitle: "ヒントを使いますか?",
    hintModalCopy: "「はい」を押したときだけヒントが消費されます。",
    restartModalTitle: "もう一度始めますか?",
    restartModalCopy: "このデイリーチャレンジはすでにクリア済みです。",
    yes: "はい",
    no: "いいえ",
    weekday0: "日",
    weekday1: "月",
    weekday2: "火",
    weekday3: "水",
    weekday4: "木",
    weekday5: "金",
    weekday6: "土",
    monthTab: "{month}月",
    dailyMonthTitle: "{year}年{month}月",
    dailySelectionToday: "{month}月{day}日を選択中 · 今日のデイリーパズルを開きます。",
    dailySelectionRandom: "{month}月{day}日を選択中 · その日付のランダムパズルを開きます。",
    badgeDaily: "デイリーチャレンジ",
    badgeRandom: "ランダムチャレンジ",
    badgeEasy: "通常モード · 初級",
    badgeMedium: "通常モード · 中級",
    badgeHard: "通常モード · 上級",
    gameTitleDaily: "{month}月{day}日のパズル",
    gameTitleDifficulty: "難易度 {label}",
    difficultyWordEasy: "初級",
    difficultyWordMedium: "中級",
    difficultyWordHard: "上級",
    hintRemaining: "ヒント残り {count}",
    mistakesLabel: "ミス {count}/5",
    elapsedLabel: "時間 {time}",
    helpTitle: "説明を見る",
    helpIntro: "基本ルールとキーボード操作をまとめて確認できます。",
    helpRulesTitle: "数独のルール",
    helpRule1: "同じ行に同じ数字は入れられません。",
    helpRule2: "同じ列に同じ数字は入れられません。",
    helpRule3: "同じ 3x3 ブロックにも同じ数字は入れられません。",
    helpControlsTitle: "操作方法",
    helpControl1: "マスを選んでから、数字ボタンまたはキーボードの 1〜9 で入力します。",
    helpControl2: "Delete または Backspace は消しゴムと同じ動作です。",
    helpControl3: "メモモードでも同じルールを満たす候補だけを追加できます。",
    helpControl4: "ヒントは 3 回まで使え、「はい」を押したときだけ消費されます。",
    helpControl5: "すべて正解するとクリアアニメーションが表示されます。",
    helpStepRulesRow: "行のルール",
    helpStepRulesColumn: "列のルール",
    helpStepRulesBlock: "3x3 ブロックのルール",
    helpStepControls: "操作方法",
    helpPrev: "前へ",
    helpNext: "次へ",
    helpDone: "確認",
    failTitle: "失敗しました",
    failCopy: "ミス 5 回をすべて使いました。同じパズルに再挑戦するか戻ることができます。",
    failRetry: "再挑戦",
    failBack: "戻る"
  },
  zh: {
    homeEyebrow: "Minimal Sudoku",
    homeTitle: "Sudoku",
    homeCopy: "在同一个界面中体验每日挑战、普通模式和实时语言切换的数独。",
    homeHelp: "查看说明",
    dailyEntry: "每日挑战",
    startEntry: "START",
    back: "返回",
    dailyEyebrow: "Daily Challenge",
    dailyCopy: "可以选择 2026 年 1 月到今天 3 月 11 日之间的日期，未来日期已锁定。",
    dailyStart: "按所选日期开始",
    difficultyEyebrow: "Classic Mode",
    difficultyTitle: "选择难度",
    easyLabel: "简单",
    easyCopy: "轻松开始的题目",
    mediumLabel: "中等",
    mediumCopy: "有一定思考量的题目",
    hardLabel: "困难",
    hardCopy: "需要专注挑战的题目",
    undo: "撤销",
    erase: "橡皮擦",
    note: "笔记",
    hint: "提示",
    completeTitle: "完成!",
    completeCopy: "你已经填满所有数字并完成了这道题。",
    completeHome: "回到首页",
    settingsHomeTitle: "设置",
    settingsGameTitle: "游戏设置",
    settingsHomeCopy: "切换语言后，首页文案会立刻更新。",
    settingsGameCopy: "切换语言后，游戏界面和帮助内容会立刻更新。",
    settingsLanguage: "语言",
    settingsHomeAction: "回到首页",
    hintModalTitle: "要使用提示吗?",
    hintModalCopy: "只有点击“是”后才会真正消耗提示。",
    restartModalTitle: "要重新开始吗?",
    restartModalCopy: "这个每日挑战已经完成过了。",
    yes: "是",
    no: "否",
    weekday0: "日",
    weekday1: "一",
    weekday2: "二",
    weekday3: "三",
    weekday4: "四",
    weekday5: "五",
    weekday6: "六",
    monthTab: "{month}月",
    dailyMonthTitle: "{year}年{month}月",
    dailySelectionToday: "已选择 {month} 月 {day} 日 · 将打开今天的每日题目。",
    dailySelectionRandom: "已选择 {month} 月 {day} 日 · 将打开该日期的随机题目。",
    badgeDaily: "每日挑战",
    badgeRandom: "随机挑战",
    badgeEasy: "普通模式 · 简单",
    badgeMedium: "普通模式 · 中等",
    badgeHard: "普通模式 · 困难",
    gameTitleDaily: "{month} 月 {day} 日题目",
    gameTitleDifficulty: "{label} 难度",
    difficultyWordEasy: "简单",
    difficultyWordMedium: "中等",
    difficultyWordHard: "困难",
    hintRemaining: "剩余提示 {count} 次",
    mistakesLabel: "错误 {count}/5",
    elapsedLabel: "时间 {time}",
    helpTitle: "查看说明",
    helpIntro: "这里可以快速查看规则和键盘操作。",
    helpRulesTitle: "数独规则",
    helpRule1: "同一行里不能出现重复数字。",
    helpRule2: "同一列里不能出现重复数字。",
    helpRule3: "同一个 3x3 宫格里也不能出现重复数字。",
    helpControlsTitle: "操作方式",
    helpControl1: "先选择格子，再点击数字按钮或按键盘 1-9 输入。",
    helpControl2: "Delete 或 Backspace 的效果与橡皮擦按钮相同。",
    helpControl3: "笔记模式下也只能添加符合相同规则的候选数字。",
    helpControl4: "提示最多可用 3 次，并且只有点击“是”后才会消耗。",
    helpControl5: "全部数字正确后会显示完成动画。",
    helpStepRulesRow: "行规则",
    helpStepRulesColumn: "列规则",
    helpStepRulesBlock: "3x3 宫格规则",
    helpStepControls: "操作方式",
    helpPrev: "上一页",
    helpNext: "下一页",
    helpDone: "完成",
    failTitle: "失败了",
    failCopy: "你已用完 5 次错误机会。可以重新挑战或返回。",
    failRetry: "重新挑战",
    failBack: "返回"
  }
};

const MONTH_NAMES = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

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

const DIFFICULTY_CONFIG = { easy: { removals: 40 }, medium: { removals: 48 }, hard: { removals: 54 }, daily: { removals: 48 } };
const PREVIEW_BOARD = [[5,0,0,2,7,0,1,0,9],[0,7,0,0,0,1,0,2,0],[1,0,4,0,0,0,6,0,0],[0,0,7,0,4,0,0,9,0],[4,0,0,9,0,3,0,0,2],[0,9,0,0,6,0,5,0,0],[0,0,1,0,0,0,7,0,4],[0,4,0,1,0,0,0,5,0],[7,0,8,0,5,4,0,0,6]];

const screens = { home: document.getElementById("homeScreen"), daily: document.getElementById("dailyScreen"), difficulty: document.getElementById("difficultyScreen"), game: document.getElementById("gameScreen") };
const elements = {
  board: document.getElementById("board"), numberPad: document.getElementById("numberPad"), hintCount: document.getElementById("hintCount"), hintBtnLabel: document.getElementById("hintBtnLabel"), hintMeta: document.getElementById("hintMeta"), timerMeta: document.getElementById("timerMeta"), mistakeMeta: document.getElementById("mistakeMeta"),
  gameBadge: document.getElementById("gameBadge"), gameTitle: document.getElementById("gameTitle"), monthTabs: document.getElementById("monthTabs"), weekdayRow: document.getElementById("weekdayRow"), calendarGrid: document.getElementById("calendarGrid"), dailyTitle: document.getElementById("dailyTitle"),
  dailySelectionText: document.getElementById("dailySelectionText"), completeOverlay: document.getElementById("completeOverlay"), settingsOverlay: document.getElementById("settingsOverlay"), confirmOverlay: document.getElementById("confirmOverlay"), helpOverlay: document.getElementById("helpOverlay"), failOverlay: document.getElementById("failOverlay"),
  helpModalBody: document.getElementById("helpModalBody"), gameHelpPanel: document.getElementById("gameHelpPanel"), gameHelpPanelTitle: document.getElementById("gameHelpPanelTitle"), gameHelpPanelBody: document.getElementById("gameHelpPanelBody"), gameLayout: document.getElementById("gameLayout"), heroPreviewBoard: document.getElementById("heroPreviewBoard")
};

const state = { language: "ko", currentScreen: "home", settingsContext: "home", dailySelectedMonth: TODAY.month, dailySelectedDay: TODAY.day, game: null, confirmAction: null, completedDates: loadCompletedDates(), gameHelpOpen: false, helpPage: 0 };

function t(key, params = {}) { const template = TRANSLATIONS[state.language][key] || TRANSLATIONS.ko[key] || key; return template.replace(/\{(\w+)\}/g, (_, token) => String(params[token] ?? "")); }
function monthName(month) { return MONTH_NAMES[state.language]?.[month - 1] || String(month); }
function loadCompletedDates() { try { return new Set(JSON.parse(localStorage.getItem(DAILY_STORAGE_KEY) || "[]")); } catch { return new Set(); } }
function persistCompletedDates() { localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify([...state.completedDates])); }
function getDailyDateKey(month, day) { return `${TODAY.year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }
function markDailyCompleted(month, day) { state.completedDates.add(getDailyDateKey(month, day)); persistCompletedDates(); }
function mulberry32(seed) { let current = seed >>> 0; return function next() { current += 0x6d2b79f5; let result = current; result = Math.imul(result ^ (result >>> 15), result | 1); result ^= result + Math.imul(result ^ (result >>> 7), result | 61); return ((result ^ (result >>> 14)) >>> 0) / 4294967296; }; }
function shuffled(array, random) { const copy = [...array]; for (let index = copy.length - 1; index > 0; index -= 1) { const swapIndex = Math.floor(random() * (index + 1)); [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]; } return copy; }
function cloneGrid(grid) { return grid.map((row) => [...row]); }
function transpose(grid) { return grid[0].map((_, col) => grid.map((row) => row[col])); }
function swapRowsWithinBands(grid, random) { const next = []; for (let band = 0; band < 3; band += 1) { const rows = [0,1,2].map((offset) => grid[band * 3 + offset]); next.push(...shuffled(rows, random)); } return next; }
function swapBands(grid, random) { const bands = [0,1,2].map((band) => grid.slice(band * 3, band * 3 + 3)); return shuffled(bands, random).flat(); }
function remapDigits(grid, random) { const digits = shuffled([1,2,3,4,5,6,7,8,9], random); const digitMap = new Map(digits.map((digit, index) => [index + 1, digit])); return grid.map((row) => row.map((value) => digitMap.get(value))); }
function generateSolution(seed) { const random = mulberry32(seed); let grid = cloneGrid(BASE_SOLUTION); grid = swapRowsWithinBands(grid, random); grid = swapBands(grid, random); grid = transpose(grid); grid = swapRowsWithinBands(grid, random); grid = swapBands(grid, random); grid = transpose(grid); return remapDigits(grid, random); }
function generatePuzzle(solution, removals, seed) {
  const random = mulberry32(seed ^ 0x9e3779b9); const puzzle = cloneGrid(solution); const positions = []; const rowClues = new Array(9).fill(9); const colClues = new Array(9).fill(9); const blockClues = new Array(9).fill(9); let removed = 0;
  for (let row = 0; row < 9; row += 1) { for (let col = 0; col < 9; col += 1) { positions.push({ row, col }); } }
  shuffled(positions, random).forEach(({ row, col }) => { if (removed >= removals) { return; } const block = Math.floor(row / 3) * 3 + Math.floor(col / 3); if (rowClues[row] <= 3 || colClues[col] <= 3 || blockClues[block] <= 3) { return; } puzzle[row][col] = 0; rowClues[row] -= 1; colClues[col] -= 1; blockClues[block] -= 1; removed += 1; });
  return puzzle;
}
function createCells(puzzle) { return puzzle.map((row, rowIndex) => row.map((value, colIndex) => ({ row: rowIndex, col: colIndex, value, fixed: value !== 0, notes: [] }))); }
function cloneCells(cells) { return cells.map((row) => row.map((cell) => ({ ...cell, notes: [...cell.notes] }))); }
function buildSession(options) {
  const solution = generateSolution(options.seed); const puzzle = generatePuzzle(solution, options.removals, options.seed + 17);
  return { mode: options.mode, dailyMonth: options.dailyMonth || null, dailyDay: options.dailyDay || null, difficulty: options.difficulty || null, badgeKey: options.badgeKey, titleMode: options.titleMode, seed: options.seed, removals: options.removals, solution, puzzle, cells: createCells(puzzle), history: [], selected: null, noteMode: false, hintsRemaining: 3, completed: false, highlightNumber: null, blinkCells: new Set(), blinkToken: null, elapsedSeconds: 0, startedAt: Date.now(), timerId: null, mistakes: 0 };
}
function getSelectedCell(game) { return game?.selected ? game.cells[game.selected.row][game.selected.col] : null; }
function updateHighlight(game) { const cell = getSelectedCell(game); game.highlightNumber = cell && cell.value !== 0 ? cell.value : null; }
function saveHistory(game) { game.history.push({ cells: cloneCells(game.cells), selected: game.selected ? { ...game.selected } : null, noteMode: game.noteMode, hintsRemaining: game.hintsRemaining, completed: game.completed, highlightNumber: game.highlightNumber }); }
function restoreSnapshot(game, snapshot) { game.cells = cloneCells(snapshot.cells); game.selected = snapshot.selected ? { ...snapshot.selected } : null; game.noteMode = snapshot.noteMode; game.hintsRemaining = snapshot.hintsRemaining; game.completed = snapshot.completed; game.highlightNumber = snapshot.highlightNumber; game.blinkCells = new Set(); game.blinkToken = null; }
function isRelated(row, col, selected) { return !!selected && (selected.row === row || selected.col === col || (Math.floor(selected.row / 3) === Math.floor(row / 3) && Math.floor(selected.col / 3) === Math.floor(col / 3))); }
function getConflicts(game, row, col, number) {
  const seen = new Map(); if (!number) { return []; }
  for (let index = 0; index < 9; index += 1) { if (index !== col && game.cells[row][index].value === number) { seen.set(`${row}-${index}`, { row, col: index }); } if (index !== row && game.cells[index][col].value === number) { seen.set(`${index}-${col}`, { row: index, col }); } }
  const startRow = Math.floor(row / 3) * 3; const startCol = Math.floor(col / 3) * 3;
  for (let currentRow = startRow; currentRow < startRow + 3; currentRow += 1) { for (let currentCol = startCol; currentCol < startCol + 3; currentCol += 1) { if ((currentRow !== row || currentCol !== col) && game.cells[currentRow][currentCol].value === number) { seen.set(`${currentRow}-${currentCol}`, { row: currentRow, col: currentCol }); } } }
  return [...seen.values()];
}
function triggerConflictBlink(game, conflicts) { if (!conflicts.length) { return; } const token = `${Date.now()}-${Math.random()}`; game.blinkToken = token; game.blinkCells = new Set(conflicts.map((cell) => `${cell.row}-${cell.col}`)); renderGame(); window.setTimeout(() => { if (!state.game || state.game !== game || game.blinkToken !== token) { return; } game.blinkCells = new Set(); game.blinkToken = null; renderGame(); }, 900); }
function isWrongCell(game, cell) { return !cell.fixed && cell.value !== 0 && cell.value !== game.solution[cell.row][cell.col]; }
function isComplete(game) { return game.cells.every((row) => row.every((cell) => cell.value !== 0 && cell.value === game.solution[cell.row][cell.col])); }
function clearRelatedNotes(game, row, col, number) {
  const targets = new Map(); for (let index = 0; index < 9; index += 1) { if (index !== col) { targets.set(`${row}-${index}`, game.cells[row][index]); } if (index !== row) { targets.set(`${index}-${col}`, game.cells[index][col]); } }
  const startRow = Math.floor(row / 3) * 3; const startCol = Math.floor(col / 3) * 3;
  for (let currentRow = startRow; currentRow < startRow + 3; currentRow += 1) { for (let currentCol = startCol; currentCol < startCol + 3; currentCol += 1) { if (currentRow !== row || currentCol !== col) { targets.set(`${currentRow}-${currentCol}`, game.cells[currentRow][currentCol]); } } }
  targets.forEach((cell) => { cell.notes = cell.notes.filter((note) => note !== number); });
}
function isNumberCompleteAcrossBlocks(game, number) { for (let blockRow = 0; blockRow < 3; blockRow += 1) { for (let blockCol = 0; blockCol < 3; blockCol += 1) { let found = false; for (let row = blockRow * 3; row < blockRow * 3 + 3; row += 1) { for (let col = blockCol * 3; col < blockCol * 3 + 3; col += 1) { if (game.cells[row][col].value === number) { found = true; } } } if (!found) { return false; } } } return true; }
function getPlacedCount(game, number) { let count = 0; game.cells.forEach((row) => row.forEach((cell) => { if (cell.value === number) { count += 1; } })); return count; }
function openScreen(name) { Object.entries(screens).forEach(([key, element]) => { element.classList.toggle("hidden", key !== name); }); state.currentScreen = name; if (name !== "game") { state.gameHelpOpen = false; renderGameHelpPanel(); } }
function showOverlay(overlay) { overlay.classList.remove("hidden"); overlay.setAttribute("aria-hidden", "false"); }
function hideOverlay(overlay) { overlay.classList.add("hidden"); overlay.setAttribute("aria-hidden", "true"); }
function openFailOverlay() { renderFailModal(); showOverlay(elements.failOverlay); }
function closeFailOverlay() { hideOverlay(elements.failOverlay); }
function openSettings(context) { state.settingsContext = context; renderSettingsModal(); showOverlay(elements.settingsOverlay); }
function closeSettings() { hideOverlay(elements.settingsOverlay); }
function openHelpModal() { state.helpPage = 0; renderHelpContent(elements.helpModalBody); document.getElementById("helpModalTitle").textContent = t("helpTitle"); showOverlay(elements.helpOverlay); }
function closeHelpModal() { hideOverlay(elements.helpOverlay); }
function getHelpPages() { return [{ title: t("helpRulesTitle"), subtitle: t("helpStepRulesRow"), body: t("helpRule1"), example: "row" }, { title: t("helpRulesTitle"), subtitle: t("helpStepRulesColumn"), body: t("helpRule2"), example: "column" }, { title: t("helpRulesTitle"), subtitle: t("helpStepRulesBlock"), body: t("helpRule3"), example: "block" }, { title: t("helpControlsTitle"), subtitle: t("helpStepControls"), list: [t("helpControl1"), t("helpControl2"), t("helpControl3"), t("helpControl4"), t("helpControl5")], example: "controls" }]; }
function getHelpExampleBoard(type) { const empty = Array.from({ length: 81 }, () => ""); if (type === "row") { empty[9] = "5"; empty[11] = "3"; empty[13] = "5"; empty[15] = "8"; return { cells: empty, focus: [1], conflicts: [9, 13] }; } if (type === "column") { empty[2] = "7"; empty[20] = "4"; empty[38] = "7"; empty[56] = "9"; return { cells: empty, focus: [2], conflicts: [2, 38] }; } empty[0] = "2"; empty[1] = "8"; empty[10] = "2"; empty[20] = "6"; return { cells: empty, block: 0, conflicts: [0, 10] }; }
function renderHelpExample(example) { if (example === "controls") { return `<div class="help-controls-visual"><div class="help-chip-row"><span class="help-chip">1 2 3 4 5 6 7 8 9</span></div><div class="help-chip-row"><span class="help-chip">Undo</span><span class="help-chip">Erase</span><span class="help-chip active">Note</span><span class="help-chip">Hint</span></div><div class="help-keyboard">Keyboard: 1-9 / Delete / Backspace</div></div>`; } const board = getHelpExampleBoard(example); const cells = board.cells.map((value, index) => { const row = Math.floor(index / 9); const col = index % 9; const classes = ["help-mini-cell"]; if ((col + 1) % 3 === 0 && col !== 8) { classes.push("block-right"); } if ((row + 1) % 3 === 0 && row !== 8) { classes.push("block-bottom"); } if (board.focus?.includes(row) || board.focus?.includes(col)) { classes.push("focus"); } if (typeof board.block === "number" && Math.floor(row / 3) * 3 + Math.floor(col / 3) === board.block) { classes.push("focus"); } if (board.conflicts.includes(index)) { classes.push("conflict"); } if (value) { classes.push("filled"); } return `<div class="${classes.join(" ")}">${value}</div>`; }).join(""); return `<div class="help-example-board">${cells}</div>`; }
function refreshHelpViews() { if (!elements.helpOverlay.classList.contains("hidden")) { renderHelpContent(elements.helpModalBody); document.getElementById("helpModalTitle").textContent = t("helpTitle"); } if (state.currentScreen === "game" && state.gameHelpOpen) { renderGameHelpPanel(); } }
function changeHelpPage(offset) { const pages = getHelpPages(); state.helpPage = Math.max(0, Math.min(pages.length - 1, state.helpPage + offset)); refreshHelpViews(); }
function openConfirm(type) { state.confirmAction = type; renderConfirmModal(); showOverlay(elements.confirmOverlay); }
function closeConfirm() { state.confirmAction = null; hideOverlay(elements.confirmOverlay); }
function showCompletionOverlay() { renderCompleteModal(); showOverlay(elements.completeOverlay); }
function closeCompletionOverlay() { hideOverlay(elements.completeOverlay); }
function renderHeroPreview() {
  elements.heroPreviewBoard.innerHTML = "";
  PREVIEW_BOARD.forEach((row, rowIndex) => row.forEach((value, colIndex) => { const cell = document.createElement("div"); cell.className = "preview-cell"; if ((colIndex + 1) % 3 === 0 && colIndex !== 8) { cell.classList.add("block-right"); } if ((rowIndex + 1) % 3 === 0 && rowIndex !== 8) { cell.classList.add("block-bottom"); } if (value === 0) { cell.classList.add("soft"); cell.textContent = rowIndex % 2 === 0 ? "." : ""; } else { cell.textContent = String(value); } elements.heroPreviewBoard.appendChild(cell); }));
}
function renderHelpContent(target) {
  const pages = getHelpPages();
  const page = pages[state.helpPage];
  const listHtml = page.list ? `<ul>${page.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : `<p>${page.body}</p>`;
  target.innerHTML = `<div class="help-carousel"><div class="help-page-meta">${state.helpPage + 1} / ${pages.length}</div><section><p>${t("helpIntro")}</p><h3>${page.title}</h3><div class="help-subtitle">${page.subtitle}</div>${listHtml}</section><section>${renderHelpExample(page.example)}</section><div class="help-nav"><button type="button" class="secondary-btn help-nav-btn" data-help-nav="prev" ${state.helpPage === 0 ? "disabled" : ""}>${t("helpPrev")}</button><button type="button" class="primary-btn help-nav-btn" data-help-nav="next">${state.helpPage === pages.length - 1 ? t("helpDone") : t("helpNext")}</button></div></div>`;
  const prevButton = target.querySelector('[data-help-nav="prev"]');
  const nextButton = target.querySelector('[data-help-nav="next"]');
  if (prevButton) { prevButton.addEventListener("click", () => changeHelpPage(-1)); }
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (state.helpPage === pages.length - 1) {
        if (target === elements.helpModalBody) {
          closeHelpModal();
        } else {
          state.gameHelpOpen = false;
          renderGameHelpPanel();
        }
        return;
      }
      changeHelpPage(1);
    });
  }
}
function renderHomeScreen() {
  document.documentElement.lang = state.language; document.getElementById("homeEyebrow").textContent = t("homeEyebrow"); document.getElementById("homeTitle").textContent = t("homeTitle"); document.getElementById("homeCopy").textContent = t("homeCopy"); document.getElementById("homeHelpBtn").textContent = t("homeHelp"); document.getElementById("dailyEntryBtn").textContent = t("dailyEntry"); document.getElementById("startEntryBtn").textContent = t("startEntry");
}
function renderWeekdays() { elements.weekdayRow.innerHTML = ""; for (let index = 0; index < 7; index += 1) { const span = document.createElement("span"); span.textContent = t(`weekday${index}`); elements.weekdayRow.appendChild(span); } }
function isFutureDate(month, day) { if (month > TODAY.month) { return true; } if (month < TODAY.month) { return false; } return day > TODAY.day; }
function normalizeSelectedDate() { if (state.dailySelectedMonth > TODAY.month) { state.dailySelectedMonth = TODAY.month; state.dailySelectedDay = TODAY.day; } const maxDay = state.dailySelectedMonth === TODAY.month ? TODAY.day : daysInMonth(TODAY.year, state.dailySelectedMonth); if (state.dailySelectedDay > maxDay) { state.dailySelectedDay = maxDay; } }
function renderMonthTabs() {
  elements.monthTabs.innerHTML = "";
  for (let month = START_MONTH; month <= TODAY.month; month += 1) { const button = document.createElement("button"); button.type = "button"; button.className = "month-tab"; button.textContent = t("monthTab", { month }); if (month === state.dailySelectedMonth) { button.classList.add("active"); } button.addEventListener("click", () => { state.dailySelectedMonth = month; normalizeSelectedDate(); renderDailyScreen(); }); elements.monthTabs.appendChild(button); }
}
function renderCalendar() {
  elements.calendarGrid.innerHTML = ""; const firstWeekday = new Date(TODAY.year, state.dailySelectedMonth - 1, 1).getDay(); const monthDays = daysInMonth(TODAY.year, state.dailySelectedMonth);
  for (let index = 0; index < firstWeekday; index += 1) { const empty = document.createElement("div"); empty.className = "calendar-empty"; elements.calendarGrid.appendChild(empty); }
  for (let day = 1; day <= monthDays; day += 1) { const button = document.createElement("button"); button.type = "button"; button.textContent = String(day); const isToday = state.dailySelectedMonth === TODAY.month && day === TODAY.day; const isSelected = day === state.dailySelectedDay; const completed = state.completedDates.has(getDailyDateKey(state.dailySelectedMonth, day)); if (isToday) { button.classList.add("today"); } if (isSelected) { button.classList.add("selected"); } if (completed) { button.classList.add("done"); } if (isFutureDate(state.dailySelectedMonth, day)) { button.disabled = true; } else { button.addEventListener("click", () => { state.dailySelectedDay = day; renderDailyScreen(); }); } elements.calendarGrid.appendChild(button); }
}
function renderDailyScreen() {
  document.getElementById("dailyBackBtn").textContent = t("back"); document.getElementById("dailyEyebrow").textContent = t("dailyEyebrow"); elements.dailyTitle.textContent = t("dailyMonthTitle", { year: TODAY.year, month: state.dailySelectedMonth, monthName: monthName(state.dailySelectedMonth) }); document.getElementById("dailyCopy").textContent = t("dailyCopy"); document.getElementById("dailyStartBtn").textContent = t("dailyStart"); renderWeekdays(); renderMonthTabs(); renderCalendar(); const selectionKey = state.dailySelectedMonth === TODAY.month && state.dailySelectedDay === TODAY.day ? "dailySelectionToday" : "dailySelectionRandom"; elements.dailySelectionText.textContent = t(selectionKey, { month: state.dailySelectedMonth, day: state.dailySelectedDay, monthName: monthName(state.dailySelectedMonth) });
}
function renderDifficultyScreen() {
  document.getElementById("difficultyBackBtn").textContent = t("back"); document.getElementById("difficultyEyebrow").textContent = t("difficultyEyebrow"); document.getElementById("difficultyTitle").textContent = t("difficultyTitle"); document.getElementById("difficultyEasyLabel").textContent = t("easyLabel"); document.getElementById("difficultyEasyCopy").textContent = t("easyCopy"); document.getElementById("difficultyMediumLabel").textContent = t("mediumLabel"); document.getElementById("difficultyMediumCopy").textContent = t("mediumCopy"); document.getElementById("difficultyHardLabel").textContent = t("hardLabel"); document.getElementById("difficultyHardCopy").textContent = t("hardCopy");
}
function getGameBadgeText(game) { return t(game.badgeKey); }
function getDifficultyWord(difficulty) { if (difficulty === "easy") { return t("difficultyWordEasy"); } if (difficulty === "medium") { return t("difficultyWordMedium"); } return t("difficultyWordHard"); }
function getGameTitleText(game) { if (game.titleMode === "daily") { return t("gameTitleDaily", { month: game.dailyMonth, day: game.dailyDay, monthName: monthName(game.dailyMonth) }); } return t("gameTitleDifficulty", { label: getDifficultyWord(game.difficulty) }); }
function renderBoard() {
  const game = state.game; elements.board.innerHTML = "";
  game.cells.forEach((row) => row.forEach((cell) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "cell"; button.setAttribute("aria-label", `${cell.row + 1},${cell.col + 1}`);
    if ((cell.col + 1) % 3 === 0 && cell.col !== 8) { button.classList.add("block-right"); }
    if ((cell.row + 1) % 3 === 0 && cell.row !== 8) { button.classList.add("block-bottom"); }
    if (cell.fixed) { button.classList.add("fixed"); }
    if (game.selected && game.selected.row === cell.row && game.selected.col === cell.col) { button.classList.add("selected"); } else if (isRelated(cell.row, cell.col, game.selected)) { button.classList.add("related"); }
    if (game.highlightNumber && cell.value === game.highlightNumber) { button.classList.add("same-number"); }
    if (game.blinkCells.has(`${cell.row}-${cell.col}`)) { button.classList.add("conflict-blink"); }
    if (isWrongCell(game, cell)) { button.classList.add("wrong"); }
    if (cell.value !== 0) { const value = document.createElement("span"); value.className = "cell-value"; value.textContent = String(cell.value); button.appendChild(value); }
    else { const notesGrid = document.createElement("div"); notesGrid.className = "notes-grid"; for (let number = 1; number <= 9; number += 1) { const noteItem = document.createElement("div"); noteItem.className = "note-item"; noteItem.textContent = cell.notes.includes(number) ? String(number) : ""; notesGrid.appendChild(noteItem); } button.appendChild(notesGrid); }
    button.addEventListener("click", () => selectCell(cell.row, cell.col)); elements.board.appendChild(button);
  }));
}
function renderNumberPad() {
  const game = state.game; elements.numberPad.innerHTML = ""; elements.numberPad.classList.toggle("note-active", game.noteMode);
  for (let number = 1; number <= 9; number += 1) { const button = document.createElement("button"); const value = document.createElement("span"); const count = document.createElement("span"); button.type = "button"; button.className = "number-pad-btn"; value.className = "number-pad-value"; count.className = "number-pad-count"; value.textContent = String(number); count.textContent = String(getPlacedCount(game, number)); button.disabled = isNumberCompleteAcrossBlocks(game, number); button.appendChild(value); button.appendChild(count); button.addEventListener("click", () => handleNumberInput(number)); elements.numberPad.appendChild(button); }
}
function renderGameMeta() {
  const game = state.game; if (!game) { return; } elements.gameBadge.textContent = getGameBadgeText(game); elements.gameTitle.textContent = getGameTitleText(game); elements.mistakeMeta.textContent = t("mistakesLabel", { count: Math.min(game.mistakes, MAX_MISTAKES) }); elements.timerMeta.textContent = t("elapsedLabel", { time: formatSeconds(game.elapsedSeconds) }); elements.hintMeta.textContent = t("hintRemaining", { count: game.hintsRemaining }); elements.hintBtnLabel.textContent = t("hint"); elements.hintCount.textContent = String(game.hintsRemaining); document.getElementById("undoBtn").textContent = t("undo"); document.getElementById("eraseBtn").textContent = t("erase"); document.getElementById("noteBtn").textContent = t("note"); document.getElementById("noteBtn").classList.toggle("active", game.noteMode); document.getElementById("undoBtn").disabled = game.history.length === 0; document.getElementById("hintBtn").disabled = game.hintsRemaining === 0;
}
function renderGameHelpPanel() { const isVisible = state.currentScreen === "game" && state.gameHelpOpen; elements.gameLayout.classList.toggle("help-open", isVisible); elements.gameHelpPanel.classList.toggle("hidden", !isVisible); if (isVisible) { elements.gameHelpPanelTitle.textContent = t("helpTitle"); renderHelpContent(elements.gameHelpPanelBody); } }
function renderGame() { if (!state.game) { return; } renderGameMeta(); renderBoard(); renderNumberPad(); renderGameHelpPanel(); }
function renderSettingsModal() {
  const isGame = state.settingsContext === "game"; document.getElementById("settingsTitle").textContent = isGame ? t("settingsGameTitle") : t("settingsHomeTitle"); document.getElementById("settingsCopy").textContent = isGame ? t("settingsGameCopy") : t("settingsHomeCopy"); document.getElementById("settingsLanguageTitle").textContent = t("settingsLanguage"); document.getElementById("settingsHomeBtn").textContent = t("settingsHomeAction"); document.getElementById("settingsHomeWrap").classList.toggle("hidden", !isGame); document.querySelectorAll(".language-btn").forEach((button) => button.classList.toggle("active", button.dataset.lang === state.language));
}
function renderConfirmModal() {
  const isRestart = state.confirmAction === "restartDaily"; document.getElementById("confirmTitle").textContent = isRestart ? t("restartModalTitle") : t("hintModalTitle"); document.getElementById("confirmCopy").textContent = isRestart ? t("restartModalCopy") : t("hintModalCopy"); document.getElementById("confirmCancelBtn").textContent = t("no"); document.getElementById("confirmConfirmBtn").textContent = t("yes");
}
function renderCompleteModal() { document.getElementById("completeTitle").textContent = t("completeTitle"); document.getElementById("completeCopy").textContent = t("completeCopy"); document.getElementById("completeHomeBtn").textContent = t("completeHome"); }
function renderFailModal() { document.getElementById("failTitle").textContent = t("failTitle"); document.getElementById("failCopy").textContent = t("failCopy"); document.getElementById("failRetryBtn").textContent = t("failRetry"); document.getElementById("failBackBtn").textContent = t("failBack"); }
function renderAllStatic() { renderHomeScreen(); renderDailyScreen(); renderDifficultyScreen(); renderSettingsModal(); renderConfirmModal(); renderCompleteModal(); renderFailModal(); renderHelpContent(elements.helpModalBody); document.getElementById("helpModalTitle").textContent = t("helpTitle"); if (state.game) { renderGame(); } }
function syncTimer(game) { game.elapsedSeconds = Math.floor((Date.now() - game.startedAt) / 1000); }
function stopTimer(game) { if (game?.timerId) { window.clearInterval(game.timerId); game.timerId = null; } }
function startTimer(game) { stopTimer(game); game.startedAt = Date.now() - game.elapsedSeconds * 1000; game.timerId = window.setInterval(() => { syncTimer(game); if (state.game === game && state.currentScreen === "game") { renderGameMeta(); } }, 1000); }
function stopCurrentGameTimer() { if (state.game) { syncTimer(state.game); stopTimer(state.game); } }
function startGame(options) { stopCurrentGameTimer(); state.game = buildSession(options); state.gameHelpOpen = false; openScreen("game"); startTimer(state.game); renderGame(); closeCompletionOverlay(); closeConfirm(); closeFailOverlay(); }
function restartCurrentGame() { const game = state.game; if (!game) { return; } startGame({ mode: game.mode, titleMode: game.titleMode, dailyMonth: game.dailyMonth, dailyDay: game.dailyDay, difficulty: game.difficulty, badgeKey: game.badgeKey, seed: game.seed, removals: game.removals }); }
function startDailySession() {
  const isToday = state.dailySelectedMonth === TODAY.month && state.dailySelectedDay === TODAY.day; const dateSeed = Number(`${TODAY.year}${String(state.dailySelectedMonth).padStart(2, "0")}${String(state.dailySelectedDay).padStart(2, "0")}`); const seed = isToday ? dateSeed : Math.floor(Math.random() * 1000000) + dateSeed + Date.now();
  startGame({ mode: "daily", titleMode: "daily", dailyMonth: state.dailySelectedMonth, dailyDay: state.dailySelectedDay, badgeKey: isToday ? "badgeDaily" : "badgeRandom", seed, removals: DIFFICULTY_CONFIG.daily.removals });
}
function startDailyChallenge() { if (state.completedDates.has(getDailyDateKey(state.dailySelectedMonth, state.dailySelectedDay))) { openConfirm("restartDaily"); return; } startDailySession(); }
function startClassicMode(difficulty) { const seed = Math.floor(Math.random() * 1000000) + Date.now(); const badgeKey = difficulty === "easy" ? "badgeEasy" : difficulty === "medium" ? "badgeMedium" : "badgeHard"; startGame({ mode: difficulty, titleMode: "difficulty", difficulty, badgeKey, seed, removals: DIFFICULTY_CONFIG[difficulty].removals }); }
function selectCell(row, col) { const game = state.game; if (!game) { return; } game.selected = { row, col }; game.blinkCells = new Set(); game.blinkToken = null; updateHighlight(game); renderGame(); }
function finishIfComplete(game) { if (game.completed || !isComplete(game)) { return false; } game.completed = true; syncTimer(game); stopTimer(game); if (game.titleMode === "daily") { markDailyCompleted(game.dailyMonth, game.dailyDay); renderDailyScreen(); } renderGame(); showCompletionOverlay(); return true; }
function toggleValue(game, cell, number) {
  if (cell.value === number) { cell.value = 0; cell.notes = []; return { blink: [], wrongEntry: false }; }
  const conflicts = getConflicts(game, cell.row, cell.col, number); if (conflicts.length > 0) { return { blocked: true, blink: conflicts, wrongEntry: false }; }
  cell.value = number; cell.notes = []; const isWrong = number !== game.solution[cell.row][cell.col]; if (!isWrong) { clearRelatedNotes(game, cell.row, cell.col, number); } return { blink: [], wrongEntry: isWrong };
}
function toggleNote(game, cell, number) {
  const conflicts = getConflicts(game, cell.row, cell.col, number); if (conflicts.length > 0) { return { blocked: true, blink: conflicts }; }
  if (cell.value === number) { cell.value = 0; return { blink: [] }; }
  if (cell.value !== 0) { cell.value = 0; }
  if (cell.notes.includes(number)) { cell.notes = cell.notes.filter((item) => item !== number); return { blink: [] }; }
  cell.notes = [...cell.notes, number].sort((a, b) => a - b); return { blink: [] };
}
function handleNumberInput(number) {
  const game = state.game; if (!game || !game.selected) { return; } const cell = getSelectedCell(game); if (!cell || cell.fixed) { const fixedConflicts = cell ? getConflicts(game, cell.row, cell.col, cell.value) : []; triggerConflictBlink(game, fixedConflicts); return; }
  saveHistory(game); const result = game.noteMode ? toggleNote(game, cell, number) : toggleValue(game, cell, number);
  if (result.blocked) { game.history.pop(); triggerConflictBlink(game, result.blink); return; }
  if (!game.noteMode && result.wrongEntry) {
    game.mistakes += 1;
    if (game.mistakes >= MAX_MISTAKES) {
      stopTimer(game);
      renderGame();
      openFailOverlay();
      return;
    }
  }
  updateHighlight(game); triggerConflictBlink(game, result.blink); if (!finishIfComplete(game)) { renderGame(); }
}
function eraseSelectedCell() {
  const game = state.game; if (!game || !game.selected) { return; } const cell = getSelectedCell(game); if (!cell || cell.fixed || (cell.value === 0 && cell.notes.length === 0)) { return; }
  saveHistory(game); cell.value = 0; cell.notes = []; updateHighlight(game); renderGame();
}
function toggleNoteMode() { const game = state.game; if (!game) { return; } game.noteMode = !game.noteMode; renderGame(); }
function requestHint() { const game = state.game; if (!game || !game.selected || game.hintsRemaining === 0) { return; } openConfirm("hint"); }
function useHint() {
  const game = state.game; if (!game || !game.selected || game.hintsRemaining === 0) { return; } const cell = getSelectedCell(game); if (!cell || cell.fixed) { return; }
  const correctValue = game.solution[cell.row][cell.col]; if (cell.value === correctValue) { return; }
  saveHistory(game); cell.value = correctValue; cell.notes = []; game.hintsRemaining -= 1; clearRelatedNotes(game, cell.row, cell.col, correctValue); updateHighlight(game); if (!finishIfComplete(game)) { renderGame(); }
}
function undo() { const game = state.game; if (!game) { return; } const snapshot = game.history.pop(); if (!snapshot) { return; } restoreSnapshot(game, snapshot); closeCompletionOverlay(); if (game.completed) { stopTimer(game); } else { startTimer(game); } renderGame(); }
function goHome() { stopCurrentGameTimer(); closeSettings(); closeConfirm(); closeHelpModal(); closeCompletionOverlay(); closeFailOverlay(); state.gameHelpOpen = false; openScreen("home"); }
function changeLanguage(language) { state.language = language; renderAllStatic(); }
function toggleGameHelpPanel() { if (state.currentScreen !== "game") { return; } state.gameHelpOpen = !state.gameHelpOpen; if (state.gameHelpOpen) { state.helpPage = 0; } renderGameHelpPanel(); }
function getHelpPages() {
  return [
    { title: t("helpRulesTitle"), subtitle: t("helpStepRulesRow"), body: t("helpRule1"), example: "row" },
    { title: t("helpRulesTitle"), subtitle: t("helpStepRulesColumn"), body: t("helpRule2"), example: "column" },
    { title: t("helpRulesTitle"), subtitle: t("helpStepRulesBlock"), body: t("helpRule3"), example: "block" },
    { title: t("helpControlsTitle"), subtitle: t("helpStepControls"), list: [t("helpControl1"), t("helpControl2"), t("helpControl3"), t("helpControl4"), t("helpControl5")], example: "controls" }
  ];
}
function getHelpExampleBoard(type) {
  const cells = Array.from({ length: 81 }, () => "");
  if (type === "row") {
    cells[9] = "5";
    cells[11] = "3";
    cells[13] = "5";
    cells[15] = "8";
    return { cells, rowFocus: 1, conflicts: [9, 13] };
  }
  if (type === "column") {
    cells[2] = "7";
    cells[20] = "4";
    cells[38] = "7";
    cells[56] = "9";
    return { cells, colFocus: 2, conflicts: [2, 38] };
  }
  cells[0] = "2";
  cells[1] = "8";
  cells[10] = "2";
  cells[20] = "6";
  return { cells, blockFocus: 0, conflicts: [0, 10] };
}
function renderHelpExample(example) {
  if (example === "controls") {
    return `<div class="help-controls-visual"><div class="help-chip-row"><span class="help-chip">1 2 3 4 5 6 7 8 9</span></div><div class="help-chip-row"><span class="help-chip">${t("undo")}</span><span class="help-chip">${t("erase")}</span><span class="help-chip active">${t("note")}</span><span class="help-chip">${t("hint")}</span></div><div class="help-keyboard">Keyboard: 1-9 / Delete / Backspace</div></div>`;
  }
  const board = getHelpExampleBoard(example);
  const cells = board.cells.map((value, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const blockIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    const classes = ["help-mini-cell"];
    if ((col + 1) % 3 === 0 && col !== 8) { classes.push("block-right"); }
    if ((row + 1) % 3 === 0 && row !== 8) { classes.push("block-bottom"); }
    if (board.rowFocus === row || board.colFocus === col || board.blockFocus === blockIndex) { classes.push("focus"); }
    if (board.conflicts.includes(index)) { classes.push("conflict"); }
    if (value) { classes.push("filled"); }
    return `<div class="${classes.join(" ")}">${value}</div>`;
  }).join("");
  return `<div class="help-example-board">${cells}</div>`;
}
function refreshHelpViews() {
  if (!elements.helpOverlay.classList.contains("hidden")) {
    renderHelpContent(elements.helpModalBody);
    document.getElementById("helpModalTitle").textContent = t("helpTitle");
  }
  if (state.currentScreen === "game" && state.gameHelpOpen) {
    renderGameHelpPanel();
  }
}
function changeHelpPage(offset) {
  const pages = getHelpPages();
  state.helpPage = Math.max(0, Math.min(pages.length - 1, state.helpPage + offset));
  refreshHelpViews();
}
function renderHelpContent(target) {
  const pages = getHelpPages();
  const page = pages[state.helpPage];
  const listHtml = page.list ? `<ul>${page.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : `<p>${page.body}</p>`;
  target.innerHTML = `<div class="help-carousel"><div class="help-page-meta">${state.helpPage + 1} / ${pages.length}</div><section><p>${t("helpIntro")}</p><h3>${page.title}</h3><div class="help-subtitle">${page.subtitle}</div>${listHtml}</section><section>${renderHelpExample(page.example)}</section><div class="help-nav"><button type="button" class="secondary-btn help-nav-btn" data-help-nav="prev" ${state.helpPage === 0 ? "disabled" : ""}>${t("helpPrev")}</button><button type="button" class="primary-btn help-nav-btn" data-help-nav="next">${state.helpPage === pages.length - 1 ? t("helpDone") : t("helpNext")}</button></div></div>`;
  const prevButton = target.querySelector('[data-help-nav="prev"]');
  const nextButton = target.querySelector('[data-help-nav="next"]');
  if (prevButton) { prevButton.addEventListener("click", () => changeHelpPage(-1)); }
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (state.helpPage === pages.length - 1) {
        if (target === elements.helpModalBody) {
          closeHelpModal();
        } else {
          state.gameHelpOpen = false;
          renderGameHelpPanel();
        }
        return;
      }
      changeHelpPage(1);
    });
  }
}
function confirmYes() { const action = state.confirmAction; closeConfirm(); if (action === "restartDaily") { startDailySession(); return; } if (action === "hint") { useHint(); } }
function handleFailRetry() { closeFailOverlay(); restartCurrentGame(); }
function handleFailBack() { closeFailOverlay(); if (window.history.length > 1) { window.history.back(); return; } goHome(); }
function isOverlayOpen() { return !elements.settingsOverlay.classList.contains("hidden") || !elements.confirmOverlay.classList.contains("hidden") || !elements.helpOverlay.classList.contains("hidden") || !elements.completeOverlay.classList.contains("hidden") || !elements.failOverlay.classList.contains("hidden"); }
function handleKeydown(event) {
  if (event.key === "Escape") { if (!elements.helpOverlay.classList.contains("hidden")) { closeHelpModal(); return; } if (!elements.settingsOverlay.classList.contains("hidden")) { closeSettings(); return; } if (!elements.confirmOverlay.classList.contains("hidden")) { closeConfirm(); return; } if (state.gameHelpOpen) { state.gameHelpOpen = false; renderGameHelpPanel(); } return; }
  if (state.currentScreen !== "game" || !state.game || isOverlayOpen()) { return; }
  if (/^[1-9]$/.test(event.key)) { event.preventDefault(); handleNumberInput(Number(event.key)); return; }
  if (/^Numpad[1-9]$/.test(event.code)) { event.preventDefault(); handleNumberInput(Number(event.code.replace("Numpad", ""))); return; }
  if (event.key === "Delete" || event.key === "Backspace") { event.preventDefault(); eraseSelectedCell(); }
}
function bindOverlayClose(overlay, closeFn) { overlay.addEventListener("click", (event) => { if (event.target === overlay) { closeFn(); } }); }
function initializeEvents() {
  document.getElementById("dailyEntryBtn").addEventListener("click", () => { state.dailySelectedMonth = TODAY.month; state.dailySelectedDay = TODAY.day; renderDailyScreen(); openScreen("daily"); });
  document.getElementById("startEntryBtn").addEventListener("click", () => openScreen("difficulty"));
  document.getElementById("homeHelpBtn").addEventListener("click", openHelpModal);
  document.getElementById("dailyBackBtn").addEventListener("click", goHome);
  document.getElementById("difficultyBackBtn").addEventListener("click", goHome);
  document.getElementById("homeSettingsBtn").addEventListener("click", () => openSettings("home"));
  document.getElementById("gameSettingsBtn").addEventListener("click", () => openSettings("game"));
  document.getElementById("gameHelpBtn").addEventListener("click", toggleGameHelpPanel);
  document.getElementById("gameHelpCloseBtn").addEventListener("click", () => { state.gameHelpOpen = false; renderGameHelpPanel(); });
  document.getElementById("settingsCloseBtn").addEventListener("click", closeSettings);
  document.getElementById("settingsHomeBtn").addEventListener("click", goHome);
  document.getElementById("helpCloseBtn").addEventListener("click", closeHelpModal);
  document.getElementById("completeHomeBtn").addEventListener("click", goHome);
  document.getElementById("failRetryBtn").addEventListener("click", handleFailRetry);
  document.getElementById("failBackBtn").addEventListener("click", handleFailBack);
  document.getElementById("dailyStartBtn").addEventListener("click", startDailyChallenge);
  document.getElementById("hintBtn").addEventListener("click", requestHint);
  document.getElementById("confirmCancelBtn").addEventListener("click", closeConfirm);
  document.getElementById("confirmConfirmBtn").addEventListener("click", confirmYes);
  document.getElementById("undoBtn").addEventListener("click", undo);
  document.getElementById("eraseBtn").addEventListener("click", eraseSelectedCell);
  document.getElementById("noteBtn").addEventListener("click", toggleNoteMode);
  document.querySelectorAll(".difficulty-btn").forEach((button) => button.addEventListener("click", () => startClassicMode(button.dataset.difficulty)));
  LANGUAGES.forEach((language) => document.querySelector(`.language-btn[data-lang="${language}"]`).addEventListener("click", () => changeLanguage(language)));
  bindOverlayClose(elements.helpOverlay, closeHelpModal); bindOverlayClose(elements.settingsOverlay, closeSettings); bindOverlayClose(elements.confirmOverlay, closeConfirm); document.addEventListener("keydown", handleKeydown);
}
renderHeroPreview(); normalizeSelectedDate(); renderAllStatic(); openScreen("home"); closeCompletionOverlay(); closeSettings(); closeConfirm(); closeHelpModal(); closeFailOverlay(); initializeEvents();








