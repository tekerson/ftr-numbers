import { vi, expect, test, beforeEach, afterEach } from 'vitest';

import { Timer } from './timer';

beforeEach(() => {
	vi.useFakeTimers();
});

afterEach(() => {
	vi.useRealTimers();
});

test('Timer should call callback after provided interval', () => {
	const callback = vi.fn();

	const timer = new Timer(callback);

	timer.start(15000);
	expect(callback).not.toHaveBeenCalled();
	vi.advanceTimersByTime(15000);
	expect(callback).toHaveBeenCalled();
});

test('Timer should repeat callback after provided interval', () => {
	const callback = vi.fn();

	const timer = new Timer(callback);

	timer.start(15000);
	expect(callback).not.toHaveBeenCalled();
	vi.advanceTimersByTime(15000);
	expect(callback).toHaveBeenCalled();

	callback.mockClear();
	expect(callback).not.toHaveBeenCalled();

	vi.advanceTimersByTime(15000);
	expect(callback).toHaveBeenCalled();
});

test('Timer should NOT call callback if paused', () => {
	const callback = vi.fn();

	const timer = new Timer(callback);

	timer.start(15000);
	timer.pause();
	vi.advanceTimersByTime(15000);
	expect(callback).not.toHaveBeenCalled();
});

test('Timer should call callback if resumed', () => {
	const callback = vi.fn();

	const timer = new Timer(callback);

	timer.start(15000);
	vi.advanceTimersByTime(10000);

	timer.pause();
	vi.advanceTimersByTime(10000);

	timer.start();
	expect(callback).not.toHaveBeenCalled();
	vi.advanceTimersByTime(5000);
	expect(callback).toHaveBeenCalled();
});

test('Timer should call callback if resumed multiple times', () => {
	const callback = vi.fn();

	const timer = new Timer(callback);

	timer.start(15000);
	vi.advanceTimersByTime(1000);
	timer.pause();
	vi.advanceTimersByTime(1000);

	timer.start();
	vi.advanceTimersByTime(1000);
	timer.pause();
	vi.advanceTimersByTime(1000);

	timer.start();
	vi.advanceTimersByTime(11000);
	expect(callback).not.toHaveBeenCalled();
	vi.advanceTimersByTime(1000);
	expect(callback).toHaveBeenCalled();
});

