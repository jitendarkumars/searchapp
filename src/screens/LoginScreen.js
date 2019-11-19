import React from 'react'
import Input from '../components/Input'
import useForm from 'react-hook-form'
import {toast} from 'react-toastify';
function LoginScreen(props) {
    const { register, handleSubmit, watch, errors } = useForm({ submitFocusError:true})
    const onSubmit = data => { toast("fsdfsd");
    toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER
      });
 
      toast.error("Error Notification !", {
        position: toast.POSITION.TOP_LEFT
      });
 
    console.log(data) }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row">
            <h4>Login with UserName/Email</h4>        
            <Input  refs={register({ required: true, minlength: 5 })} name="userNameEmail"   type="text" placeholder="UserName/Email" iconClassName="fa fa-envelope" />
            {/* {errors.userNameEmail? <span className="invalid">{errors.required}</span>:''} */}
            {errors.userNameEmail? <span className="invalid"> UserName/Email is required</span>:''}
         
            <Input  refs={register({ required:true, minlength: 8 })} name="password"   type="password" placeholder="Password" iconClassName="fa fa-key" />
            {/* {(errors.password  &&errors.password.type=="required"&& <span className="invalid">This field is required</span> ) } */}
            {errors.password? <span className="invalid">Password is Required</span>:''}
            <button className="btn btn-block btn-round" 
            type="submit" 
            >Login</button>
          </div>
      </div>
          </form>
    )
}

export default LoginScreen

