import { Outlet,Navigate } from "react-router-dom"

const PrivateRouters = () => {
    let auth ={'token':false}
  return (

       auth.token ? <Outlet/> : Navigate('/login')

  )
}

export default PrivateRouters
