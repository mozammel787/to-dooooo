import React from 'react';
import img from '../Assets/img2.png'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <section className="bg-gray-100 text-gray-800 dark:text-gray-100 dark:bg-gray-900 h-screen overflow-hidden">
            
	<div className="container flex flex-col-reverse justify-center mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-around  ">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-bold leading-none sm:text-6xl">To-
				<span className="text-blue-500">Do</span>oooo
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12">It is a web application that allows users to create a list of tasks or items that they need to complete. To-dooooo are often used as a productivity tool to help users stay organized and manage their time more effectively.
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<Link to='/to-dooooo' className="px-8 py-3 text-lg font-semibold rounded bg-blue-500 text-gray-50 flex justify-around gap-2 items-center"> <p>Start Now </p> 
				<img src="https://img.icons8.com/pastel-glyph/44/FFFFFF/move-right.png" alt=''/>
				</Link>
				
			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src={img} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
</section>
        </div>
    );
};

export default Home;