import React, { useEffect } from 'react'
import Input from '../components/Input';
import useForm from 'react-hook-form'
import { useHistory } from 'react-router/esm/react-router';

import {toast} from 'react-toastify';
export default function SignupScreen(props) {
    const { register, handleSubmit, watch, errors } = useForm({ submitFocusError: true })
   
    let history = useHistory();
    useEffect(() => {
      if(localStorage.getItem('userName')){
        history.push('/dashboard');
      }
    }, )
    const onSubmit = async(data) => {       
        const responseData=await fetch(` https://search-app-node.herokuapp.com/api/users/signup`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
          console.log(responseData.status)
        if(responseData.status!=200){
          let jsonData =await responseData.json()
          toast.error(jsonData.error, {
            position: toast.POSITION.TOP_CENTER
          });
        }else{
       let jsonData=   await responseData.json()
          localStorage.setItem("userName",jsonData.data.userName);
          toast.success("Logged In Successfully", {
            position: toast.POSITION.TOP_CENTER
          });
        }
     }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
                <div className="row">
                    <h4>Enter Your Details</h4>
                    <Input refs={register({ required: true, minlength: 5 })} name="userName" type="text" placeholder="UserName" iconClassName="fa fa-user" />
                    {errors.userName ? <span className="invalid"> UserName is required</span> : ''}
                    <Input refs={register({ required: true, minlength: 5 })} name="email" type="text" placeholder="Email" iconClassName="fa fa-envelope" />
                    {errors.email ? <span className="invalid"> Email is required</span> : ''}
                    <Input refs={register({ required: true, minlength: 8 })} name="password" type="password" placeholder="Password" iconClassName="fa fa-key" />
                    {errors.password ? <span className="invalid">Password is Required</span> : ''}
                    <button className="btn  btn-block btn-round"
                        type="submit"
                    >Signup</button>
                </div>
            </div>
        </form>
    )

}
