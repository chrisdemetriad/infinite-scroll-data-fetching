const Beer = ({ beer }) => {
	return (
		<div key={beer.id} id={`id${beer.id}`}>
			<img src={beer.image_url} alt={beer.name} width="120" />
			<p>
				{beer.abv} - {beer.name} - {beer.tagline}
			</p>
			<p>{beer.description}</p>
			<p>{beer.food_pairing}</p>
		</div>
	);
};

export default Beer;
