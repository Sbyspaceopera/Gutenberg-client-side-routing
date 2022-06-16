import actionsTypes from "./actionsTypes";
import produce from "immer";

/**
 * @typedef { Object} Router
 * @property {string} name - Router's name
 * @property {string} actualRoute - The actual Route.
 * @property {string} defaultRoute - The default route when the page first render.
 * @property {string[]} history - A stack who keep track of the History for a Router.
 * @property {string[]} routes - A list of the routes given from attributes.
 *
 *
 *
 * @DEFAULT_STATE
 * @type {Router[]}
 * @default
 */

const DEFAULT_STATE = {
	routers: [],
};

const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		//Routers
		case actionsTypes.ADD_ROUTER:
			return produce(state, (draftState) => {
				if (
					!draftState.routers.filter(
						(router) => router.routerName === action.routerName
					)
				) {
					draftState.routers.push({
						name: action.routerName,
						actualRoute: "",
						defaultRoute: "",
						history: [],
						routes: [""],
					});
				}
			});
		case actionsTypes.REMOVE_ROUTER:
			return produce(state, (draftState) => {
				if (
					draftState.routers.filter(
						(router) => router.routerName === action.routerName
					)
				) {
					draftState.routers = draftState.routers.map(
						(router) => router.name === action.routerName
					);
				}
			});
		case actionsTypes.SET_ROUTER:
			return produce(state, (draftState) => {
				draftState = draftState.routers.map((router) => {
					if (router.name === action.routerName) {
						router.name = action.newRouterName;
					}
				});
			});
		//Routes
		case actionsTypes.ADD_ROUTE:
			return produce(state, (draftState) => {
				draftState.routers = draftState.routers.map((router) => {
					if (
						router.routerName === action.routerName &&
						!router.routes.find((route) => route === action.routeName)
					) {
						router.routes.push(action.routeName);
					}
				});
			});
		case actionsTypes.REMOVE_ROUTE:
			return produce(state, (draftState) => {
				draftState.routers = draftState.routers.map((router) => {
					if (
						router.routerName === action.routerName &&
						router.routes.find((route) => route === action.routeName)
					) {
						let index = router.routes.findeIndex(
							(route) => route === action.routeName
						);
						router.routes.splice(index, 1);
					}
				});
			});
		case actionsTypes.SET_ROUTE:
			return produce(state, (draftState) => {
				draftState = draftState.routers.map((router) => {
					if (router.name === action.routerName) {
						let index = router.routes.findIndex(action.oldRouteName);
						router.routes[index] = action.routeName;
					}
				});
			});
		//Actual Route
		case actionsTypes.SET_ACTUAL_ROUTE:
			return produce(state, (draftState) => {
				if (
					draftState.routers.filter(
						(router) => router.routerName === action.routerName
					)
				) {
					draftState.routers = draftState.routers.map((router) => {
						if (router.routerName === action.routerName) {
							router.acutalRoute = router.routeName;
						}
					});
				}
			});
		default:
			return state;
	}
};

export default reducer;
