import { inspect } from 'node:util';
import { colours, figures } from './decorations';

export class Logger {
	name: string;
	readonly depth: number;
	readonly joinBy: string;
	readonly pretty: boolean;
	readonly debugLevel: boolean;

	constructor(options: ILoggerOptions = { name: 'server' }) {
		this.depth = options.depth ?? 0;
		this.joinBy = options.joinBy ?? ' ';
		this.pretty = options.pretty ?? true;
		this.name = options.name;
		this.debugLevel = options.debug ?? false;
	}

	info(...args: unknown[]): void {
		this._write('info', process.stdout, ...args);
	}

	warn(...args: unknown[]): void {
		this._write('warn', process.stderr, ...args);
	}

	error(...args: unknown[]): void {
		this._write('error', process.stderr, ...args);
	}

	debug(...args: unknown[]): void {
		if (!this.debugLevel) return;
		this._write('debug', process.stdout, ...args);
	}

	setName(name: string): this {
		this.name = name;
		return this;
	}

	protected _write(level: LogLevel, stdout: NodeJS.WritableStream, ...args: unknown[]): void {
		args = args.map((value) => (typeof value === 'string' ? value : inspect(value, { depth: this.depth })));

		stdout.write(this._pretty(level, ...[...args, '\n']));
	}

	protected _pretty(level: LogLevel, ...args: unknown[]): string {
		if (!this.pretty) return `[${this.name}] > ${level.padEnd(5)} ${figures[level]} ${args.join(this.joinBy)}`;

		const namespace = this._colour(colours.grey, `[${this.name}] ${figures.arrow}`);
		const messageLevel = this._colour(colours[level], level.padEnd(5));
		const figure = this._colour(colours[level], figures[level]);
		const message = this._colour(colours.lightGrey, ...args);

		return `${this._dim(namespace)} ${this._underline(messageLevel)} ${this._bold(figure)} ${message}`;
	}

	protected _colour(colour: string, ...args: unknown[]): string {
		return `${colour}${args.join(this.joinBy)}${colours.reset}`;
	}

	protected _bold(...args: unknown[]): string {
		return this._colour(colours.bold, ...args);
	}

	protected _dim(...args: unknown[]): string {
		return this._colour(colours.dim, ...args);
	}

	protected _underline(...args: unknown[]): string {
		return this._colour(colours.underline, ...args);
	}
}

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';
export interface ILoggerOptions {
	name: string;
	depth?: number;
	joinBy?: string;
	debug?: boolean;
	pretty?: boolean;
}
