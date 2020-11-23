const Trainer = {
	data: [],
	scale: null,
	theta: [0, 0],
	M: 0,
	learningRate: 0.5,
	init(data) {
		this.data = data;
		this.M = this.data.length;
		return this;
	},
	normalize() {
		const kms = this.data.map((d) => d.km);
		const [min, max] = [Math.min(...kms), Math.max(...kms)];
		this.scale = max - min;
		this.data.forEach((d) => {
			d.km = (d.km - min) / this.scale;
		});
		return this;
	},
	_hypothesis(km) {
		return this.theta[0] + this.theta[1] * km;
	},
	_cost() {
		return this._squared_error() / (2 * this.M);
	},
	_squared_error() {
		return this.data.reduce(
			(sum, d) => sum + (this._hypothesis(d.km) - d.price) ** 2,
			0,
		);
	},
};

export default Trainer;
