import { describe, test, expect, afterEach } from 'vitest';
import { env } from '../src/index';

const KEY = 'TEST_ENV_VAR';

describe('env', () => {
	afterEach(() => void delete process.env[KEY]);

	test('GIVEN input THEN always return resolvers', () => {
		const resolvers = env(KEY);

		expect(resolvers).toBeDefined();
		expect(resolvers).keys('string', 'number', 'boolean', 'array');
	});

	test('GIVEN non-existing key WITH required option THEN throw EnvironmentalError', () => {
		expect(() => env(KEY, { required: true })).toThrowError('environmental');
	});

	test('GIVEN existing key WITH required option THEN return correct value', () => {
		process.env[KEY] = 'mommy';

		const result = env(KEY, { required: true }).string();
		expect(result).toBe('mommy');
	});

	test('GIVEN non-existing key WITH defaultValue option THEN return correct value', () => {
		const result = env(KEY, { defaultValue: 'baby' }).string();
		expect(result).toBe('baby');
	});

	test('GIVEN existing key WITH defaultValue option THEN return correct value', () => {
		process.env[KEY] = 'mommy';

		const result = env(KEY, { defaultValue: 'baby' }).string();
		expect(result).toBe('mommy');
	});

	describe('resolvers', () => {
		test('GIVEN string THEN return correct value', () => {
			process.env[KEY] = 'mommy';

			const result = env(KEY).string();
			expect(result).toBe('mommy');
			expect(result).toBeTypeOf('string');
		})

		test('GIVEN number THEN return correct value', () => {
			process.env[KEY] = '1';

			const result = env(KEY).number();
			expect(result).toBe(1);
			expect(result).toBeTypeOf('number');
		});

		test('GIVEN boolean THEN return correct value', () => {
			process.env[KEY] = 'true';

			const result = env(KEY).boolean();
			expect(result).toBe(true);
			expect(result).toBeTypeOf('boolean');
		});

		describe('array', () => {
			test('GIVEN array THEN return correct value', () => {
				process.env[KEY] = 'hello, world';

				const result = env(KEY).array();
				expect(result).toEqual(['hello', 'world']);
			});

			test('GIVEN array WITH different separator THEN return correct value', () => {
				process.env[KEY] = 'hello|world';

				const result = env(KEY).array('|');
				expect(result).toEqual(['hello', 'world']);
			});
		})
	});
});
