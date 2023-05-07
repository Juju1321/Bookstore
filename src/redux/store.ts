import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import postReducer from "./reducers/postSlice";
import cartReducer from "./reducers/cartSlice";
import userReducer from "./reducers/userSlice";
import rootSaga from "src/redux/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  posts: postReducer,
  cart: cartReducer,
  user: userReducer,
});

const persostConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persostConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export let persistor = persistStore(store);

export default store;
