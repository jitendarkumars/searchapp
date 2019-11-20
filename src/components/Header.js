import React from 'react'
import {Link} from 'react-router-dom'

function Header(props) {
            console.log(props)
            props.hideLoader();
        return (
            <nav className="navbar navbar-expand-lg fixed-top  " color-on-scroll="300" >
                <div className="container header-container">
                    <a className="navbar-brand" rel="tooltip" title="Login And Signup" data-placement="bottom" >
                        Hacker News  {localStorage.getItem('userName')?(<span>({localStorage.getItem('userName')})</span>):''}

                </a> 
                { props.location.pathname==='/dashboard'?
                <div className="SearchHeader SearchHeader_container">
                    <span className="SearchIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65">
                                </line>
                                </svg>
                                </span>
                                <input type="search" value={props.searchQueryValue} onChange={props.inputChange} placeholder="Search stories by title, url or author" className="SearchInput" />
                                    <div className="PoweredBy">
                                     </div>
                </div> :''
                }
                    <div className="collapse navbar-collapse justify-content-end" >
                    {!localStorage.getItem('userName')? (  
                        <ul className="navbar-nav">
                       
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">SignUp</Link>
                            </li>
                            </ul>
                        ):(
                            <ul className="navbar-nav">
                                 <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/history" className="nav-link">History</Link>
                            </li>
                            <li className="nav-item">
                          <Link to="/"  onClick={()=>{localStorage.clear();}}className="nav-link">Logout</Link>
                            </li>
                        </ul>)
                    }  </div>
                </div>

                    </nav>
                    )
                
}

export default Header

