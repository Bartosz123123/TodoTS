export const autoBind = (
	_target: any,
	_methodName: String,
	descriptor: PropertyDescriptor
) => {
	const orginalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = orginalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
};
