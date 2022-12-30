import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthContext/AuthProvider';
import { useQuery } from "@tanstack/react-query";

const Card = ({ task, setInfo, setDeleteAction, setCompleteAction, completeRout, setInCompleteAction, setEditAction }) => {

    const { user } = useContext(AuthContext)
    const { _id, title, img, time, details, date } = task;
    const [comment, setComment] = useState('')
    const [addCommentAction, setAddCommentAction] = useState(false)
    const completeTask = (task) => {
        setInfo(task);
        setDeleteAction(false)
        if (setInCompleteAction) {
            setInCompleteAction(false)

        }
        else {
            setEditAction(false)
            setCompleteAction(true)
        }
    }
    const deleteTask = (task) => {
        setInfo(task);
        if (setInCompleteAction) {
            setInCompleteAction(false)

        }
        else {
            setEditAction(false)
            setCompleteAction(false)
        }
        setDeleteAction(true)
    }
    const incompleteTask = (task) => {
        setInfo(task);
        setDeleteAction(false)
        if (setInCompleteAction) {
            setInCompleteAction(true)

        }
        else {
            setEditAction(false)
            setCompleteAction(false)
        }
    }
    const editTask = (task) => {
        setInfo(task);
        setDeleteAction(false)
        if (setInCompleteAction) {
            setInCompleteAction(false)

        }
        else {
            setCompleteAction(false)
            setEditAction(true)
        }
    }
    const addComment = () => {
        setAddCommentAction(true)
    }

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

    const { data: com, refetch } = useQuery({
        queryKey: ['com', _id],
        queryFn: async () => {
            try {
                const res = await fetch(`https://to-do-six-alpha.vercel.app/comment?id=${_id}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('geniusToken')}`
                    }
                })
                const data = await res.json()
                return data
            }
            catch (err) {

            }
        }
    })
    console.log(com);
    const handleCommentSubmit = id => {
        const addComment = {
            taskID: id,
            comment,
            email: user?.email,
            time: new Date()
        }
        fetch('https://to-do-six-alpha.vercel.app/add-comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    refetch()
                    setAddCommentAction(false)
                    Toast.fire({
                        icon: 'success',
                        title: 'Comment add'
                    })

                }

            })
            .catch(error => console.error(error))

    }
    return (
        <div className='border dark:bg-gray-800 border-gray-200 w-full shadow-lg rounded-lg'>
            <div className="flex flex-col md:flex-row justify-between p-2 items-center md:items-center  ">
                <div className="w-full md:w-[15%] ">
                    <img className="block" src={img} alt="" />
                </div>

                <div className="flex justify-start md:justify-between items-start md:items-start  flex-col w-full md:w-[70%] p-4 md:px-8">

                    <h3 className="text-lg md:text-xl font-semibold  text-gray-800 dark:text-gray-200 break-words">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-200 dark:bg-gray-800 w-full">
                        <input className='text-center dark:bg-gray-800' defaultValue={time} type="time" name='time' readOnly/>
                        <input className='text-center dark:bg-gray-800' defaultValue={date} type="date" name='date' readOnly />
                    </p>
                    <div className="  space-x-4 md:space-x-6 mt-4  w-full">
                        <p className="text-sm text-gray-600 break-words w-full dark:text-gray-200">
                            {details}
                        </p>

                    </div>

                </div>

                <div className="flex mt-4 md:mt-0 justify-around gap-1  md:justify-between items-center w-full md:w-[15%]  ">
                    {completeRout ?
                        <>
                            <button htmlFor="action-modal" onClick={() => incompleteTask(task)} className='bg-black/25 rounded-full p-1 w-10 dark:bg-white/75 '><img src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/67/000000/external-cross-interface-royyan-wijaya-detailed-outline-royyan-wijaya-2.png" alt='' /></button>
                            <button onClick={addComment} className='bg-blue-200 rounded-full p-1 w-10 hover:bg-blue-300 '><img src="https://img.icons8.com/sf-regular/67/2536EB/topic.png" alt='' /></button>
                        </>
                        :
                        <>
                            <button htmlFor="action-modal" onClick={() => completeTask(task)} className='bg-green-200 rounded-full p-1 w-10 hover:bg-green-300 '><img src="https://img.icons8.com/external-others-inmotus-design/67/16A34A/external-Accept-atm-others-inmotus-design.png" alt="" /></button>
                            <button onClick={() => editTask(task)} className='bg-blue-200 rounded-full p-2 w-10 hover:bg-blue-300 '><img src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/67/2536EB/external-edit-basic-user-interface-anggara-basic-outline-anggara-putra.png" alt="" /></button>
                        </>
                    }
                    <button htmlFor="action-modal" onClick={() => deleteTask(task)} className='bg-red-200 rounded-full p-2 w-10 hover:bg-red-300 '><img src="https://img.icons8.com/pastel-glyph/67/FE4444/trash.png" alt="" /></button>

                </div>
            </div>
        
            {addCommentAction &&
                <>
                    <hr />

                    <div className='rounded-lg'>
                        <label for="chat" class="sr-only">Your comment</label>
                        <div class="flex items-center px-3 py-2 bg-white dark:bg-gray-800">

                            <textarea onChange={e => setComment(e.target.value)} id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 dark:text-gray-200 dark:bg-gray-600 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your comment..."></textarea>
                            <button onClick={() => handleCommentSubmit(task._id)} class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 ">
                                <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>

                            </button>
                        </div>
                    </div>

                </>
            }
                {(com?.length > 0) && completeRout &&
                <>
                    <hr />
                    {

                        com.map((c, i) => <div key={c._id} >
                            <div className='full p-5 break-words dark:text-gray-200'>{i + 1}. {c.comment}</div>
                            <hr />
                        </div>)
                    }

                </>


            }
        </div>

    );
};

export default Card;