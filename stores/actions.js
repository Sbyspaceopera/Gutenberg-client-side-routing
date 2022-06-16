import actionsTypes from "./actionsTypes";

const actions = {
	getRouter(routerName) {
		return {
			type: actionsTypes.GET_ROUTER,
			routerName,
		};
	},
	addRouter(routerName) {
		return {
			type: actionsTypes.ADD_ROUTER,
			routerName,
		};
	},
	removeRouter(routeName) {
		return {
			type: actionsTypes.REMOVE_ROUTER,
			routeName,
		};
	},
	setRouter(oldRouterName, routerName) {
		return {
			type: actionsTypes.SET_ROUTER,
			oldRouterName,
			routerName,
		};
	},
	getRoutes(routerName) {
		return {
			type: actionsTypes.GET_ROUTES,
			routerName,
		};
	},
	addRoute(routerName, routeName) {
		return {
			type: actionsTypes.ADD_ROUTE,
			routerName,
			routeName,
		};
	},
	removeRoute(routerName, routeName) {
		return {
			type: actionsTypes.REMOVE_ROUTE,
			routerName,
			routeName,
		};
	},
	setRoute(routerName, oldRouteName, routeName) {
		return {
			type: actionsTypes.SET_ROUTE,
			routerName,
			oldRouteName,
			routeName,
		};
	},
	getActualRoute(routerName) {
		return {
			type: actionsTypes.GET_ACTUAL_ROUTE,
			routerName,
		};
	},
	setActualRoute(routerName, routeName) {
		return {
			type: actionsTypes.SET_ACTUAL_ROUTE,
			routerName,
			routeName,
		};
	},
};

export default actions;
