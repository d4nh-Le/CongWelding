import React from 'react';
import "./home.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart_a from '../../components/chart/Chart_a';
import Chart_b from '../../components/chart/Chart_b';
import MyTable from '../../components/table/MyTable';

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      
      <div className='container'>
        <Navbar />
        
        <div className='twoElements'>
          <div className="leftE">
          <div className='widgets'>
          <Widget type="user"/>
          <Widget type="order"/>
          <Widget type="earning"/>
        </div>
        <div className='charts'>
          
          <Chart_a />
          <Featured /><br></br>
          </div>
          <div className="listContainer">
          <div className="listTitle">Latest transaction</div>
          <div className="linkToOrder">see All</div>
          <MyTable />
        </div>
        </div>
        <div className="rightE"><Chart_b /></div>
        
        </div>
      </div>
     
    </div>
  )
}

export default Home