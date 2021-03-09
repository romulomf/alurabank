import { Negociacao } from './Negociacao';
import { Igualavel } from './Igualavel';

export class Negociacoes implements Igualavel<Negociacoes> {

	private _negociacoes : Negociacao[];

	constructor() {
		this._negociacoes = [];
	}

	public adicionar(negociacao: Negociacao): void {
		this._negociacoes.push(negociacao);
	}

	public toArray(): Negociacao[] {
		return ([] as Negociacao[]).concat(this._negociacoes);
	}

	public igual(outro: Negociacoes): boolean {
		return JSON.stringify(this._negociacoes) == JSON.stringify(outro.toArray());
	}
}