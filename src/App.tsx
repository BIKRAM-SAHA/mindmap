import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@modules/common";
import NotifyContainer from "@modules/notifications";
import "./App.css";
import { Home } from "./screens";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
	return (
		<>
			<ErrorBoundary fallback={<ErrorFallback />}>
				<NotifyContainer />
				<Provider store={store}>
					<Home />
				</Provider>
			</ErrorBoundary>
		</>
	);
}

export default App;
