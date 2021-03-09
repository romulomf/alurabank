import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

$('.form').on('submit', controller.adicionar.bind(controller));
$('#importar').on('click', controller.importar.bind(controller));