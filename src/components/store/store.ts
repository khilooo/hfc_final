import { configureStore } from '@reduxjs/toolkit'
import registerReducer from "./reducers/registerReducer.ts";


export const store = configureStore({
    reducer: {
        todos: registerReducer,
    }
})