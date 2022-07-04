// Kudos @sapphiredev
// TODO: Make this... better

import { relative, resolve } from 'node:path';
import { defineConfig, Options } from 'tsup';

const defaultConfig = defineConfig({
	globalName: undefined,
	target: 'es2021',
	sourcemap: true,
	clean: true,
	dts: false,
	entry: ['src/**/*.ts'],
	minify: true,
	format: ['cjs', 'esm', 'iife'],
	skipNodeModulesBundle: true,
	tsconfig: relative(__dirname, resolve(process.cwd(), 'src', 'tsconfig.json')),
	keepNames: true,
	outDir: 'build',
});

export const createTsupConfig = (
	options: Readonly<Pick<Options, 'esbuildOptions' | 'sourcemap' | 'target' | 'format' | 'globalName' | 'splitting' | 'minify'>>,
) =>
	defineConfig({
		...defaultConfig,
		...options,
	});
