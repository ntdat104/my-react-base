import { applyMiddleware, combineReducers, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { authReducer, AuthState } from "./auth";

const rootReducer = combineReducers<GlobalState>({
  auth: authReducer,
});

// const rootEpic = combineEpics(categoryEpic, groupEpic);

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
// epicMiddleware.run(rootEpic);

export interface GlobalState {
  auth: AuthState;
}

export default store;
