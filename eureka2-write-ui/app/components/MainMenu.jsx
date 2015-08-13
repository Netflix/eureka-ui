import React from "react";
import { Link } from "react-router";
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from "react-bootstrap"
import { NavItemLink } from "react-router-bootstrap"

export default class MainMenu extends React.Component {
	render() {
		return <Navbar brand='Eureka2 Server Admin UI'>
			<Nav>
				<NavItemLink eventKey={1} to="instanceInfoHolderBrowser">Holder list</NavItemLink>
			</Nav>
		</Navbar>;
	}
}
