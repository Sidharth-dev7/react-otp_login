import React from 'react'
import { useState } from 'react'
import OtpInput from './OtpInput';

function PhoneOtpLogin() {
    const [phoneNumber,setPhoneNumber]=useState("");
    const [showOtpInput, setshowOtpInput] = useState(false)


    const handlePhoneNumber=(event)=>
    {
        setPhoneNumber(event.target.value);
    }
    const handlePhoneSubmit=(event)=>
    {
        event.preventDefault();
        //phone validations to enter number only
        const regex=/[^0-9]/g;
        if(phoneNumber.length<10||regex.test(phoneNumber))  
            {
                alert("invalid phone number")
                return;
            }      
            
        //backend process to check if correct value is entered
        //show OTP slots
            setshowOtpInput(true)
    };

    const onOtpSubmit =(otp)=>{

        console.log("Login successful",otp)
    }

  return (
    <div>
       {!showOtpInput? <form onSubmit={handlePhoneSubmit}>
            <input type='text' value={phoneNumber} onChange={handlePhoneNumber} placeholder='Enter phone number'/>
            <button type="submit">Submit</button>
        </form>:<div>
                    <p>Enter OTP sent to {phoneNumber}</p>

                    <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>

                </div>}
    </div>
  )
}

export default PhoneOtpLogin