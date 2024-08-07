export type Milliseconds = number;

type TimerState = 'stopped' | 'running' | 'paused';

export class Timer {
	private state: TimerState;
	private interval: Milliseconds = 1000;

	private remaining: Milliseconds | undefined;
	private timeout: number | undefined;
	private startedAt: Milliseconds | undefined;

	constructor(private callback: () => void) {
		this.state = 'stopped';
	}

	start(interval?: Milliseconds): void {
		this.interval = interval ?? this.interval;
		switch (this.state) {
			case 'stopped': return this.startFromStopped();
			case 'paused': return this.startFromPaused();
		}
	}

	pause(): void {
		switch (this.state) {
			case 'running': return this.pauseFromRunning();
		}
	}

	isRunning(): boolean {
		return this.state === 'running';
	}

	private tick(): void {
		this.callback();

		this.startedAt = Date.now();
		this.timeout = setTimeout(() => this.tick(), this.interval);
	}

	private startFromStopped() {
		this.startedAt = Date.now();
		this.timeout = setTimeout(() => this.tick(), this.interval);
		this.state = 'running';
	}

	private startFromPaused() {
		this.timeout = setTimeout(() => this.tick(), this.remaining!);
		this.state = 'running';
	}

	private pauseFromRunning() {
		clearTimeout(this.timeout);

		const elapsed = Date.now() - this.startedAt!;
		this.remaining = this.interval - elapsed;
		this.state = 'paused';
	}
}
