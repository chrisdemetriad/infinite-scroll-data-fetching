import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
	const [data, setData] = useState(null);
	const [page] = useState(1);

	const BEERS_PER_PAGE = 80;
	const API_URL = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${BEERS_PER_PAGE}`;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(API_URL);
				const data = await result.data;
				setData(data);
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
							<li key={beer.id}>
								{/* <img src={beer.image_url} alt={beer.name} /> */}
								<p>
									{beer.name} - {beer.tagline}
								</p>
								<p>{beer.description}</p>
								<p>{beer.food_pairing}</p>
							</li>
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
