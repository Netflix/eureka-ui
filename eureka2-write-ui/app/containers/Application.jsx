import React from "react";
import { RouteHandler } from "react-router";
import MainMenu from "components/MainMenu";

import styles from "./Application.css";

export default class Application extends React.Component {
	render() {
		return <div>
			<MainMenu />
			<RouteHandler />
		</div>;
	}
};
