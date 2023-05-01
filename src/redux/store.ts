import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import postReducer from "./reducers/postSlice";
import cartReducer from "./reducers/cartSlice";
import userReducer from "./reducers/userSlice";
import rootSaga from "src/redux/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    posts: postReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;

export default store;
