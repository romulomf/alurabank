import { View } from './View';
import { Negociacoes } from '../models/Negociacoes';

export class NegociacoesView extends View<Negociacoes> {

	constructor(selector: string) {
		super(selector, true);
	}

	template(negociacoes: Negociacoes): string {
		return `
			<table class="table table-hover table-bordered">
				<thead>
				<tr>
					<th>DATA</th>
					<th>QUANTIDADE</th>
					<th>VALOR</th>
					<th>VOLUME</th>
				</tr>
				</thead>
				<tbody>
					${negociacoes.toArray().map(n =>
						`
						<tr>
							<td>${n.data.getDate()}/${n.data.getMonth()}/${n.data.getFullYear()}</td>
							<td>${n.quantidade}</td>
							<td>${n.valor}</td>
							<td>${n.volume}</td>
						</tr>
					`).join('')}
				</tbody>
			</table>
		`;
	}
}