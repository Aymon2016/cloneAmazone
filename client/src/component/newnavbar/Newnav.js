import React from 'react'
import './Newnav.css'
import navimg from '../../img/header/navimg.jpg'






function Newnav({data}) {
  
  return (
    <div className='new_nav'>
        <div className='nav_data'>
        <div className='left_data'>
        
         
            <p>All</p>
            <p>Mobile</p>
            <p>Bestseller</p>
            <p>Fashion</p>
            <p>Customer Services</p>
            <p>Electronics</p>
            <p>Prime</p>
            <p>Today's Deal</p>
            <p>Amazon Pay</p>
           
        </div>
        <div className='right_data'>
            <img src={navimg} alt='navimg' />
        </div>
        </div>
    </div>
  )
}

export default Newnav