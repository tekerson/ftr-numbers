
export function fibs(count: number): number[] {
	const sequence = [];
	for (const n of fib()) {
		sequence.push(n);
		if (sequence.length >= count) break;
	}
	return sequence;
}

function *fib(): Generator<number> {
	let a = 0;
	let b = 1;

	while (true) {
		yield a;
		[a, b] = [b, a + b];
	}
}
