import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import Card from './Card';
import { useQuery } from "@tanstack/react-query";
import TestModel from './TestModel';
import Loading from './Loading';
import Swal from 'sweetalert2';

const CompleteTask = () => {
    const { user } = useContext(AuthContext)
    const [info, setInfo] = useState(null)
    const [deleteAction, setDeleteAction] = useState(false)
    const [inCompleteAction, setInCompleteAction] = useState(false)
console.log(deleteAction);
    const closeModal = () => {
        setInfo(null)
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

    const { data: task, refetch,isLoading } = useQuery({
        queryKey: ['task',user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`https://to-do-six-alpha.vercel.app/complete-task?email=${user?.email}`, {
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
    const handleInComplete = id => {
        fetch(`https://to-do-six-alpha.vercel.app/task-incomplete/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    setInfo(null)
                    Toast.fire({
                        icon: 'error',
                        title: 'Task Incomplete'
                    })
                }
            })

    }

    const handleDelete = id => {
        fetch(`https://to-do-six-alpha.vercel.app/task-delete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                refetch()
                setInfo(null)
                 Toast.fire({
                        icon: 'success',
                        title: 'Task Delete '
                    })
            })
    }


    
 
    if(isLoading){
        return <Loading/>
    }
console.log(inCompleteAction);
    return (
        <>
            <div className='dark:bg-gray-900'>
                <div className={`${info && "left-0 top-0 bg-black/75 h-screen w-screen fixed z-10 overflow-hidden"}`}> </div>
                <div className=' space-y-5'>
                    {
                        task?.map(t => <Card
                            key={t._id}
                            task={t}
                            setInfo={setInfo}
                            setDeleteAction={setDeleteAction}
                            setInCompleteAction={setInCompleteAction}
                            completeRout={true}
                            refetch={refetch}
                        />)}
                </div>
            </div>
            {info &&
                <TestModel 
                
                    info={info}
                    closeModal={closeModal}
                    deleteAction={deleteAction}
                    handleInComplete={handleInComplete}

                    inCompleteAction={inCompleteAction}
                    handleDelete={handleDelete} 
                    />
               
            }
        </>
    );
};

export default CompleteTask;