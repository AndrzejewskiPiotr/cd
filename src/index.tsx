/**
 * @class SlideWorkBench
 */
import React from 'react'
import  Slide  from "./Viewer";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/form-reducer'
const store = createStore(rootReducer);



const SlideWorkBench = ({ id, className }: { id: string; className?: string }) =>
  <Provider store={store}>
    <Slide id={id} className={className}/>
  </Provider>;

export default SlideWorkBench;
