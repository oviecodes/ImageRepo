

const average = require('../utils/for_testing').average

describe('average', () => {
	test('of one value is the value itself', () => {
		expect(average([1])).toBe(1)
	})

	test('of many is calculated right', () => {
		expect(average([2, 3, 4, 5])).toBe(3.5)
	})

	test('of empty array to be zero', () => {
		expect(average([])).toBe(0)
	})
})