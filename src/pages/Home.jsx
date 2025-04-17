import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Home() {


    const [tasks, setTasks] = useState([])

useEffect(()=>{

  fetch("http://localhost:3000/tasks")
  .then((r)=>r.json())
  .then((response)=>{

     setTasks(response)
  })

}, [])


  return (
    
    <div className='container mx-auto  border-4 border-double border-red-200'>


    
    <h2 className='text-center text-4xl font-bold'>Tasks {tasks.length}</h2>
    <div className='grid grid-cols-4 gap-6 p-8'>
      {
        tasks.map((task)=>(
          <Link to={`/task/${task.id}`} key={task.id} className='border rounded-lg p-4'>
            <img className='h-[20vh] w-auto' src={task.image} alt='task' />
            <h4>{task.title}</h4>
            <h5>Assigned to {task.assignee}</h5>

            <button className={`${task.status=="completed"?"bg-green-600":task.status=="not completed"?"bg-red-600":task.status=="in-progress"?"bg-blue-600": task.status=="not-started"?"bg-gray-600": "" } px-2 py-1 rounded-md text-white`}>{task.status}</button>
           
            {/* { task.status=="completed" && <button className='bg-green-600 px-2 py-1 rounded-md text-white'>{task.status}</button>}
            { task.status=="not completed" && <button className='bg-red-600 px-2 py-1 rounded-md text-white'>{task.status}</button>}
            { task.status=="in-progress" && <button className='bg-blue-600 px-2 py-1 rounded-md text-white'>{task.status}</button>}
            { task.status=="not-started" && <button className='bg-gray-600 px-2 py-1 rounded-md text-white'>{task.status}</button>} */}

            <div className='mt-4'>
              {
                task.tags.map((tag)=>(
                  <span className='mr-2 px-1.5 py-1 bg-green-400 rounded-sm'>{tag}</span>
                ))
              }
            </div>
          </Link>

        ))
      }
    </div>

 </div>
  )
}
