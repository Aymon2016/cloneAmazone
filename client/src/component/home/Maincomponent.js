import React from 'react'
import { useEffect } from 'react'
import Banner from './banner'
import './Home.css'
import Slide from './Slide'
// import products from './product'
import {getProducts} from '../redux/action/action'
import {useDispatch,useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom'



function Maincomp (){
const {products} = useSelector(state=>state.getproductsdata)

//   console.log('products:',products)
const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])





  


  return (
    <div className='home_section'>
        <div className='banner_part'>
            <Banner></Banner>
        </div>
        <div className='slide_part'>
          <div className='left_slide'>
            
            <Slide title="Deals of the Days" products={products} />
          </div>
          <div className='right_slide'>
            <h4>Festive latest launches</h4>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
            <NavLink to="#">see more</NavLink>
           
          </div>
        
        </div>
        <Slide title="Today's Deal" products={products} />
        <div className='center_img'>
          <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt='img' />
        </div>
        <Slide title="Best Seller" products={products} />
        <Slide title="Upto 88% off"  products={products} />
    </div>
  )
}


export default Maincomp