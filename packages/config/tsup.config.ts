import { createTsupConfig } from '../../scripts/tsup.config';

export default createTsupConfig({
	globalName: 't_prettier_config',
	format: ['cjs', 'esm'],
});
