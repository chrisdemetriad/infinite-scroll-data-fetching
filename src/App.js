import "./App.css";

import React, { useState, useEffect } from "react";

const App = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetch(`https://api.punkapi.com/v2/beers`);
				const body = await result.json();
				setData(body);
			} catch (err) {
				// @todo: handle error
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			{data ? (
				data.length > 0 ? (
					<ul>
						{data.map((beer) => (
							<li key={beer.id}>{beer.name}</li>
						))}
					</ul>
				) : (
					<h2>Loading</h2>
				)
			) : (
				<h2>No results</h2>
			)}
		</div>
	);
};
export default App;
