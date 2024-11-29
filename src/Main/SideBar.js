import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
 import {fetchdata} from "../Redux/Userdatas";
 import { selectUser } from "../Redux/UserSlice";
 import { footContext } from "../Context";
  import { useContext } from "react";
  import "./SideBar.css"
const SideBar = () => {
  const {socket} = useContext(footContext);
  const user = useSelector(selectUser);
  const dispatch=useDispatch()
  const DataList = useSelector((state) => {
    // Filter out the logged-in user's ID from the data list
    const filteredData = state.datas.data.filter((item) => item.id !== user.id);
    return { ...state.datas, data: filteredData };
  });
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(()=>{
    dispatch(fetchdata())
    // fetchdata (DataList)
  },[]);

 
  const handleRoomCreation = (userId) => {
    if (selectedUser === userId) {
      // If the same user is selected, do nothing or display a message.
      alert("You've already selected this user");
    } else {
      // If a different user is selected, create a room.
      setSelectedUser(userId);
      // Implement the room creation logic here, e.g., navigate to the chat room with the selected user.
      // You can use the selected user's ID to create a unique room.
      // const room = `room_${Math.min(userId, user.id)}_${Math.max(userId, user.id)}`;
      // socket.emit('join_room', room, user.id);
      // console.log(room,"room")
    }
    
 
  };
  // debugger

  return (
    
    <div className="col-lg-4 col-xxl-3" id="chatTabs" role="tablist">
      <div className="d-flex align-items-center mb-4 d-lg-none">
        <button
          className="border-0 bg-transparent"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="btn btn-primary">
            <i className="fa-solid fa-sliders-h"></i>
          </span>
          <span className="h6 mb-0 fw-bold d-lg-none ms-2">Chats</span>
        </button>
      </div>

      <div className="card card-body border-end-0 border-bottom-0 rounded-bottom-0">
        <div className=" d-flex justify-content-between align-items-center">
          <h1 className="h5 mb-0">
            Active chats{" "}
            <span className="badge bg-success bg-opacity-10 text-success">
              6
            </span>
          </h1>

          <div className="dropend position-relative">
            <div className="nav">
              <a
                className="icon-md rounded-circle btn btn-sm btn-primary-soft nav-link toast-btn"
                data-target="chatToast"
                href="h"
              >
                {" "}
                <i className="bi bi-pencil-square"></i>{" "}
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-light navbar-expand-lg mx-0">
        <div
          className="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasNavbar"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset ms-auto"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body p-0">
            <div className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0 ">
              <form className="position-relative">
                <input
                  className="form-control py-2"
                  type="search"
                  placeholder="Search for chats"
                  aria-label="Search"
                />
                <button
                  className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                  type="submit"
                >
                  <i className="bi bi-search fs-5"></i>
                </button>
              </form>

              <div className="mt-4 h-100">
                <div className="chat-tab-list custom-scrollbar">
                  <ul className="nav flex-column nav-pills nav-pills-soft">

                    {/* maping */}
                 {DataList.data.map((item) => (
                      <li data-bs-dismiss="offcanvas" key={item.id} >
                       
                        <Link
                        onClick={() => handleRoomCreation(item.id)}
                          to={`/chatBox/${item.id}`}
                          className="nav-link active text-start"
                          id={`chat-${item.id}-tab`}
                          data-bs-toggle="pill"
                          role="tab"
                        >
                          <div className="d-flex">
                            <div className="flex-shrink-0 avatar avatar-story me-2 status-online">
                              <img
                                className="avatar-img rounded-circle"
                                src={`http://localhost:3001/${item.image}`}
                                alt=""
                                onClick={() => handleRoomCreation(item.id)}
                              />
                            </div>
                            <div className="flex-grow-1 d-block">
                              <h6 className="mb-0 mt-1">{item.name}</h6>
                              <div className="small text-secondary">
                                Frances sent a photo.
                              </div>
                            </div>
                          </div>
                        </Link>
                   
                      </li>
                    ))}
           
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
   
  );
};

export default SideBar;
