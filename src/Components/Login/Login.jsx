import axios from 'axios';
import Joi from 'joi';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../AuthContext';


export default function Login() {

  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { getUserData } = useContext(UserContext)

  function getUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function sendData(e) {
    e.preventDefault();
    setLoading(true)
    let validationResult = validationInputs();
    if (validationResult.error) {
      setLoading(false)
      setErrorList(validationResult.error.details);
    } else {
      let { data } = await axios.post(`https://route-movies-api.vercel.app/signin`, user);
      if (data.message === 'success') {
        localStorage.setItem('userData', data.token);
        navigate('/')
        getUserData();
        setLoading(false);
      } else {
        setLoading(false)
        setError(data.message)
      }
    }
  }




  function validationInputs() {
    let schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className='col-md-7 mx-auto'>
        <div className="bg-dark rounded p-5">
          <h1 className='mb-3'>Login</h1>
          <form onSubmit={sendData}>
            {error && <div className='alert alert-danger'>{error}</div>}
            {errorList.map((error, index) => <div key={index} className='alert alert-danger p-2'>{error.message}</div>)}
            <div className="input-groub my-2">
              <input type="text" onChange={getUser} className='form-control' placeholder='Enter your Email' name='email' />
            </div>
            <div className="input-groub my-2">
              <input type="password" onChange={getUser} className='form-control' placeholder='Enter your Password' name='password' />
            </div>
            <button type='submit' className='btn btn-danger my-2 w-100'>
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
