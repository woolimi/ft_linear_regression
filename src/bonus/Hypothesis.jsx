import React from "react";
import { Card } from "semantic-ui-react";

const Hypothesis = ({ theta }) => {
	return (
		<Card
			header="Hypothesis"
			meta="y = theta0 + theta1 * x"
			description={`y = (${theta[0]}) + (${theta[1]}) * x`}
		/>
	);
};

export default Hypothesis;
