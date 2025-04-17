import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import EditForm from "../components/EditForm"

export default function SingleTask() 
{
  const navigate = useNavigate()

  const [task, setTask] = useState({})
    const { id } = useParams()

    // FETCH SINGLE TASK
    useEffect(()=>{
    
      fetch(`https://task-manager-r3w4.onrender.com/tasks/${id}`)
      .then((r)=>r.json())
      .then((response)=>{
    
         setTask(response)
      })
    
    }, [id])


    // DELETE
    const handleDelete = () => {
      fetch(`https://task-manager-r3w4.onrender.com/tasks/${id}`, {
        method: "DELETE"
      })
      .then((r)=>r.json())
      .then((response)=>{

        toast.success("Task Deleted Successfully!")
        navigate("/")
      })
    }

  return (
    <div className="max-w-2xl p-4 mt-8 mx-auto border rounded">


        <h2 className="text-center text-4xl font-bold">Task {id}</h2>

        <img className='h-[20vh] w-auto' src={task && task.image} alt='task' />
            <h4>{task && task.title}</h4>
            <h5>Assigned to {task && task.assignee}</h5>

            <button className={`${task && task.status=="completed"?"bg-green-600":task && task.status=="not completed"?"bg-red-600":task && task.status=="in-progress"?"bg-blue-600": task && task.status=="not-started"?"bg-gray-600": "" } px-2 py-1 rounded-md text-white`}>{task.status}</button>
           
            {/* { task.status=="completed" && <button className='bg-green-600 px-2 py-1 rounded-md text-white'>{task.status}</button>}
            { task.status=="not completed" && <button className='bg-red-600 px-2 py-1 rounded-md text-white'>{task.status}</button>}
            { task.status=="in-progress" && <button className='bg-blue-600 px-2 py-1 rounded-md text-white'>{task.status}</button>}
            { task.status=="not-started" && <button className='bg-gray-600 px-2 py-1 rounded-md text-white'>{task.status}</button>} */}

            <div className='mt-4'>
              {
                task && task.tags && task.tags.map((tag)=>(
                  <span className='mr-2 px-1.5 py-1 bg-green-400 rounded-sm'>{tag}</span>
                ))
              }
            </div>

            <div className='mt-4 flex gap-6 justify-end border-t border-b p-4'>
              <button onClick={handleDelete} className="bg-red-700 text-white px-2 py-1">Delete</button>
            </div>

            <EditForm task={task} />


    </div>
  )
}
