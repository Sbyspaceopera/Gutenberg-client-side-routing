import { createReduxStore, register } from "@wordpress/data";
import actions from "./actions";
import reducer from "./reducer";
import selectors from "./selectors";

console.log("Log from CSR stores index");

const store = createReduxStore("csr-store", {
	reducer,

	actions,

	selectors,

	controls: {},

	resolvers: {},
});

register(store);
