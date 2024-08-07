import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { NumbersApp } from './app';

beforeEach(() => {
	vi.useFakeTimers();
});

afterEach(() => {
	vi.useRealTimers();
});

test('NumbersApp should generate correct log', () => {
	const app = new NumbersApp();

	const subscriber = vi.fn();
	app.subscribe(subscriber);

	app.startLogging(15000);

	app.input(10);
	app.input(10);
	expect(subscriber).lastCalledWith({ type: 'input', value: 10 });
	app.input(8);
	expect(subscriber).lastCalledWith({ type: 'special', value: 8 });

	vi.advanceTimersByTime(15000);
	expect(subscriber).lastCalledWith({ type: 'frequencies', frequencies: [[10, 2], [8, 1]] });
});

test('NumbersApp should log sorted by frequency', () => {
	const app = new NumbersApp();

	const subscriber = vi.fn();
	app.subscribe(subscriber);

	app.startLogging(15000);

	app.input(10);
	app.input(10);
	app.input(9);
	app.input(9);
	app.input(9);

	vi.advanceTimersByTime(15000);
	expect(subscriber).lastCalledWith({ type: 'frequencies', frequencies: [[9, 3], [10, 2]] });
});
