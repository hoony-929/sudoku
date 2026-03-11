const test = require('node:test');
const assert = require('node:assert');
const { daysInMonth, formatSeconds } = require('../utils.js');

test('daysInMonth - standard 31-day months', () => {
    assert.strictEqual(daysInMonth(2026, 1), 31); // Jan
    assert.strictEqual(daysInMonth(2026, 3), 31); // Mar
    assert.strictEqual(daysInMonth(2026, 5), 31); // May
    assert.strictEqual(daysInMonth(2026, 7), 31); // Jul
    assert.strictEqual(daysInMonth(2026, 8), 31); // Aug
    assert.strictEqual(daysInMonth(2026, 10), 31); // Oct
    assert.strictEqual(daysInMonth(2026, 12), 31); // Dec
});

test('daysInMonth - standard 30-day months', () => {
    assert.strictEqual(daysInMonth(2026, 4), 30); // Apr
    assert.strictEqual(daysInMonth(2026, 6), 30); // Jun
    assert.strictEqual(daysInMonth(2026, 9), 30); // Sep
    assert.strictEqual(daysInMonth(2026, 11), 30); // Nov
});

test('daysInMonth - February in non-leap year', () => {
    assert.strictEqual(daysInMonth(2023, 2), 28);
    assert.strictEqual(daysInMonth(2025, 2), 28);
    assert.strictEqual(daysInMonth(2026, 2), 28);
});

test('daysInMonth - February in leap year', () => {
    assert.strictEqual(daysInMonth(2024, 2), 29);
    assert.strictEqual(daysInMonth(2028, 2), 29);
});

test('daysInMonth - February in century years', () => {
    assert.strictEqual(daysInMonth(1900, 2), 28); // Not a leap year
    assert.strictEqual(daysInMonth(2000, 2), 29); // Is a leap year
    assert.strictEqual(daysInMonth(2100, 2), 28); // Not a leap year
});

test('formatSeconds - formatting', () => {
    assert.strictEqual(formatSeconds(0), '00:00');
    assert.strictEqual(formatSeconds(59), '00:59');
    assert.strictEqual(formatSeconds(60), '01:00');
    assert.strictEqual(formatSeconds(3599), '59:59');
    assert.strictEqual(formatSeconds(3600), '60:00'); // Should follow mm:ss format as per current logic
});
