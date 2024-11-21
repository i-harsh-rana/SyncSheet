import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authStore.js";
import notificationReducer from "./notificationSlice.js"

const authPersistConfig = {
    key: 'auth',
    storage,
};

const notificationPersistConfig = {
    key: 'notifications',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedNotificationReducer = persistReducer(notificationPersistConfig, notificationReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        notifications: persistedNotificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});

export const persistor = persistStore(store);

export default store;