import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function EditForm({task}) {

 console.log("Task: ", task)
    const navigate = useNavigate()

    const [title, setTitle] = useState()
    const [status, setStatus] = useState()
    const [image, setImage] = useState()
  
    const [tags, setTags] = useState()
    const [assignee, setAssignee] = useState()
  
    useEffect(()=>{
        setTitle(task && task.title)
        setStatus(task && task.status)
        setImage(task && task.image)
        setTags(task.tags && task.tags.join(" "))
        setAssignee(task && task.assignee)
    }
    , [task])
  
    const handleSubmit = (e) =>{
       e.preventDefault()
       const tags_array = tags && tags.split(" ")
  
       if(title.length < 10){
          toast.error("Title should be at least 20 characters long!")
       }
       else{
  
              
            fetch(`https://task-manager-r3w4.onrender.com/tasks/${task.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  title,image, status,assignee, tags: tags_array
                })
  
  
            })
            .then(res => res.json())
            .then((response)=>{
              // Utilize the response
              navigate("/")
            
              toast.success("Task updated Successfully!")
           
              
            })
      }
  
    }
    
    
  return (
    <div className='container mx-auto  '>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto border rounded-lg p-4 mt-14">
              <h2 className='text-center text-4xl font-bold my-4'>Update Task</h2>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium  dark:text-white">Assignee email</label>
                <input onChange={(e)=>setAssignee(e.target.value)} value={assignee} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@flowbite.com" required />
              </div>
  
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium  dark:text-white">Task Title</label>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter title" required />
              </div>
  
  
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium  dark:text-white">Task Tags(Separate your tags with a space )</label>
                <input onChange={(e)=>setTags(e.target.value)} value={tags} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="react tailwindcss jsonserver" required />
              </div>
  
  
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium  dark:text-white">Task Image</label>
                <input onChange={(e)=>setImage(e.target.value)} value={image} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="react tailwindcss jsonserver" required />
              </div>
  
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium  dark:text-white">Task Status</label>
                <select onChange={(e)=>setStatus(e.target.value)} value={status} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  required>
                  <option value="">Select Status</option>
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>  
                  <option value="not completed">Not Completed</option>
                </select>
              </div>
  
              <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
        </form>
  </div>

  )
}
