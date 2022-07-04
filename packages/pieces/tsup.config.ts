import { createTsupConfig } from "../../scripts/tsup.config";

export default createTsupConfig({
	globalName: 't_pieces',
	splitting: false,
	format: ['cjs']
})
