export function env(key: string, options: Partial<IEnvOptions> = {}) {
	const required = options.required ?? false;
	const value = process.env[key] ?? options.defaultValue;

	if (required && !value) throw new EnvironmentalError(`Missing required environmental variable ${key}`);

	return {
		string: () => String(value),
		number: () => Number(value),
		boolean: () => Boolean(value),
		array: (separator: string = ', ') => {
			const split = String(value).split(separator);
			return split.length ? split : [];
		},
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
