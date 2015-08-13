require('bootstrap/dist/css/bootstrap.css');
require('fixed-data-table/dist/fixed-data-table.css');

import React from "react";
import Router from "react-router";

import routes from "mainRoutes";

Router.run(routes, Router.HistoryLocation, function(Application, state) {
	React.render(<Application />, document.getElementById("content"));
});
