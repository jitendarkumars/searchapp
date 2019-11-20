import React, { useEffect }  from 'react'
import Input from '../components/Input'
import useForm from 'react-hook-form'
import {toast} from 'react-toastify';
import { useHistory } from 'react-router/esm/react-router';
function LoginScreen(props) {
  let history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('userName')){
      history.push('/dashboard');
    }
  }, )
    const { register, handleSubmit, watch, errors } = useForm({ submitFocusError:true})
    const onSubmit = async(data) => {       
      const responseData=await fetch(`http://localhost:8080/api/users/login?userNameOrMail=${data.userNameEmail}&password=${data.password}`)
        console.log(responseData.status)
      if(responseData.status!=200){
        let jsonData =await responseData.json()
        toast.error(jsonData.error, {
          position: toast.POSITION.TOP_CENTER
        });
      }else{
     let jsonData= await responseData.json()
        localStorage.setItem("userName",jsonData.data.userName);
        toast.success("Logged In Successfully", {
          position: toast.POSITION.TOP_CENTER
        });
      }
   
 
   

 
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

