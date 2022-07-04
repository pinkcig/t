import { EventEmitter } from 'node:events';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { IPieceOptions, Piece } from './Piece';

// TODO: Make @pinkcig/events
// TODO: Maybe switch to a more declarative approach(?)
export abstract class Store<T extends Piece> extends EventEmitter {
	readonly pieces: Map<string, T> = new Map();
	readonly directory: string;

	constructor(options: IStoreOptins) {
		super();

		this.directory = options.directory;
	}

	load(piece: T) {
		this.pieces.set(piece.name, piece);
		this.emit('load', piece);
	}

	unload(piece: T | string) {
		const match = typeof piece === 'string' ? this.pieces.get(piece) : piece;

		if (!match) return;
		piece = match;

		this.pieces.delete(piece.name);
		this.emit('unload', piece);
	}

	async loadAll() {
		const instances: T[] = [];
		const files = await this.#walk(this.directory, (file) =>
			['.js.map', '.ts', '.d.ts', '.d.ts.map', '.mjs.map'].some((extension) => file.endsWith(extension)),
		);

		const pieces = [];

		for (const file of files) {
			const modules = await import(file);
			const exports = this.#siftExports(modules);

			for (const module of exports) pieces.push(module);
		}

		for (const piece of pieces) {
			const instance = new piece({ name: piece.name });

			this.load(instance);
			instances.push(instance);
		}

		return instances;
	}

	async unloadAll() {
		for (const piece of this.pieces.values()) //
			this.unload(piece);
	}

	async #walk(directory: string, filter: (file: string) => boolean): Promise<string[]> {
		const path = resolve(directory);
		const files = [];

		for (const file of await readdir(path, { withFileTypes: true })) {
			if (filter(file.name)) continue;
			const path = resolve(directory, file.name);

			if (file.isDirectory()) files.push(...(await this.#walk(path, filter)));
			else if (file.isFile()) files.push(path);
		}

		return files;
	}

	#siftExports(net: Record<string, any>) {
		const modules = [];

		for (const value of net.default ? Object.values(net.default) : Object.values(net)) {
			modules.push(value);
		}

		return modules as { new (options: IPieceOptions): T }[];
	}
}

export interface IStoreOptins {
	directory: string;
}
