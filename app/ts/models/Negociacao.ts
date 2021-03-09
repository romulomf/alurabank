import { Igualavel } from './Igualavel';

export class Negociacao implements Igualavel<Negociacao> {

	constructor(readonly data : Date, readonly quantidade: number, readonly valor: number) {}

	get volume() {
		return this.quantidade * this.valor;
	}

	public escreveTexto(): void {
		console.log(`Data: ${this.data}
			Quantidade: ${this.quantidade}
			Valor: ${this.valor}`);
	}

	public igual(outro: Negociacao): boolean {
		return this.data.getDate() == outro.data.getDate() && this.data.getMonth() == outro.data.getMonth() && this.data.getFullYear() == outro.data.getFullYear();
	}
}