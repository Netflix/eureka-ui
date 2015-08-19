import React from "react";
import { Link } from "react-router";
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from "react-bootstrap"
import { NavItemLink } from "react-router-bootstrap"

export default class MainMenu extends React.Component {
	render() {
		return <Navbar brand='Eureka2 Write Server Admin UI'>
			<Nav>
				<NavItemLink eventKey={1} to="clusterTopology">Cluster</NavItemLink>
				<NavItemLink eventKey={2} to="instanceInfoHolderBrowser">Holders</NavItemLink>
				<NavItemLink eventKey={3} to="applicationsBrowser">Applications</NavItemLink>
			</Nav>
		</Navbar>;
	}
}
