



import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchdata=createAsyncThunk("fetchData",async()=>{
    const response=await axios.get("http://localhost:3001/router/getuserdata");
    return response.data;
})

const userdatas= createSlice({
    name:"datas",
    initialState:{
        isloading:false,
        data:[],
        error:false,

    },
    extraReducers:(builder)=>{
        // builder.addCase(fetchdata.pending,(state,action)=>{
        //     state.isloading=true;
        // })
        builder.addCase(fetchdata.fulfilled,(state,action)=>{
            state.isloading=false;
            state.data=action.payload;
        })
        builder.addCase(fetchdata.rejected,(state,action)=>{
            state.error=true;
        })
    }
})
 export const selectListedUser = (state) => state.datas.value;
export default  userdatas.reducer