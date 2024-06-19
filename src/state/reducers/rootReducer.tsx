'use client'

import { combineReducers } from '@reduxjs/toolkit';
import loginCheck from './loginCheck';
import matchingStatusModal from './matchingStatusModal';
import modeCheck from './modeCheck';

const rootReducer = combineReducers({
  loginCheck,
  matchingStatusModal,
  modeCheck,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
