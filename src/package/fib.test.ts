import { expect, test } from 'vitest';

import { fibs } from './fib';

test('fib should generate correct sequence', () => {
	const sequence = fibs(10);
	expect(sequence).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
});
