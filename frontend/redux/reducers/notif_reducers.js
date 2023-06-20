import {NOTIF_ADD, CLEAR_NOTIF } from "../constants"

const initialState = {
    notifList: []
}

export const notifr = (state = initialState, action) => {
    //console.log(action.type,"action reducers");
    switch (action.type) {//WANTED A ACTION WITH THE .posts as array
        case NOTIF_ADD:
            return {
                ...state,
                //this part does not do sorting : it just add up everything
                notifList: [...state.notifList, ...action.notif]
            }
        case CLEAR_NOTIF:
            return initialState
        default:
            return state;
    }
}