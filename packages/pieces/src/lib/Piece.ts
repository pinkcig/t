export abstract class Piece {
	readonly name: string;

	constructor(options: IPieceOptions) {
		this.name = options.name;
	}
}

export interface IPieceOptions {
	name: string;
}
