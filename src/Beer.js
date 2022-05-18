const Beer = ({ beer }) => {
	return (
		<li key={beer.id}>
			<img src={beer.image_url} alt={beer.name} />
			<p>
				{beer.name} - {beer.tagline}
			</p>
			<p>{beer.description}</p>
			<p>{beer.food_pairing}</p>
		</li>
	);
};

export default Beer;
