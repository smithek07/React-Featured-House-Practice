/** @format */

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./main-page/header";
import FeaturedHouse from "./main-page/featured-house";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [allHouses, setAllHouses] = useState([]);

	useEffect(() => {
		const featureHouses = async () => {
			const rsp = await fetch("/houses.json", {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});
			const houses = await rsp.json();
			setAllHouses(houses);
		};
		featureHouses();
	}, []);

	const featuredHouse = useMemo(() => {
		if (allHouses.length) {
			const randomIndex = Math.floor(Math.random() * allHouses.length);
			return allHouses[randomIndex];
		}
	}, [allHouses]);

	if (featuredHouse) {
		return (
			<div className="container">
				<Header subtitle="Find your home today!" />
				<FeaturedHouse house={featuredHouse} />
			</div>
		);
	}
	return <div>No data found.</div>;
}

export default App;
