import React from "react";
import Plot from "react-plotly.js";
import { Card } from "semantic-ui-react";

const Costs = ({ costs }) => {
	return (
		<Card style={{ width: "85%" }}>
			<Card.Content>
				<Card.Header>MSE(Mean Square Error)</Card.Header>
				<Plot
					style={{ width: "100%", height: "45vh" }}
					layout={{
						xaxis: {
							title: "step",
						},
						yaxis: {
							title: "costs",
						},
					}}
					useResizeHandler={true}
					autoresize={true}
					data={[
						{
							type: "scatter",
							y: costs,
							marker: {
								color: "grey",
								size: 5,
							},
							mode: "markers",
						},
					]}
				/>
			</Card.Content>
		</Card>
	);
};

export default Costs;
