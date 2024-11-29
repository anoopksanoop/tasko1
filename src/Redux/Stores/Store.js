import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../UserSlice";
// import ListReducer from "../Userdatas"
import UserdatasReducer from "../Userdatas";
import  PostReducer from "../Postslice"
import ProfileReducer from "../Profileslice"

const store =configureStore({
    reducer:{
        user:UserReducer,
        datas:UserdatasReducer,
        post:PostReducer,
        Profile:ProfileReducer
        // userlist:ListReducer,
    }
})

export default store;