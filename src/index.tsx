/**
 * @class SlideWorkBench
 */
import React from 'react'
import  Slide  from "./Viewer";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/form-reducer'
const store = createStore(rootReducer);



const SlideWorkBench = (id : string) =>
  <Provider store={store}>
    <Slide id={id} />
  </Provider>;

export default SlideWorkBench;
