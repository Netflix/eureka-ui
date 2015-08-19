import React from "react";
import { Route, DefaultRoute, NotFoundRoute } from "react-router";

import Application from "containers/Application";
import HomePage from "containers/HomePage";
import NotFoundPage from "containers/NotFoundPage";
import ApplicationsBrowser from "containers/ApplicationsBrowser";
import ClusterTopology from "containers/ClusterTopology";
import InstanceInfoHolderBrowser from "containers/InstanceInfoHolderBrowser";

// polyfill
if(!Object.assign)
	Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle

// export routes
module.exports = (
	<Route name="app" path="/" handler={Application}>
		<Route name="clusterTopology" path="/ui/system/cluster" handler={ClusterTopology} />
		<Route name="instanceInfoHolderBrowser" path="/ui/diagnostic/registry/entryholders" handler={InstanceInfoHolderBrowser} />
		<Route name="applicationsBrowser" path="/ui/system/applications" handler={ApplicationsBrowser} />
		<DefaultRoute handler={HomePage} />
		<NotFoundRoute handler={NotFoundPage} />
	</Route>
);
