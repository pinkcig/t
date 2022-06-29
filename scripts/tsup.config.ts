// Kudos @sapphiredev

import { relative, resolve } from 'node:path';
import { defineConfig, Options } from 'tsup';

const defaultConfig = defineConfig({
	globalName: undefined,
	target: 'es2021',
	sourcemap: true,
});

export const createTsupConfig = (options: Readonly<Pick<Options, 'esbuildOptions' | 'sourcemap' | 'target' | 'format' | 'globalName'>>) =>
	defineConfig({
		...defaultConfig,
		...options,
		clean: true,
		dts: false,
		entry: ['src/index.ts'],
		minify: false,
		format: ['cjs', 'esm', 'iife'],
		skipNodeModulesBundle: true,
		tsconfig: relative(__dirname, resolve(process.cwd(), 'src', 'tsconfig.json')),
		keepNames: true,
		outDir: 'build',
	});
