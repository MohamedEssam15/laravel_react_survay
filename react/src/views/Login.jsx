import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
import axiosClient from "../axios";

export default function Login() {

    const [email,setEmail]=useState('');
    const [remember,setRemember]=useState(false);
    const [password,setPassword]=useState('');
    const [error,setError]=useState({__html: ''});
    const {setUserToken,setCurrentUser} = useStateContext();


   const onSubmit =(ev)=>{
    ev.preventDefault();
    setError({__html: ''});
    axiosClient.post('/login',{
        email:email,
        password:password,
        remember:remember,
    })
    .then(({data})=>{
        setUserToken(data.token);
        setCurrentUser(data.user);
    })
    .catch((error)=>{
     if(error.response){
      const FinalErrors=  error.response.data.error;
      setError({__html: FinalErrors})
     }
     console.error(error);
    });
   }


    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error.__html && (<><div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
            </div><br/></>)}

                <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
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
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(ev)=>setPassword(ev.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <NavLink to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign Up
                    </NavLink>
                </p>
            </div>
        </>
    )
}










