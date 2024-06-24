import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../features/tasks/taskSlice'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
export const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const tasks = useSelector((state) => state.tasks)

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (params.id) {
      dispatch(editTask(task))
    } else {
      dispatch(addTask({ ...task, id: uuid() }))
    }

    navigate('/')
  }

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id))
    }
  }, [params.id, tasks])

  return (
    <form className='bg-zinc-800 max-w-sm p-4' onSubmit={handleSubmit}>
      <label className='mb-2 block text-xs font-bold' htmlFor='title'>
        Task:
      </label>
      <input
        name='title'
        type='text'
        placeholder='title'
        onChange={handleChange}
        value={task.title}
        className='mb-2 w-full p-2 rounded-md bg-zinc-600'
      />
      <label className='block text-xs font-bold' htmlFor='description'>
        Task:
      </label>

      <textarea
        name='description'
        placeholder='description'
        onChange={handleChange}
        id=''
        value={task.description}
        className='mb-2 w-full p-2 rounded-md bg-zinc-600'
      ></textarea>
      <button className='px-2 py-1 bg-indigo-600 rounded self-center'> Save</button>
    </form>
  )
}
