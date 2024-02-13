import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/Todoslice';

export const store = configureStore({
    reducer: todoReducer
})
