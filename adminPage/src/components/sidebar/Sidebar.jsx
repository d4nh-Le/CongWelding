import React from 'react'
import "./sidebar.scss";
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
const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='top'>
        <span className='logo'> Cong welding Admin</span>
        </div>
        <hr />
        <div className='center'>
            <ul>
                <li>
                    <GridViewRoundedIcon className='icon' />
                    <span className='option'>Dashboard </span>
                </li>
                <p className='title'> List</p>
                <li>
                    
                <Inventory2OutlinedIcon className='icon' />
                    <span className='option'>Product </span>
                </li>
                <li>
                <PeopleOutlinedIcon className='icon' />
                    <span className='option'>User </span>
                </li>
            
                <li>
                <ReceiptSharpIcon className='icon' />
                    <span className='option'>orders </span>
                </li>
                <p className='title'> service</p>
                <li>
                <NotificationsActiveSharpIcon className='icon' />
                    <span className='option'>Notifications </span>
                </li>
                <li>
                <AssessmentSharpIcon className='icon' />
                    <span className='option'>report </span>
                </li>
                <p className='title'> System</p>
                <li>
                <SettingsApplicationsSharpIcon className='icon' />
                    <span className='option'>Setting </span>
                </li>
                <li>
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

export default sidebar