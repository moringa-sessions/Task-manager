import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

export default function Home() {


    const [tasks, setTasks] = useState([])

useEffect(()=>{

  fetch("http://localhost:3000/tasks")
  .then((r)=>r.json())
  .then((response)=>{

     setTasks(response)
  })

}, [])


// Pagination
const [itemOffset, setItemOffset] = useState(0);

const itemsPerPage = 8;
const endOffset = itemOffset + itemsPerPage;
console.log(`Loading items from ${itemOffset} to ${endOffset}`);
const currentItems = tasks.slice(itemOffset, endOffset);
const pageCount = Math.ceil(tasks.length / itemsPerPage);

// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % tasks.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};


  return (
    
    <div className='container mx-auto '>


    
    <h2 className='text-center text-4xl font-bold font-poppins'>Tasks {tasks.length}</h2>
    <div className='grid grid-cols-4 gap-6 p-8'>
      {
        currentItems.map((task)=>(
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

<ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>

 </div>
  )
}
