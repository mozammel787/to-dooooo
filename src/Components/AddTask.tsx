import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import Swal from 'sweetalert2'



const AddTask: React.FC = () => {
    const { user } = useContext<any>(AuthContext)
    // const imageHostKey: string | undefined = (process.env.REACT_APP_imgbb_Key );
const [img ,setImg]= useState<string>("")
const [title ,setTitle]= useState<string>("0")
const [details ,setDetails]= useState<string>("0")
const [date ,setDate]= useState<string>(new Date().toISOString().slice(0, 10))
const [time ,setTime]= useState<string>(new Date().toISOString().slice(11, 16))
// console.log(imageHostKey);

 const addFile = (event: any): void => {
    const image = event.target.files[0];
    console.log(image);
    
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=bc744027800b30632f8de6c3ca3c32af`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    setImg(imgData.data.url)
                }})
    }

    const addTitle = (event: any): void => {
        setTitle(event.target.value)
        
        
    }
    const addDetails = (event: any): void => {
        setDetails(event.target.value)
        
    }
    const addTime = (event: any): void => {
        setTime(event.target.value)
        
    }
    const addDate = (event: any): void => {
        setDate(event.target.value)
        
    }
// console.log(time,date , img);
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

    const handleSubmit= (event: any): void =>{
        event.preventDefault()
        const task={
            title,
            details,
            time,
            date,
            img,
            email:user?.email,
            completed:false
        }
        
        console.log(task);
        fetch('https://to-do-six-alpha.vercel.app/add-task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {

                    event.target.reset()
                    Toast.fire({
                        icon: 'success',
                        title: 'Task Add successfully'
                    })
                  
                }

            })
            .catch(error => console.error(error))
    }
    
    return (
        <form onSubmit={handleSubmit} className='mx-auto w-[95%] md:w-[75%] lg:w-[50%] text-lg text-gray-400 shadow-2xl py-5 px-5   md:px-10 rounded-lg bg-white  dark:bg-gray-800 '>
            <h2 className='text-4xl font-semibold text-blue-600 mb-5'>Add a task</h2>
              <div className=" flex items-center  mb-5">
         <label className='relative cursor-pointer w-full'>
           <input type="text" placeholder="Input" name='title' className={`w-full px-6 py-1 text-lg  border-2 rounded-lg border-opacity-50 outline-none ${title? "focus:border-blue-500":"focus:border-red-500 border-red-500"} placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-gray-600 dark:text-gray-200 dark:bg-gray-800`} onBlur={addTitle} required />
        { title? 
          <span className='text-lg    absolute left-5 top-1 px-1 transition duration-200 input-text bg-white  dark:bg-gray-800  '>Title</span>
        :
           <span className='text-lg text-red-500  absolute left-5 top-1 px-1 transition duration-200 input-text-err bg-white  dark:bg-gray-800  '>Title is required</span>}
       </label>
    </div>
              <div className=" flex items-center  mb-5">
      <label className='relative cursor-pointer  w-full'>
        <textarea placeholder="Input" name='details' className={`w-full h-40 px-6 py-1 text-lg  border-2 rounded-lg border-opacity-50 outline-none ${details? "focus:border-blue-500":"focus:border-red-500 border-red-500"}  placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-gray-600 dark:text-gray-200 dark:bg-gray-800`} onBlur={addDetails} required ></textarea>
        { details? 
          <span className='text-lg    absolute left-5 top-1 px-1 transition duration-200 input-text bg-white   dark:bg-gray-800'>Details</span>
        :
           <span className='text-lg text-red-500  absolute left-5 top-1 px-1 transition duration-200 input-text-err bg-white  dark:bg-gray-800'>Details is required</span>}
      </label>
    </div>

    
             <div className='flex justify-around gap-4 mb-5'>
             <label className='relative cursor-pointer w-1/2 border-2 rounded-md' >
             <input className=' text-center bg-white  dark:bg-gray-800' defaultValue={new Date().toISOString().slice(0, 10)} type="date" onBlur={addDate}  name='date'/>
             { date? 
          <span className='text-lg    absolute left-5 top-1 px-1 transition duration-200 input-text bg-white  dark:bg-gray-800'>Date</span>
        :
           <span className='text-lg text-red-500  absolute left-5 top-1 px-1 transition duration-200 input-text-err bg-white  dark:bg-gray-800'>Date is required</span>}
      </label>
             <label className='relative cursor-pointer w-1/2 border-2 rounded-md'>
             <input className='text-center bg-white  dark:bg-gray-800' defaultValue={new Date().toISOString().slice(11,16)} type="time" onBlur={addTime}  name='time'/>
             { time? 
          <span className='text-lg    absolute left-5 top-1 px-1 transition duration-200 input-text bg-white  dark:bg-gray-800'>Time</span>
        :
           <span className='text-lg text-red-500  absolute left-5 top-1 px-1 transition duration-200 input-text-err bg-white  dark:bg-gray-800'>Time is required</span>}
      </label> 
             </div>
<div className="flex items-center justify-center w-full mb-5">
    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:hover:bg-bray-800">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload your Image</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 400x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={addFile} />
    </label>
</div> 
{details.length >2 && title.length >2?
    <button  type='submit' className='bg-blue-600 text-white rounded shadow-md w-full px-4 py-2 text-xl font-medium '>Submit</button>
:
<button  type='submit' className='bg-blue-300 dark:brightness-75 text-white rounded shadow-md w-full px-4 py-2 text-xl font-medium ' disabled>Submit</button>}
        </form>
    );
};

export default AddTask;