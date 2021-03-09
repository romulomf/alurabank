export function domInject(selector: string) {

	return function(target: any, property: string) {
		let element: JQuery;
		const getter = function() {
			if (!element) {
				console.log(`buscando o elemento do DOM seletor ${selector} para injetar em ${property}.`)
				element = $(selector);
			}
			return element;
		}
		Object.defineProperty(target, property, { get: getter});
	}
}