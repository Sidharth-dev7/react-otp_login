import React, { useRef } from 'react'
import { useState,useEffect } from 'react';
function OtpInput({length=4,onOtpSubmit=()=>{}}) {

    const [otp, setotp] = useState(new Array(4).fill(""));
    const inputRefs=useRef([])

    //to make the cursor go to first slot of otp section
    useEffect(() => {
      if(inputRefs.current[0])
      {
        inputRefs.current[0].focus();
      }
      
    }, [])
    

    

    const handleChange=(index,e)=>{
        const value=e.target.value;
        if(isNaN(value)) return;
        const newOtp=[...otp];
        //allow only one input
        newOtp[index]=value.substring(value.length-1); //we use a new variable"newOtp" instead of setOtp is because setOtp is asynchronous
        setotp(newOtp);

        //trigger for after completion of entering otp 
        const combinedOtp=newOtp.join("");
        if(combinedOtp.length===length)
            {   
            
               onOtpSubmit(combinedOtp);}

        //inorder to move to next input

        if(value && index<length-1 && inputRefs.current[index+1])
        {
          inputRefs.current[index+1].focus();
        }
    
    }   

    const handleClick=(index)=>{
      inputRefs.current[index].setSelectionRange(1,1)
    }


    const handleKeyDown=(index,e)=>{
      //for clearing backwards as we press backspace

      if(e.key==="Backspace" && !otp[index] && index>0)
      {
        inputRefs.current[index-1].focus()
      }
    }


  return (
    <div>
        {
            otp.map((value,index)=>{
                return <input key={index} type='text' ref={(input)=>(inputRefs.current[index]=input)} value={value}
                onChange={(e)=>handleChange(index,e)}
                onClick={()=>handleClick(index)}
                onKeyDown={(e)=>handleKeyDown(index,e)}
                className='otpInput' />
            })
        }
    </div>
  )
}

export default OtpInput