import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '', password: '', age: 0 });
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

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
      let { data } = await axios.post(`https://route-movies-api.vercel.app/signup`, user);
      if (data.message === 'success') {
        navigate('/login')
        setLoading(false)
      } else {
        setLoading(false)
        setError(data.message)
      }
    }
  }

  // function getSpecialError() {
  //   let errorIndex = error.indexOf('email:')
  //   let resultError = error.slice(errorIndex,)
  //   return resultError
  // }
  // let finalError = getSpecialError()



  function validationInputs() {
    let schema = Joi.object({
      first_name: Joi.string().min(2).max(10).required(),
      last_name: Joi.string().min(2).max(10).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      age: Joi.number().min(18).max(80).required()
    });
    return schema.validate(user, { abortEarly: false });
  }



  return (
    <>
      <div className='col-md-7 mx-auto'>
        <div className="bg-dark rounded p-5">
          <h1 className='mb-3'>Register</h1>
          <form onSubmit={sendData}>
            {error && <div className='alert alert-danger'>{error}</div>}
            {errorList.map((error, index) => <div key={index} className='alert alert-danger p-2'>{error.message}</div>)}
            <div className="input-groub my-2">
              <input type="text" onChange={getUser} className='form-control' placeholder='Enter your First name' name='first_name' />
            </div>
            <div className="input-groub my-2">
              <input type="text" onChange={getUser} className='form-control' placeholder='Enter your Last name' name='last_name' />
            </div>
            <div className="input-groub my-2">
              <input type="text" onChange={getUser} className='form-control' placeholder='Enter your Email' name='email' />
            </div>
            <div className="input-groub my-2">
              <input type="password" onChange={getUser} className='form-control' placeholder='Enter your Password' name='password' />
            </div>
            <div className="input-groub my-2">
              <input type="number" onChange={getUser} className='form-control' placeholder='Enter your Age' name='age' />
            </div>
            <button type='submit' className='btn btn-danger my-2 w-100'>
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
