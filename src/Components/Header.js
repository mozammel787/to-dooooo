import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom"
import logo from "../Assets/logo.png"
import { ThemeContext } from "../AuthContext/ThemeContext";

export default function Header() {
    const { user, userLogOut, dark, } = useContext(AuthContext)
    const { theme, setTheme } = React.useContext(ThemeContext);
    const [show, setshow] = useState(false);
    const [darks, setDark] = useState(false);
    const navigate = useNavigate();

    const handleDark = event => {
        setDark(event.target.checked);
    }
    useEffect(() => {
        if (darks) {
            setTheme("dark")
        }
        else {
            setTheme("light")
        }
    }, [darks])


    const handleLogOut = () => {
        userLogOut()
            .then(() => { })
            .catch(() => { })
    }
    const handleGotoSignin = () => {
        navigate("/login");
    }


    return (
        <div className=" bg-white  dark:bg-gray-900">
            <nav className="2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-3 px-4">
                {/* For large and Medium-sized Screen */}
                <div className="flex justify-between ">
                    <div className="hidden sm:flex flex-row items-center space-x-6">


                        {user?.email &&

                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} className="rounded-full" alt="" />
                            </div>

                        }



                    </div>
                    <Link to='/' className=" flex space-x-3 items-center">
                        <img src={logo} alt="" className="w-10" />
                        <h1 className=" font-medium text-2xl leading-6 text-[#1A70FE] ">To - Dooooo</h1>
                    </Link>
                    <div className="hidden sm:flex flex-row items-center space-x-4">



                        <label class="inline-flex relative items-center cursor-pointer">
                            <input onClick={handleDark} type="checkbox" value="" defaultValue="" class="sr-only peer" />
                            <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-blue-500"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Mood</span>
                        </label>

                        {!user?.email ?
                            <button onClick={handleGotoSignin} className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-blue-500 focus:outline-none focus:bg-blue-600 hover:bg-blue-600 duration-150 justify-center items-center">Sign In</button>
                            :
                            <button onClick={handleLogOut} className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-gray-600 dark:text-gray-50 border border-blue-400 focus:outline-none focus:bg-blue-500 hover:bg-blue-500 hover:text-white duration-150 justify-center items-center">Log Out</button>
                        }
                    </div>
                    {/* Burger Icon */}
                    <div id="bgIcon" onClick={() => setshow(!show)} className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  justify-center items-center sm:hidden cursor-pointer`}>
                        <svg className={`${show ? 'hidden' : ''}`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className=" transform duration-150" d="M4 6H20" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H20" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path className=" transform duration-150" d="M4 18H20" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className={`${show ? 'block' : 'hidden'}`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                {/* Mobile and small-screen devices (toggle Menu) */}
                <div id="MobileNavigation" className={`${show ? 'block' : 'hidden'} sm:hidden mt-4 mx-auto`}>
                    <div className="flex flex-row items-center justify-center space-x-6 mx-auto">

                        {user?.email &&

                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} className="rounded-full" alt="" />
                            </div>

                        }


                    </div>
                    <div className="flex flex-col gap-4 mt-4 w-80 mx-auto  items-center justify-center ">




                        <label class="inline-flex relative items-center cursor-pointer">
                            <input onClick={handleDark} type="checkbox" value="" defaultValue={dark} class="sr-only peer" />
                            <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-blue-500"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Mood</span>
                        </label>

                        {!user?.email ?
                            <button onClick={handleGotoSignin} className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-blue-500 focus:outline-none focus:bg-blue-600 hover:bg-blue-600 duration-150 justify-center items-center">Sign In</button>
                            :
                            <button onClick={handleLogOut} className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-gray-600 dark:text-gray-50 border border-blue-400 focus:outline-none focus:bg-blue-500 hover:bg-blue-500 hover:text-white duration-150 justify-center items-center">Log Out</button>
                        }
                    </div>
                </div>

            </nav>
        </div>

    );
}
