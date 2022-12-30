import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import Card from './Card';
import { useQuery } from "@tanstack/react-query";
import TestModel from './TestModel';
import Loading from './Loading';
import Swal from 'sweetalert2';

const MyTask = () => {
    const { user } = useContext(AuthContext)

    const [info, setInfo] = useState(null)
    const [deleteAction, setDeleteAction] = useState(false)
    const [CompleteAction, setCompleteAction] = useState(false)
    const [editAction, setEditAction] = useState(false)



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

    const { data: task, refetch, isLoading } = useQuery({
        queryKey: ['task',user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`https://to-do-six-alpha.vercel.app/my-task?email=${user?.email}`, {
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
    const handleComplete = id => {
        fetch(`https://to-do-six-alpha.vercel.app/task-complete/${id}`, {
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
                        icon: 'success',
                        title: 'Task Complete'
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
                    icon: 'error',
                    title: 'Task delete successfully'
                })
            })
    }

    const handleEdit = (params) => {
        const {id,title,details,time,date,img} =params
        const data={
            title,
            details,
            time,
            date,
            img,
        }
        console.log(id);
        fetch(`https://to-do-six-alpha.vercel.app/edit/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({task:data})
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setInfo(null)
                    refetch()
                }
            })

    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <div className='dark:bg-gray-900 '>
                <div className={`${info && "left-0 top-0 bg-black/75 h-screen w-screen fixed z-10 overflow-hidden"}`}> </div>
                <div className=' space-y-5'>
                    {
                        task?.map(t => <Card
                            key={t._id}
                            task={t}
                            setInfo={setInfo}
                            setDeleteAction={setDeleteAction}
                            setCompleteAction={setCompleteAction}
                            setEditAction={setEditAction}
                        />)}
                </div>
            </div>
            {info &&
                <TestModel info={info}
                    closeModal={closeModal}
                    handleComplete={handleComplete}
                    CompleteAction={CompleteAction}
                    deleteAction={deleteAction}
                    handleDelete={handleDelete}
                    editAction={editAction}
                    refetch={refetch}
                    setInfo={setInfo}
                    handleEdit={handleEdit}
                />

            }
        </>
    );
};

export default MyTask;