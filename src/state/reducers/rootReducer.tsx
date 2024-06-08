'use client'

import { combineReducers } from '@reduxjs/toolkit';
import authenticationCheck from './authenticationCheck';

const rootReducer = combineReducers({
  authenticationCheck,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
