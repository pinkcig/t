export function env(key: string, options: Partial<IEnvOptions> = {}) {
	const required = options.required ?? false;
	const value = process.env[key] ?? options.defaultValue;

	if (required && !value) throw new EnvironmentalError(`Missing required environmental variable ${key}`);

	function makeResolver<T>(fn: (value: unknown) => T) {
		return fn.bind(null, value);
	}

	return {
		string: makeResolver((value) => String(value)),
		integer: makeResolver((value) => Number(value)),
		boolean: makeResolver((value) => Boolean(value)),
		array: makeResolver((value) => {
			const split = String(value).split(', ');
			return split.length ? split : [];
		}),
	};
}

export interface IEnvOptions {
	defaultValue: unknown;
	required: boolean;
}

class EnvironmentalError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'EnvironmentalError';
	}
}
