import React, { useState, useEffect, useRef, useCallback } from "react";
import csv from "../data.csv";
import Trainer from "./Trainer";
import { Grid, Button } from "semantic-ui-react";
import Graph from "./Graph";
import Predict from "./Predict";
import Hypothesis from "./Hypothesis";
import Costs from "./Costs";
import LearningRate from "./LearningRate";

const scatterData = {
	x: csv.map((d) => d.km),
	y: csv.map((d) => d.price),
};

Trainer.init(csv).normalize();

const App = () => {
	const [theta, setTheta] = useState([0, 0]);
	const [isTraining, setIsTraining] = useState(false);
	const interval = useRef(null);
	const [costs, setCosts] = useState([]);
	const [learningRate, setLearningRate] = useState(0.5);
	const iteration = useRef(null);

	const onTraining = () => {
		const lr = parseFloat(learningRate);
		if (!lr) return alert("Invalid learning rate");
		Trainer.theta = [0, 0];
		Trainer.learningRate = lr;
		setCosts([]);
		iteration.current = 0;
		setIsTraining(true);
	};

	const training = useCallback(() => {
		let tmpTheta = [1, 1];
		let thetaSum = [0, 0];
		Trainer.data.forEach((d) => {
			thetaSum[0] += Trainer._hypothesis(d.km) - d.price;
			thetaSum[1] += (Trainer._hypothesis(d.km) - d.price) * d.km;
		});
		tmpTheta[0] = (Trainer.learningRate / Trainer.M) * thetaSum[0];
		tmpTheta[1] = (Trainer.learningRate / Trainer.M) * thetaSum[1];
		Trainer.theta[0] -= tmpTheta[0];
		Trainer.theta[1] -= tmpTheta[1];
		iteration.current += 1;
		if (iteration.current > 200) {
			setIsTraining(false);
		}
		setTheta([Trainer.theta[0], Trainer.theta[1] / Trainer.scale]);
		setCosts((prev) => {
			return prev.concat(Trainer._cost());
		});
	}, []);

	useEffect(() => {
		if (isTraining) interval.current = setInterval(() => training(), 1);
		return () => {
			clearInterval(interval.current);
		};
	}, [isTraining]);

	return (
		<Grid style={{ height: "100vh" }} verticalAlign="middle" textAlign="center">
			<Grid.Column width={8}>
				<Graph scatterData={scatterData} theta={theta} />
				<Grid.Row>
					<Button onClick={onTraining} disabled={isTraining ? true : false}>
						Start Training
					</Button>
				</Grid.Row>
			</Grid.Column>
			<Grid.Column width={8}>
				<Grid centered>
					<Grid.Row>
						<Costs costs={costs} />
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8}>
							<Hypothesis theta={theta} />
							<Predict theta={theta} />
						</Grid.Column>
						<Grid.Column width={6}>
							<LearningRate
								learningRate={learningRate}
								setLearningRate={setLearningRate}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Grid.Column>
		</Grid>
	);
};

export default App;
