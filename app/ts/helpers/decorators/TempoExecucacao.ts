export function logTempoExecucao(emSegundos: boolean = false) {

	return function(target: any, property: string, descriptor: PropertyDescriptor) {

		const metodo = descriptor.value;
		descriptor.value = function(... args: any[]) {
			let unidade = 'ms';
			let divisor = 1;
			if (emSegundos) {
				unidade = 's';
				divisor = 1000;
			}
			console.log('* * * * * * * * * * * * * * *');
			console.log(`parâmetros passados para o método ${property} : ${JSON.stringify(args)}.`);
			const t1 = performance.now();
			const retorno = metodo.apply(this, args);
			console.log(`O retorno do método ${property} é ${JSON.stringify(retorno)}.`);
			const t2 = performance.now();
			console.log(`O método ${property} demorou ${(t2 - t1) / divisor} ${unidade} para executar.`)
			console.log('* * * * * * * * * * * * * * *');
			return retorno;
		}
		return descriptor;
	}
}