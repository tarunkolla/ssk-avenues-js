import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //redux chrome extention req
  )
);

export default store;
