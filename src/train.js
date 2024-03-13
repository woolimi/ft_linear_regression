const csv = require("csv-parser");
const fs = require("fs");

const Trainer = {
  csv: `${__dirname}/data.csv`,
  model: `${__dirname}/model.json`,
  data: [],
  scale: null,
  theta: [0, 0],
  M: 0,
  steps: 0,
  MAX_STEPS: 500,
  learningRate: 0.5,
  init() {
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
    return this.data.reduce((sum, d) => sum + (this._hypothesis(d.km) - d.price) ** 2, 0);
  },
  log() {
    console.log("===========================");
    console.log("Theta0 : ", this.theta[0]);
    console.log("Theta1 : ", this.theta[1]);
    console.log("===========================");
    return this;
  },
  training() {
    let tmpTheta = [1, 1];
    while (this.MAX_STEPS > this.steps) {
      let thetaSum = [0, 0];
      this.data.forEach((d) => {
        thetaSum[0] += this._hypothesis(d.km) - d.price;
        thetaSum[1] += (this._hypothesis(d.km) - d.price) * d.km;
      });
      tmpTheta[0] = (this.learningRate / this.M) * thetaSum[0];
      tmpTheta[1] = (this.learningRate / this.M) * thetaSum[1];
      this.theta[0] -= tmpTheta[0];
      this.theta[1] -= tmpTheta[1];
      this.steps += 1;
    }
    this.theta[1] /= this.scale;
    return this;
  },
  save() {
    fs.writeFile(
      this.model,
      JSON.stringify({
        theta0: this.theta[0],
        theta1: this.theta[1],
      }),
      (err) => {
        if (err) console.error(err);
      },
    );
    return this;
  },
};

fs.createReadStream(Trainer.csv)
  .pipe(
    csv({
      mapValues: ({ value }) => parseFloat(value),
    }),
  )
  .on("data", (d) => Trainer.data.push(d))
  .on("end", () => {
    Trainer.init().normalize().training().save().log();
  });
