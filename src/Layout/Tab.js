
import { Outlet,NavLink } from "react-router-dom";

export default function TabsComponent() {

    return (
        <div>
            <div className="lg:container mx-auto mt-4">
                <div className="flex flex-col items-center  justify-center w-full mx-auto ">
                    <ul className="flex space-x-2 md:text-xl font-medium dark:bg-gray-700 bg-[#F1F3F6] p-1 rounded">
                        <li>
                            <NavLink to='/to-dooooo/add-task'
                                 className={({isActive})=>isActive ? "bg-blue-600 text-white rounded shadow-md inline-block px-4 py-2" : "text-gray-600 inline-block px-4 py-2 dark:text-gray-50"}  

                            >
                               Add Task
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/to-dooooo/my-task'
                                className={({isActive})=>isActive ? "bg-blue-600 text-white rounded shadow-md inline-block px-4 py-2" : "text-gray-600 inline-block px-4 py-2 dark:text-gray-50"}  

                            >
                                My Task
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/to-dooooo/complete-task'
                                 className={({isActive})=>isActive ? "bg-blue-600 text-white rounded shadow-md inline-block px-4 py-2" : "text-gray-600 inline-block px-4 py-2 dark:text-gray-50"}  


                            >
                                Completed Tasks
                            </NavLink>
                        </li>
                    </ul>
                    <div className="p-3 mt-6 bg-white w-full mx-auto dark:bg-gray-900">
                       <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}