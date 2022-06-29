import { createTsupConfig } from '../../scripts/tsup.config';

export default createTsupConfig({
	globalName: 't_env',
	format: ['cjs', 'esm'],
});
