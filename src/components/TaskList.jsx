import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import { Link } from 'react-router-dom'

export const TaskList = () => {
  const dispatch = useDispatch()
  const task = useSelector((state) => state.tasks)
  //console.log(task)
  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }
  return (
    <div className='w-4/6 '>
      <header className='flex justify-between items-center py-4'>
        <h1>Task {task.length}</h1>
        <Link className='bg-indigo-600 px-2 py-1 rounded-sm text-sm' to={'/create-task'}>
          Create task
        </Link>
      </header>
      <div className='grid grid-cols-3 gap-4'>
        {task.map((task) => (
          <div className='bg-neutral-800 p-4 rounded-md' key={task.id}>
            <header className='flex justify-between'>
              <h3>{task.title}</h3>
              <div className='flex gap-x-2 '>
                <p>{task.description}</p>
                <Link
                  className='bg-zinc-600 px-2 py-1 text-xs rounded-md'
                  to={`/edit-task/${task.id}`}
                >
                  {' '}
                  Edit
                </Link>

                <button
                  className='bg-red-500 px-2 py-1 text-xs rounded-md '
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </header>
          </div>
        ))}
      </div>
    </div>
  )
}
