import { Negociacao } from '../models/index';

export function imprimir(... negociacoes: Negociacao[]) {
	negociacoes.forEach(n => n.escreveTexto());
}