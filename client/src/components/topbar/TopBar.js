import React, { useContext } from 'react';
import './topbar.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

function TopBar() {
  const { user , dispatch } = useContext(Context);
  const PF = `${process.env.REACT_APP_BASE_URL_BACKEND}/images/`
  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className=" topIcon fab fa-facebook"></i>
        <i className=" topIcon fab fa-twitter"></i>
        <i className=" topIcon fab fa-pinterest"></i>
        <i className=" topIcon fa-brands fa-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className='link' to="/">HOME</Link>
          </li>
          <li className="topListItem">
            <Link className='link' to="/">ABOUT</Link>
          </li>
          <li className="topListItem">
            <Link className='link' to='/'>CONTACT</Link>
          </li>
          <li className="topListItem">
            <Link className='link' to='/write'>WRITE</Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ?(
            <Link to="/settings">
              <img
                 className='topImg'
                 src={PF+user.profilePic} 
                 alt="" 
                />
             </Link>
          ):(
            <ul className='topList'>
              <li className='topListItem'>
                <Link className='link' to="/login">
                 LOGIN
                </Link>
              </li>
              <li className='topListItem'>
                <Link className='link' to="/register">
                REGISTER
                </Link>
              </li>
            </ul>
          )
        }
        
        <i className=" topSearchIcon fa-solid fa-magnifying-glass"></i>
        
      </div>
    </div>
  );
}

export default TopBar;
  