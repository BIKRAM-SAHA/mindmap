import { useMediaQuery } from "react-responsive";
import "./App.css";
import { Home } from "./screens";

function App() {
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

	if (isTabletOrMobile)
		throw new Error("We do not support mobile/tablets yet");

	return (
		<>
			<Home />
		</>
	);
}

export default App;
