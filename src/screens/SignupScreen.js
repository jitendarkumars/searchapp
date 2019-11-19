import React from 'react'
import Input from '../components/Input';
import useForm from 'react-hook-form'
export default function SignupScreen(props) {
    const { register, handleSubmit, watch, errors } = useForm({ submitFocusError: true })
    const onSubmit = data => { console.log(data) }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
                <div className="row">
                    <h4>Login with UserName/Email</h4>
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
