import React from "react";
import { Card, Input } from "semantic-ui-react";

const LearningRate = ({ learningRate, setLearningRate }) => {
	const onChange = (e) => {
		setLearningRate(e.target.value);
	};
	return (
		<Card>
			<Card.Content>
				<Card.Header>LearningRate</Card.Header>
				<Card.Meta>Ideal between 0 and 1</Card.Meta>
				<Card.Description>
					<Input onChange={onChange} value={learningRate} />
				</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default React.memo(LearningRate);
