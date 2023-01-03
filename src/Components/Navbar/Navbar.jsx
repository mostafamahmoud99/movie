import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../AuthContext'



export default function Navbar() {
    const { loginUser, logOut } = useContext(UserContext)
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">Movie</NavLink>
                    <button className="navbar-toggler border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon d-flex justify-content-center align-items-center text-white">
                        <i className="fa-solid fa-bars"></i>
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {loginUser ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/movies">Movies</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/tv">Tv</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/person">Person</NavLink>
                            </li>
                        </ul> : ''}
                        
                        <div className="d-flex">

                            <ul className='navbar-nav'>
                                {loginUser ? <li onClick={logOut} className="nav-item logout">
                                    Logout
                                </li> :
                                    <div className='navbar-nav'>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/register">Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">Login</NavLink>
                                        </li>
                                    </div>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                {loginUser ? <h6 className='mx-auto my-2'>{loginUser.first_name} {loginUser.last_name}</h6> : ''}
            </nav>
        </>
    )
}



