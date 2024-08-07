import { fibs } from "./fib";
import { Milliseconds, Timer } from "./timer";

export type NumbersAppEvents = 
	| { type: 'input', value: number }
	| { type: 'special', value: number }
	| { type: 'frequencies', frequencies: Array<[number, number]> }
	| { type: 'start', interval: Milliseconds }
	| { type: 'pause' }
	| { type: 'resume' }

export class NumbersApp {
	private timer: Timer;

	private readonly frequencies: Map<number, number> = new Map();
	private readonly specials: Set<number> = new Set(fibs(1000));

	private readonly subscribers: Set<(event: NumbersAppEvents) => void> = new Set();

	constructor() {
		this.timer = new Timer(() => {
			const frequencies = Array.from(this.frequencies.entries()).sort(([a, aFreq], [b, bFreq]) =>
				// Order by Frequency Decending, Value Ascending
				Math.sign(bFreq - aFreq) || Math.sign(a - b)
			);
			this.emit({ type: 'frequencies', frequencies })
		});
	}

	subscribe(subscriber: (event: NumbersAppEvents) => void): () => void {
		this.subscribers.add(subscriber);
		return () => this.subscribers.delete(subscriber);
	}

	input(n: number): void {
		this.frequencies.set(n, (this.frequencies.get(n) ?? 0) + 1);
		this.emit({ type: 'input', value: n });
		if (this.isSpecial(n)) {
			this.emit({ type: 'special', value: n });
		}
	}

	startLogging(logInterval: Milliseconds): void {
		this.timer.start(logInterval);
		this.emit({ type: 'start', interval: logInterval });
	}

	haltLogging(): void {
		this.timer.pause();
		this.emit({ type: 'pause' });
	}

	resumeLogging(): void {
		this.timer.start();
		this.emit({ type: 'resume' });
	}

	isPaused(): boolean {
		return !this.timer.isRunning();
	}

	private isSpecial(n: number): boolean {
		return this.specials.has(n);
	}

	private emit(event: NumbersAppEvents) {
		this.subscribers.forEach(sub => sub(event));
	}
}
