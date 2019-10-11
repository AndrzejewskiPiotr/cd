import { combineReducers } from 'redux'

const initialState:any = {count: false};

function reducer(state = initialState , action: any) {
    switch (action.type) {
        case 'increment':
            return {count: true};
        case 'decrement':
            return {count: false};
        default:
            return state
    }
}


export default combineReducers({
    reducer,
})
