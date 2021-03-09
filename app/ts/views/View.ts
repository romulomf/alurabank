import { logTempoExecucao } from '../helpers/decorators/index';

export abstract class View<T> {

	private _element: JQuery;

	private _scape: boolean;

	constructor(selector: string, scape: boolean = false) {
		this._element = $(selector);
		this._scape = scape;
	}

	abstract template(modelo: T): string;

	@logTempoExecucao()
	update(modelo: T): void {
		let template = this.template(modelo);
		if(this._scape) {
			template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
		}
		this._element.html(template);
	}
}