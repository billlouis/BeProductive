import {USERS_ADD_TASKS, USERS_DONE_TASKS, CLEAR_TASKS_DATA } from "../constants"

const initialState = {
    tasklist: []
}

export const tasks = (state = initialState, action) => {
    console.log(action.type,"hello");
    switch (action.type) {//WANTED A ACTION WITH THE .posts as array
        case USERS_ADD_TASKS:
            return {
                ...state,
                //this part does not do sorting : it just add up everything
                tasklist: [...state.tasklist, ...action.posts]
            }
        case USERS_DONE_TASKS:
            return {
                ...state,
                // use maping to update done or undone tasks
                tasklist: state.tasklist.map(post => post.id === action.postId ? 
                    {...post, done: action.done} :
                    post)
            }
        case CLEAR_TASKS_DATA:
            return initialState
        default:
            return state;
    }
}