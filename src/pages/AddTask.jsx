import { useState} from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function AddTask() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("Not Started")
  const [image, setImage] = useState("")

  const [tags, setTags] = useState("")
  const [assignee, setAssignee] = useState()


  const handleSubmit = (e) =>{
     e.preventDefault()
     const tags_array = tags && tags.split(" ")

     if(title.length < 20){
        toast.error("Title should be at least 20 characters long!")
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Title should be at least 20 characters long!",
        // });
     }
     else{

          console.log("Title: ", title)
            console.log("Status: ", status)
            console.log("Tags: ", tags_array)
            console.log("Assignee: ", assignee)

            
          fetch("https://task-manager-r3w4.onrender.com/tasks", {
              method: "POST",
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
          
            toast.success("Task Created Successfully!")
         
            
          })
    }

  }
  
  
return (
  <div className='container mx-auto  '>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto border rounded-lg p-4 mt-14">
            <h2 className='text-center text-4xl font-bold font-dancing'>Add Task</h2>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium  dark:text-white">Assignee email</label>
              <input onChange={(e)=>setAssignee(e.target.value)} value={assignee} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium  dark:text-white">Task Title</label>
              <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter title" required />
            </div>


            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium  dark:text-white">Task Tags(Separate your tags with a space )</label>
              <input onChange={(e)=>setTags(e.target.value)} value={tags} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="react tailwindcss jsonserver" required />
            </div>


            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium  dark:text-white">Task Image</label>
              <input onChange={(e)=>setImage(e.target.value)} value={image} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="react tailwindcss jsonserver" required />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium  dark:text-white">Task Status</label>
              <select onChange={(e)=>setStatus(e.target.value)} value={status} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
                <option value="">Select Status</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>  
                <option value="not completed">Not Completed</option>
              </select>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
</div>
)
}
