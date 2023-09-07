import { CHATALL_ERR, CHATALL_SUCC, CHATALL_LOADING } from "./Actions";


export const reducer1 = (state = { data: [], loading: false }, action: any) => {
    switch(action.type){
        case CHATALL_SUCC:
            return { ...state, data: action.data.reverse(), loading: false }
        case CHATALL_LOADING: 
            return { ...state, loading: true }
        case CHATALL_ERR:
            return { ...state, data: state.data, loading: false }
        default:
            return state
    }
}