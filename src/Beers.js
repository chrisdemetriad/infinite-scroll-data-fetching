import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Beer from "./Beer";

const TOTAL_PAGES = 3;
const BEERS_PER_PAGE = 25;

const Beers = () => {
	const [beers, setBeers] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [last, setLast] = useState(null);

	const API_URL = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${BEERS_PER_PAGE}`;

	const observer = useRef(
		new IntersectionObserver((beers) => {
			const first = beers[0];
			if (first.isIntersecting) {
				setPage((number) => number + 1);
			}
		})
	);
	const fetchData = async () => {
		try {
			setLoading(true);
			let response = await axios.get(API_URL);
			let allBeers = [...beers, ...response.data];
			setBeers([...allBeers]);
			setLoading(false);
		} catch (err) {
			// @todo: handle error
		}
	};
	useEffect(() => {
		if (TOTAL_PAGES >= page) {
			fetchData();
		}
	}, [page]);

	useEffect(() => {
		const current = last;
		const currentObserver = observer.current;

		if (current) {
			currentObserver.observe(current);
		}

		return () => {
			if (current) {
				currentObserver.unobserve(current);
			}
		};
	}, [last]);

	return (
		<>
			{loading && <p>Loading</p>}
			{beers.length > 0 &&
				beers.map((beer, index) => {
					return !loading && index === beers.length - 1 && TOTAL_PAGES >= page ? (
						<div key={beer.id} id={beer.id} ref={setLast}>
							<Beer beer={beer} />
						</div>
					) : (
						<Beer beer={beer} key={beer.id} id={beer.id} />
					);
				})}
			{TOTAL_PAGES === page - 1 && <p>No more results to fetch</p>}
		</>
	);
};

export default Beers;
