import React from 'react'
import "./sidebar.css";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptSharpIcon from '@mui/icons-material/ReceiptSharp';
import NotificationsActiveSharpIcon from '@mui/icons-material/NotificationsActiveSharp';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import ModeNightSharpIcon from '@mui/icons-material/ModeNightSharp';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
const Sidebar = () => {

    const {admin, setAdmin, sessionId, setSessionId } = useContext(AuthContext);
    function clearAuth() {
        setAdmin(null);
        setSessionId(null);
      }

    const handleLogout = async () => {
      try {
        const response = await fetch('/api/admin/logout', {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          clearAuth();
          alert('Logout successful');
          window.location.href = '/';
        } else {
          console.error('Logout failed:', response.statusText);
        }
      } catch (error) {
        console.error('Logout failed:', error.message);
      }
    };


  return (
    <div className='sidebar'>
        <div className='top'>
        <span className='logo'> Cong welding Admin</span>
        </div>
        <hr />
        <div className='center'>
            <ul>
                
            <Link to="/" className="link">
                <li>
                    <GridViewRoundedIcon className='icon' />
                    <span className='option'>Dashboard </span>
                </li>
                </Link>
                <p className='title'> List</p>
                <Link to="/products" className="link">
                <li>
                <Inventory2OutlinedIcon className='icon' />
                    <span className='option'>Product </span>
                </li>
                </Link>
                <Link to="/users" className="link">
                <li>
                <PeopleOutlinedIcon className='icon' />
                    <span className='option'>User </span>
                </li>
                </Link>
                <Link to="/orders" className="link">
                <li>
                <ReceiptSharpIcon className='icon' />
                    <span className='option'>orders </span>
                </li>
                </Link>
                <p className='title'> service</p>
                <Link to="/messages" className="link">
                <li>
                <NotificationsActiveSharpIcon className='icon' />
                    <span className='option'>Messages </span>
                </li>
                </Link>
                
                <p className='title'> System</p>
                <li>
                <SettingsApplicationsSharpIcon className='icon' />
                    <span className='option'>Setting </span>
                </li>
                
                <li onClick={handleLogout}>
                <ExitToAppSharpIcon className='icon' />
                    <span className='option'>Logout </span>
                </li>

            </ul>
        </div>
        <div className='bottom'>
        <ModeNightSharpIcon className='colorop'></ModeNightSharpIcon>
             <LightModeSharpIcon className='colorop'></LightModeSharpIcon>
        </div>
        </div>
  )
}

export default Sidebar