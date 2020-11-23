import React, { useState, useCallback } from "react";
import { Card, Input } from "semantic-ui-react";

const Predict = ({ theta }) => {
	const [estimation, setEstimation] = useState(0);
	const onEstimate = useCallback((e) => {
		const km = parseFloat(e.target.value);
		if (!km) return;
		setEstimation(theta[0] + theta[1] * km);
	});

	return (
		<Card>
			<Card.Content>
				<Card.Header>Prediction</Card.Header>
				<Card.Meta>estimated price: {estimation}</Card.Meta>
				<Card.Description>
					<Input label="km" labelPosition="right" onChange={onEstimate} />
				</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default React.memo(Predict);
