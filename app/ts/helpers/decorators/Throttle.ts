export function throttle(timeUnit: number = 500) {
	return function(target: any, property: string, descriptor: PropertyDescriptor) {
		const metodo: Function = descriptor.value;
		let timer : number = 0;
		descriptor.value = function(... args: any[]) {
			clearInterval(timer);
			timer = setTimeout(() => metodo.apply(this, args), timeUnit);
		}
	}
}