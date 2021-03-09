import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';
import { NegociacaoService, ManipuladorFuncao } from '../services/index';

export class NegociacaoController {

	@domInject('#data')
	private _data : JQuery;

	@domInject('#quantidade')
	private _quantidade : JQuery;

	@domInject('#valor')
	private _valor : JQuery;

	private _negociacoes: Negociacoes;

	private _negociacoesView: NegociacoesView;

	private _mensagemView: MensagemView;

	private _negociacaoService: NegociacaoService;

	constructor() {
		this._negociacoes = new Negociacoes();
		this._negociacoesView = new NegociacoesView('#negociacoes-view');
		this._negociacoesView.update(this._negociacoes);
		this._mensagemView = new MensagemView('#mensagem-view');
		this._negociacaoService = new NegociacaoService();
	}

	adicionar(e: Event): void {
		e.preventDefault();
		let date = new Date((this._data.val() as string).replace(/-/g, ','));
		if (!this.isDiaUtil(date)) {
			this._mensagemView.update('Somente negociações em dias úteis por favor.');
			return;
		}
		const negociacao = new Negociacao(date, parseInt(this._quantidade.val() as string), parseFloat(this._valor.val() as string));
		this._negociacoes.adicionar(negociacao);
		this._negociacoesView.update(this._negociacoes);
		this._mensagemView.update('Negociação adicionada com sucesso');
	}

	private isDiaUtil(date: Date): boolean {
		if (date.getDay() == DiaDaSemana.Domingo || date.getDay() == DiaDaSemana.Sabado) {
			return false;
		}
		return true;
	}

	@throttle()
	async importar(): Promise<void> {
		try {
			const ok : ManipuladorFuncao = (resposta: Response) => {
				if(resposta.ok) {
					return resposta;
				}
				throw new Error(resposta.statusText);
			}
			const negociacoesParaImportar = await this._negociacaoService.obterNegociacoes(ok);
			const negociacoesJaImportadas = this._negociacoes.toArray();
			negociacoesParaImportar.filter(n => !negociacoesJaImportadas.some(importada => importada.igual(n))).forEach(n => this._negociacoes.adicionar(n));
			this._negociacoesView.update(this._negociacoes);
		} catch(e) {
			this._mensagemView.update(e.message);
		}
	}
}

enum DiaDaSemana {
	Domingo,
	Segunda,
	Terca,
	Quarta,
	Quinta,
	Sexta,
	Sabado
}