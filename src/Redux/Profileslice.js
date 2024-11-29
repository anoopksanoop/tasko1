import { createSlice } from "@reduxjs/toolkit";

const userStringProfile = sessionStorage.getItem('user');
let Profile = {};
if(userStringProfile){
  const userParsed = JSON.parse(userStringProfile);
  if(userParsed && userParsed.id){
    Profile = userParsed;
  }
}
export const ProfileSlice = createSlice({
    name: "Profile",
    initialState: {
      value: Profile,
    },
    reducers: {
        addProfile: (state, action) => {
          const Profile = {
            
            ...state.value,
            ...(action.payload),
            isLoggedIn: true 
          }
          state.value = Profile;
          sessionStorage.setItem('Profile', JSON.stringify(Profile))
        }
         
    },
  });
  
  export const { addProfile } = ProfileSlice.actions;
  
  export const selectProfile = (state) => state.Profile.value;
  
  export default ProfileSlice.reducer;