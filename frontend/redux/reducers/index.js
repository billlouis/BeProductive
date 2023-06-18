import { combineReducers } from "redux"
import {user} from './user'
import { users } from "./users"
import { tasks } from "./tasks_reducer"

const Reducers = combineReducers({
    userState: user,
    usersState: users,
    tasksState: tasks,
})

export default Reducers