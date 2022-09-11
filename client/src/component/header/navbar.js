import React from 'react'
import './navbar.css'
import Rightheader from './Rightheader'
//img import
import logo from '../../img/header/amazon_PNG25.png';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import {NavLink} from 'react-router-dom';
import { Logincontext } from "../context/Contextprovider";
import{ useContext,useEffect,useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Drawer,List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Navbar() {

  const {products} = useSelector(state=>state.getproductsdata)
  
   const { account, setAccount } = useContext(Logincontext);
   const navigate = useNavigate();
  

  
  const getvaliduser = async () => {
    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
        alert("user not valid")
    } else {
        // console.log("ind mila hain");
        setAccount(data);
    }
};






useEffect(() => {
  getvaliduser()
}, []);

const [dropen, setDropen] = useState(false);

const handelopen = () => {
  setDropen(true);
}
const handleClosed = () => {
  setDropen(false)
}

const logout = async () => {
  const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      credentials: "include"
  });

  const data2 = await res2.json();
  

  if (res2.status !== 201) {
      alert("log out not exit")
  } else {
      console.log(data2)
   
    toast.success("user Logout 😃!", {
        position: "top-center"
    });
    navigate('/')
    setAccount(false)
    
  }
};
const close = () => {
  logout()
  handleClosed()
}
const [text, setText] = useState();
const [liopen, setLiopen] = useState(true);

const getText = (text) => {
  setText(text)
  setLiopen(false)
  
}

// profile menu style
const [anchorEl, setAnchorEl] =useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
  return (
    <header>
      <nav>
        <div className='left'>
            <IconButton className="hamburgur" onClick={handelopen}>
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>

            {/* here define the right header */}
            <Drawer open={dropen} onClose={handleClosed}>
              <Rightheader logclose={handleClosed} logout={logout}/>
          </Drawer>


          <div className='navlogo'>
            <NavLink to="/"><img src={logo} alt='logo img' /></NavLink>
          </div>
          <div className='nav_searchbaar'>
            <input type='text' name='' id=''
              placeholder='serch your item'
              onChange={(e) => getText(e.target.value)}
              
            />
              <div className="search_icon">
                <i className="fas fa-search" id="search"></i>
                <SearchIcon />
             </div>
              {
                text &&
                <List className="extrasearch" hidden={liopen}>
                    {
                        products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                            <ListItem>
                                <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                    {product.title.longTitle}
                                </NavLink>
                            </ListItem>
                        ))
                    }
                </List>
              }
          </div>
        </div>
        <div className='right'>
            {account?<div className='nav_btn'>
            <NavLink to='/' onClick={logout}>logout</NavLink>
            </div>:<div className='nav_btn'>
              <NavLink to='/login'>signin</NavLink>
            </div>
            }
        {account ? <NavLink to="/buynow">
            <div className="cart_btn">
            <IconButton aria-label="cart">
                  <StyledBadge badgeContent={account.carts.length} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
              </IconButton>

                
            </div>
        </NavLink> : <NavLink to="/login">
            <div className="cart_btn">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={0} color="secondary">
                    <ShoppingCartIcon style={{ color: "#fff" }} />
                  </StyledBadge>
              </IconButton>
              
            </div>
        </NavLink>
          }
             
          {
                account ?
                    <Avatar className="avtar2"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> :
                    <Avatar className="avtar"
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    />
            }

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {account ? <MenuItem  style={{ margin: 10 }} onClick={close}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />   Logout</MenuItem> : ""}
        
      </Menu>
      <ToastContainer />
        </div>

      </nav>
    </header>
  )
}

export default Navbar