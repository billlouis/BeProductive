import { combineReducers } from "redux"
import {user} from './user'
import { users } from "./users"
import { tasks } from "./tasks_reducer"
import {notifr} from "./notif_reducers"
const Reducers = combineReducers({
    userState: user,
    usersState: users,
    tasksState: tasks,
    notifState: notifr,
})

export default Reducers