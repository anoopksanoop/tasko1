import "../css/all.min.css";
import "../css/bootstrap-icons.css";
import "../css/OverlayScrollbars.min.css";
import "../css/style.css";
import logo from "../images/logo.svg";
import logo1 from "../images/07.jpg";
import logo2 from "../images/02.jpg";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/UserSlice";
import { logout } from "../Redux/UserSlice";
import { useDispatch } from "react-redux";
import { footContext } from "../Context";
import { useContext, useState } from "react";
import { Navigate  } from 'react-router-dom'
import "./Header.css";

function Header() {
  const navigte = new useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const data = useContext(footContext);
  const { Search, setSearch } = data;
  const location = useLocation();
  // debugger 
  //console.log(user.email)
  // debugger
  const handleLogout = () => {
    dispatch(logout());
    // Clear user data from session storage
    sessionStorage.removeItem("user");
    navigte("/login");
  };

  if(location.pathname.includes(['/login', '/sign-up'])){
    if(!user || (user &&  user.id)){
       <Navigate  to='login'/> 
      }
  }


  function nav() {
    navigte("/ChatBox");
  }
  function navHome(id) {
    navigte(`/Home`);
  }



  const [isNavsaVisible, setNavsaVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);

  const handleClick = () => {
    setNavsaVisible(!isNavsaVisible);
    setButtonVisible(false);
  };

  const HandleClickbtn = () => {
    setNavsaVisible(!isNavsaVisible);
    setButtonVisible(true);
  };

  return (
    <div className="App">
      <header className="navbar-light fixed-top header-static bg-mode">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <div className="navbar-brand" href="">
              {" "}
              <img
                onClick={() => navHome()}
                className="light-mode-item navbar-brand-item"
                src={logo}
                alt="logo"
              />
              <img
                className="dark-mode-item navbar-brand-item"
                src={logo}
                alt="logo"
              />
            </div>

            {isButtonVisible && (
              <button
                onClick={handleClick}
                className="navbar-toggler ms-auto icon-md btn btn-light p-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-animation">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            )}

            {isNavsaVisible ? (
              <div>
                <ul
                  className="navbar-nav navbar-nav-scroll ms-auto d-flex flex-row "
                  style={{ gap: "1rem" }}
                >
                  <div className="offcanvas-header">
                    <button
                      onClick={HandleClickbtn}
                      type="button"
                      className="btn-close text-reset ms-auto"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>

                  <li className="nav-item " onClick={handleLogout}>
                    <a className="nav-link">Logout</a>
                  </li>

                  <Link to={"/"}>
                    <li className="nav-item ">
                      <a className="nav-link" href="my-profile">
                        SignIn
                      </a>
                    </li>
                  </Link>

                  <Link to={"/login"}>
                    <li className="nav-item">
                      <a className="nav-link" href="my-profile">
                        SignUp
                      </a>
                    </li>
                  </Link>
                </ul>

                <div className=" navbar-collapse" id="navbarCollapse">
                  <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
                    <div className="nav-item w-100">
                      <form className="rounded position-relative">
                        <input
                          className="form-control ps-5 bg-light"
                          type="search"
                          placeholder="Search..."
                          aria-label="Search"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                          className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                          type="submit"
                        >
                          <i className="bi bi-search fs-5"> </i>
                        </button>
                      </form>
                    </div>
                  </div>

                  <ul className="navbar-nav navbar-nav-scroll ms-auto">
                    <li className="nav-item dropdown">
                   
                      <a
                        className="nav-link dropdown-toggle"
                        // href=""
                        id="pagesMenu"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Pages
                      </a>
                    
                      <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                        <Link to={"/chatBox"}>
                          <li>
                            {" "}
                            <a className="dropdown-item" href="messaging.html">
                              Messaging
                            </a>
                          </li>
                        </Link>

                        <li className="dropdown-submenu dropend">
                        <Link to={"/profilepage"}>
                          <li>
                            {" "}
                            <a className="dropdown-item" href="">
                            Profile
                            </a>
                          </li>
                        </Link>

                          
                        </li>
                        <li>
                          {" "}
                          <a className="dropdown-item" href="events.html">
                            Events
                          </a>
                        </li>
{/* navigation for post deatils */}
                    
                        <li>
                        <Link to={`/Home/${user.id}`}>
                          {" "}
                          <a className="dropdown-item" >
                            Post details
                          </a>
                          </Link>
                        </li>
                      

                        <li>
                          {" "}
                          <a className="dropdown-item" href="">
                            Blog
                          </a>
                        </li>

                        <li className="dropdown-divider"></li>
                        
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="postMenu"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Account{" "}
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="postMenu">
                        <Link to={"/PostForm"}>
                          <li>
                            {" "}
                            <a
                              className="dropdown-item"
                              href="create-page.html"
                            >
                              Create a Post
                            </a>
                          </li>
                        </Link>

                        <li className="dropdown-submenu dropend">
                          <a
                            className="dropdown-item dropdown-toggle"
                            href="#!"
                          >
                            Help center
                          </a>
                          <ul className="dropdown-menu" data-bs-popper="none">
                            <li>
                              {" "}
                              <a
                                className="dropdown-item"
                                href="my-profile-connections.html"
                              >
                                +91 7306065728
                              </a>{" "}
                            </li>
                            <li>
                              {" "}
                              <a
                                className="dropdown-item"
                                href="https://github.com/anoopksanoop/SocialMedia"
                              >
                                GitHub
                              </a>{" "}
                            </li>
                          </ul>
                        </li>

                        <li className="dropdown-submenu dropstart">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Authentication
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-end"
                            data-bs-popper="none"
                          >
                            <li>
                              {" "}
                              <Link to={"/login"}>
                                <a className="dropdown-item" href="">
                                  Sign in
                                </a>{" "}
                              </Link>
                            </li>
                            <li>
                              {" "}
                              <Link to={"/"}>
                                <a className="dropdown-item" href="">
                                  Sing up
                                </a>{" "}
                              </Link>
                            </li>

                            <li>
                              {" "}
                              {/* <Link to={"/login"}> */}
                              <a
                                className="dropdown-item"
                                onClick={handleLogout}
                              >
                                logout
                              </a>{" "}
                              {/* </Link> */}
                            </li>
                            <li>
                              {" "}
                              <a
                                className="dropdown-item"
                                href="forgot-password.html"
                              >
                                Forgot password
                              </a>{" "}
                            </li>
                            <li className="dropdown-divider"></li>
                          </ul>
                        </li>
                        <li>
                          {" "}
                          <a className="dropdown-item" href="error-404.html">
                            Error 404
                          </a>{" "}
                        </li>

                       
                      </ul>
                    </li>

                   
                  </ul>
                </div>
              </div>
            ):(
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
                <div className="nav-item w-100">
                  <form className="rounded position-relative">
                    <input
                      className="form-control ps-5 bg-light"
                      type="search"
                      placeholder="Search..."
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                      type="submit"
                    >
                      <i className="bi bi-search fs-5"> </i>
                    </button>
                  </form>
                </div>
              </div>

              <ul className="navbar-nav navbar-nav-scroll ms-auto">
              {sessionStorage.user && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="pagesMenu"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pages
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                    <Link to={"/chatBox"}>
                      <li>
                        {" "}
                        <a className="dropdown-item" href="messaging.html">
                          Messaging
                        </a>
                      </li>
                    </Link>

                    <li className="dropdown-submenu dropend">
                        <Link to={"/profilepage"}>
                          <li>
                            {" "}
                            <a className="dropdown-item" href="">
                            Profile
                            </a>
                          </li>
                        </Link>

                          
                        </li>
                       
                    <li>
                    <Link to={`/Home/${user.id}`}>
                      {" "}
                      <a className="dropdown-item" href="">
                        Post details
                      </a>
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
               {sessionStorage.user && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="postMenu"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Account{" "}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="postMenu">
                    <Link to={"/PostForm"}>
                      <li>
                        {" "}
                        <a className="dropdown-item" href="create-page.html">
                          Create a Post
                        </a>
                      </li>
                    </Link>

                   
                    <li className="dropdown-submenu dropend">
                      <a className="dropdown-item dropdown-toggle" href="#!">
                        Help center
                      </a>
                      <ul className="dropdown-menu" data-bs-popper="none">
                        <li>
                          {" "}
                          <a
                            className="dropdown-item"
                            href="my-profile-connections.html"
                          >
                            +91 7306065728
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a
                            className="dropdown-item"
                            href="https://github.com/anoopksanoop/SocialMedia"
                          >
                            GitHub
                          </a>{" "}
                        </li>
                      </ul>
                    </li>

                    <li className="dropdown-submenu dropstart">
                      <a className="dropdown-item dropdown-toggle" href="#">
                        Authentication
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        data-bs-popper="none"
                      >
                        <li>
                          {" "}
                          <Link to={"/login"}>
                            <a className="dropdown-item" href="">
                              Sign in
                            </a>{" "}
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link to={"/"}>
                            <a className="dropdown-item" href="">
                              Sing up
                            </a>{" "}
                          </Link>
                        </li>

                        <li>
                          {" "}
                          {/* <Link to={"/login"}> */}
                          <a className="dropdown-item" onClick={handleLogout}>
                            logout
                          </a>{" "}
                          {/* </Link> */}
                        </li>
                        <li>
                          {" "}
                          <a
                            className="dropdown-item"
                            href="forgot-password.html"
                          >
                            Forgot password
                          </a>{" "}
                        </li>
                        <li className="dropdown-divider"></li>
                      </ul>
                    </li>
                    <Link to={'*'}>
                    <li>
                      {" "}
                      <a className="dropdown-item" href="">
                        Error 404
                      </a>{" "}
                    </li>
                    </Link>
                    <li>
                      {" "}
                      <a
                        className="dropdown-item"
                        href="privacy-and-terms.html"
                      >
                        Privacy &amp; terms
                      </a>{" "}
                    </li>
                  </ul>
                </li>
                 )}

                {sessionStorage.user ? (
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
                ):(
                  <Link to={"/login"}>
                  <li className="nav-item">
                  <a className="nav-link" href="">
                    Login
                  </a>
                </li>
                </Link>
                )}

<Link to={"/users"}>
                  <li className="nav-item">
                  <a className="nav-link" href="">
                    UserList
                  </a>
                </li>
                </Link>
              </ul>
            </div>
            )}
            <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
              {sessionStorage.user && (
                <li className="nav-item ms-2" onClick={nav}>
                  <div
                    className="nav-link bg-light icon-md btn btn-light p-0"
                    href=""
                  >
                    <i className="bi bi-chat-left-text-fill fs-6"> </i>
                  </div>
                </li>
              )}

              <li className="nav-item ms-2">
                <a
                  className="nav-link bg-light icon-md btn btn-light p-0"
                  href=""
                >
                  <i className="bi bi-gear-fill fs-6"> </i>
                </a>
              </li>
              <li className="nav-item dropdown ms-2">
                <a
                  className="nav-link bg-light icon-md btn btn-light p-0"
                  href=""
                  id="notifDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-auto-close="outside"
                >
                  <span className="badge-notif animation-blink"></span>
                  <i className="bi bi-bell-fill fs-6"> </i>
                </a>
                <div
                  className="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0"
                  aria-labelledby="notifDropdown"
                >
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h6 className="m-0">
                        Notifications{" "}
                        <span className="badge bg-danger bg-opacity-10 text-danger ms-2">
                          4 new
                        </span>
                      </h6>
                      <a className="small" href="#">
                        Clear all
                      </a>
                    </div>
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush list-unstyled p-2">
                        <li>
                          <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                            <div className="avatar text-center d-none d-sm-inline-block">
                              <img
                                className="avatar-img rounded-circle"
                                src={logo1}
                                alt=""
                              />
                            </div>
                            <div className="ms-sm-3">
                              <div className=" d-flex">
                                <p className="small mb-2">
                                  <b>Judy Nguyen</b> sent you a friend request.
                                </p>
                                <p className="small ms-3 text-nowrap">
                                  Just now
                                </p>
                              </div>
                              <div className="d-flex">
                                <button className="btn btn-sm py-1 btn-primary me-2">
                                  Accept{" "}
                                </button>
                                <button className="btn btn-sm py-1 btn-danger-soft">
                                  Delete{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3 position-relative">
                            <div className="avatar text-center d-none d-sm-inline-block">
                              <img
                                className="avatar-img rounded-circle"
                                src={logo2}
                                alt=""
                              />
                            </div>
                            <div className="ms-sm-3 d-flex">
                              <div>
                                <p className="small mb-2">
                                  Wish <b>Amanda Reed</b> a happy birthday (Nov
                                  12)
                                </p>
                                <button className="btn btn-sm btn-outline-light py-1 me-2">
                                  Say happy birthday 🎂
                                </button>
                              </div>
                              <p className="small ms-3">2min</p>
                            </div>
                          </div>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="list-group-item list-group-item-action rounded d-flex border-0 mb-1 p-3"
                          >
                            <div className="avatar text-center d-none d-sm-inline-block">
                              <div className="avatar-img rounded-circle bg-success">
                                <span className="text-white position-absolute top-50 start-50 translate-middle fw-bold">
                                  WB
                                </span>
                              </div>
                            </div>
                            <div className="ms-sm-3">
                              <div className="d-flex">
                                <p className="small mb-2">
                                  Webestica has 15 like and 1 new activity
                                </p>
                                <p className="small ms-3">1hr</p>
                              </div>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="list-group-item list-group-item-action rounded d-flex border-0 p-3 mb-1"
                          >
                            <div className="avatar text-center d-none d-sm-inline-block">
                              <img
                                className="avatar-img rounded-circle"
                                src="images/12.svg"
                                alt=""
                              />
                            </div>
                            <div className="ms-sm-3 d-flex">
                              <p className="small mb-2">
                                <b>Bootstrap in the news:</b> The search giant’s
                                parent company, Alphabet, just joined an
                                exclusive club of tech stocks.
                              </p>
                              <p className="small ms-3">4hr</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer text-center">
                      <a href="#" className="btn btn-sm btn-primary-soft">
                        See all incoming activity
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item ms-2 dropdown">
                {sessionStorage.user ? (
                  <a
                    className="nav-link btn icon-md p-0"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    data-bs-auto-close="outside"
                    data-bs-display="static"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* <img className="avatar-img rounded-2" src={`http://localhost:3001/${user.image}`} alt="" /> */}
                    <img
                      className="avatar-img rounded-2"
                      src={user.image}
                      alt=""
                    />
                  </a>
                ) : (
                  <h5 style={{ color: "white" }}>.</h5>
                )}
                <ul
                  className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
                  aria-labelledby="profileDropdown"
                >
                  <li className="px-3">
                    <div className="d-flex align-items-center position-relative">
                      <div className="avatar me-3">
                        <img
                          className="avatar-img rounded-circle"
                          src={logo1}
                          alt="avatar"
                        />
                      </div>
                      <div>
                        <a className="h6 stretched-link" href="#">
                          Lori Ferguson
                        </a>
                        <p className="small m-0">Web Developer</p>
                      </div>
                    </div>
                    <a
                      className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center"
                      href="my-profile.html"
                    >
                      View profile
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="settings.html">
                      <i className="bi bi-gear fa-fw me-2"></i>Settings &amp;
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://support.webestica.com/"
                      target="_blank"
                    >
                      <i className="fa-fw bi bi-life-preserver me-2"></i>Support
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="docs/index.html"
                      target="_blank"
                    >
                      <i className="fa-fw bi bi-card-text me-2"></i>
                      Documentation
                    </a>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <a
                      className="dropdown-item bg-danger-soft-hover"
                      href="sign-in-advance.html"
                    >
                      <i className="bi bi-power fa-fw me-2"></i>Sign Out
                    </a>
                  </li>
                  <li>
                    {" "}
                    <hr className="dropdown-divider"></hr>
                  </li>

                  <li>
                    <div className="modeswitch-item theme-icon-active d-flex justify-content-center gap-3 align-items-center p-2 pb-0">
                      <span>Mode:</span>
                      <button
                        type="button"
                        className="btn btn-modeswitch nav-link text-primary-hover mb-0 active"
                        data-bs-theme-value="light"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Light"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-sun fa-fw mode-switch"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
                          <use href="#"></use>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-modeswitch nav-link text-primary-hover mb-0"
                        data-bs-theme-value="dark"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Dark"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-moon-stars fa-fw mode-switch"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"></path>
                          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
                          <use href="#"></use>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-modeswitch nav-link text-primary-hover mb-0"
                        data-bs-theme-value="auto"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-circle-half fa-fw mode-switch"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
                          <use href="#"></use>
                        </svg>
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
