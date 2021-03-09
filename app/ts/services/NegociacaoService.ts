import { Negociacao, NegociacaoParcial } from '../models/index';

export class NegociacaoService {
	
	constructor() {}

	public obterNegociacoes(manipulador: ManipuladorFuncao): Promise<Negociacao[]> {
		return fetch('http://localhost:8080/dados')
				.then(response => manipulador(response))
				.then(response => response.json())
				.then((dados: NegociacaoParcial[]) => dados.map(d => new Negociacao(new Date(), d.vezes, d.montante)))
	}
}

export interface ManipuladorFuncao {

	(resposta: Response): Response;
}