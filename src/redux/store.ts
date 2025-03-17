import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countrySlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterReducer from "./filterSlice";
import themeReducer from "./themeSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  countries: countryReducer,
  filter: filterReducer,
  theme: themeReducer,
});

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
