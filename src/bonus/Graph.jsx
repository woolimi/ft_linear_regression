import React from "react";
import Plot from "react-plotly.js";

const Graph = ({ theta, scatterData }) => {
	return (
		<Plot
			style={{ width: "100%", height: "80vh" }}
			layout={{
				title: "ft_linear_regression",
				xaxis: {
					title: "mileage(km)",
				},
				yaxis: {
					title: "price",
				},
				shapes: [
					{
						type: "line",
						xref: "x",
						yref: "y",
						x0: 0,
						y0: theta[0],
						x1: 250000,
						y1: theta[1] * 250000 + theta[0],
						line: {
							color: "blue",
							width: 3,
						},
					},
				],
			}}
			useResizeHandler={true}
			autoresize={true}
			data={[
				{
					type: "scatter",
					x: scatterData.x,
					y: scatterData.y,
					marker: {
						color: "red",
						size: 15,
					},
					mode: "markers",
				},
			]}
		/>
	);
};

export default Graph;
