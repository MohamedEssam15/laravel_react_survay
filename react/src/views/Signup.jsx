import { useState } from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordConfirmation,setPasswordConfirmation]=useState('');
    const [error,setError]=useState({__html: ''});
    const {setUserToken,setCurrentUser} = useStateContext();


   const onSubmit =(ev)=>{
    ev.preventDefault();
    setError({__html: ''});
    axiosClient.post('/signup',{
        name:fullName,
        email:email,
        password:password,
        password_confirmation:passwordConfirmation
    })
    .then(({data})=>{
        setUserToken(data.token);
        setCurrentUser(data.user);
    })
    .catch((error)=>{
     if(error.response){
      const FinalErrors=  Object.values(error.response.data.errors).reduce((accum,next)=>[...accum,...next],[]);
      console.log(FinalErrors);
      setError({__html: FinalErrors.join('<br/>')})
     }
     console.error(error);
    });
   }


    return (
      <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up
            </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          {error.__html && (<><div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
            </div><br/></>)}

            <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={fullName}
                    onChange={(ev)=>setFullName(ev.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(ev)=>setEmail(ev.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(ev)=>setPassword(ev.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password-confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                  Password Confirmation
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password-confirmation"
                    name="password-confirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(ev)=>setPasswordConfirmation(ev.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Have Account?{' '}
              <NavLink to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
              </NavLink>
            </p>
          </div>
      </>
    )
  }










