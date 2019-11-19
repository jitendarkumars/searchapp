import React ,{useState} from 'react'

function Input(props) {
    
    return (
        <div className="input-group input-group-icon">
        <input name={props.name}  ref={props.refs}type={props.type} placeholder={props.placeholder} />
        <div className="input-icon"><i className={props.iconClassName}></i></div>
      </div>
    )
}

export default Input

