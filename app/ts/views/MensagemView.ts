import { View } from './View';

export class MensagemView extends View<string> {

	constructor(selector: string) {
		super(selector, true);
	}

	template(modelo: string) {
		return `<p class="alert alert-info">${modelo}</p>`;
	}
}