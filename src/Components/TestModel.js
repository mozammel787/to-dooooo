import React, { useState } from 'react';

const TestModel = ({ closeModal, info, deleteAction, handleDelete, CompleteAction, handleComplete, handleInComplete, inCompleteAction, editAction,handleEdit }) => {
    const [img, setImg] = useState(info.img)

    const addFile = (event) => {
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
                }
            })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const form = e.target
        const title=form.title.value
        const details=form.details.value
        const time=form.time.value
        const date=form.date.value
        const params={id:info._id,title,details,time,date,img}
        handleEdit(params)
    }

    return (
        <div>
            <div id="action-modal" class={`fixed ${editAction ? "top-[25%] md:top-[10%] md:w-[50%] left-[32%]" : "top-[40%]"}  mx-auto  md:left-[38%] z-50  p-4 overflow-x-hidden overflow-y-auto  h-modal md:h-full`}>
                <div class="relative w-full h-full max-w-md md:h-auto">
                    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow ">
                        <button onClick={closeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover" data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <div class="p-6 ">
                            {editAction &&
                                <>
                                <form onSubmit={handleSubmit}>

                                    <h3 class="mb-5 text-xl font-bold text-center text-gray-800 dark:text-gray-200">Task Edit</h3>
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200 ">Title</label>
                                        <input type="text" name="title" id="text" class="bg-gray-50  dark:bg-gray-600 border border-gray-300 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  mb-2" defaultValue={info.title} />
                                    </div>
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200 ">Time and Date</label>
                                    <dir className="flex justify-between border border-gray-300 p-2.5 rounded-lg mb-2">

                                        <input  className='text-center dark:bg-gray-800 dark:text-gray-200 ' defaultValue={info.time} type="time" name='time' />
                                        <input  className='text-center dark:bg-gray-800 dark:text-gray-200' defaultValue={info.date} type="date" name='date' />
                                    </dir>
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200 ">Details</label>
                                        <textarea  type="text" name="details" id="" class="bg-gray-50  dark:bg-gray-600 border border-gray-300 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  mb-2" defaultValue={info.details} ></textarea>
                                    </div>
                                    <div>

                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200 " htmlFor="multiple_files">Chang Image</label>
                                        <input onChange={addFile} class="block w-full text-sm text-gray-900 dark:text-gray-200 border border-gray-300 p-2.5 rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-600 mb-2" id="multiple_files" type="file" multiple />

                                    </div>
                                    <button type="submit" data-modal-toggle="popup-modal" class="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-500 :focus:ring-blue-500 font-medium rounded-lg text-sm inline-flex items-center px-5 py-3 text-center  mx-auto">
                                       Edit Done
                                    </button>
                                    
                                </form>
                                </>
                            }
                            {inCompleteAction &&
                                <>
                                    <img src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/67/000000/external-cross-interface-royyan-wijaya-detailed-outline-royyan-wijaya-2.png" alt='' className='mx-auto mb-4' />
                                    <h3 class="mb-5 text-lg font-normal text-gray-800 dark:text-gray-200">This is incomplete Task?</h3>
                                    <button onClick={() => handleInComplete(info._id)} data-modal-toggle="popup-modal" type="button" class="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black/25 dark:focus:ring-black font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                </>
                            }
                            {CompleteAction &&
                                <>
                                    <img src="https://img.icons8.com/external-others-inmotus-design/67/16A34A/external-Accept-atm-others-inmotus-design.png" alt="" className='mx-auto mb-4' />
                                    <h3 class="mb-5 text-lg font-normal text-gray-800 dark:text-gray-200">Are you Complete this Task?</h3>
                                    <button onClick={() => handleComplete(info._id)} data-modal-toggle="popup-modal" type="button" class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                </>
                            }
                            {deleteAction &&
                                <>
                                    <img src="https://img.icons8.com/pastel-glyph/67/FE4444/trash.png" alt="" className='mx-auto mb-4' />
                                    <h3 class="mb-5 text-lg font-normal text-gray-800 dark:text-gray-200">Are you sure you want to delete this task?</h3>
                                    <button onClick={() => handleDelete(info._id)} data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                </>
                            }
                           { !editAction&&
                           <button onClick={closeModal} data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:text-gray-200 focus:z-10 dark:bg-gray-700 dark:border-gray-500 dark:hover dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TestModel;