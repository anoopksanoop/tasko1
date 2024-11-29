import { createSlice } from "@reduxjs/toolkit";

const userStringPost = sessionStorage.getItem('user');
let post = {};
if(userStringPost){
  const userParsed = JSON.parse(userStringPost);
  if(userParsed && userParsed.id){
    post = userParsed;
  }
}
export const PostSlice = createSlice({
    name: "post",
    initialState: {
      value: post,
    },
    reducers: {
        addPost: (state, action) => {
          const post = {
            
            ...state.value,
            ...(action.payload),
            isLoggedIn: true 
          }
          state.value = post;
          sessionStorage.setItem('user', JSON.stringify(post))
        }
         
    },
  });
  
  export const { addPost } = PostSlice.actions;
  
  export const selectPost = (state) => state.post.value;
  
  export default PostSlice.reducer;