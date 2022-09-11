import React from 'react'
import{useContext } from 'react'
import { Logincontext } from "../context/Contextprovider";


function Optional({deletedata,get}) {

  const { account,setAccount } = useContext(Logincontext);

  const removedata = async (id) => {
    const res = await fetch(`/remove/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();


    if (res.status === 400 || !data) {
      alert("error kaise")
    } else {

      
      console.log("data delelte kaise",data);
      setAccount(data)
      get()
      
    }
  };


  return (
    <div className='add_remove_select'>
        <select>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>
        <p style={{cursor:'pointer'}}onClick={()=>removedata(deletedata)}>Delete</p> <span>|</span>
        <p className='forremovemedia'>Save or Later</p><span>|</span>
        <p className='forremovemedia'>See more like this</p>
    </div>
  )
}

export default Optional