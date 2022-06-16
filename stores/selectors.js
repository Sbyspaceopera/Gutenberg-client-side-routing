const selectors = {
	//Routers
	getRouter(state, routerName) {
		const { routers } = state;
		const router = routers.find((router) => router.name === routerName);

		return router;
	},
	getRouters(state) {
		const { routers } = state;

		return routers;
	},
	getRoutersNames(state) {
		const { routers } = state;
		const routersNames = [];
		for (let router of routers) {
			routersNames.push(router.name);
		}

		return routersNames;
	},
	//Routes
	getRoute(state, routeName) {
		const { routers } = state;
		const router = routers.find((router) => router.name === routerName);
		const route = router.routes.find((route) => route === routeName);

		return route;
	},
	getRoutes(state, routerName) {
		const { routers } = state;
		const router = routers.find((router) => router.name === routerName);
		const routes = router.routes;

		return routes;
	},
	//Actual Route
	getActualRoute(state, routerName) {
		const { routers } = state;
		const router = routers.find((router) => router.name === routerName);

		return router.actualRoute;
	},
};

export default selectors;
