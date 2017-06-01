import { combineReducers } from 'redux';
import createStore from 'phenomic/lib/redux/createStore';
// eslint-disable-next-line import/no-namespace
import * as phenomicReducers from 'phenomic/lib/redux/modules';

import {window} from './metadata';

const store = createStore(
  // @ts-ignore
  combineReducers(phenomicReducers),
  // @ts-ignore
  { ...(typeof window !== 'undefined') && window.__INITIAL_STATE__ }
);

export default store;
