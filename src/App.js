import {useState, useEffect} from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Todo from './components/Todo'

function seedData(){
	const seed = [
		{id: "todo-0", name: "todo list 1", completed: true},
		{id: "todo-1", name: "todo list 2", completed: false},
		{id: "todo-2", name: "todo list 3", completed: false}
	]

	saveDoc(seed)
}

function saveDoc(tasks){
	localStorage.setItem("tasks", JSON.stringify(tasks))
}

if(!localStorage.getItem("tasks") || JSON.parse(localStorage.getItem("tasks")).length === 0){
	seedData()
}

const FILTER_MAP = {
	total: () => true,
	complete: (task) => task.completed,
	incomplete: (task) => !task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function App(){
	const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")))

	const [filter, setFilter] = useState("total")

	function addTask(name){
		const newTask = {
			id: `todo-${Date.now()}`,
			name,
			completed: false
		}

		const updatedTasks = [...tasks, newTask]

		saveDoc(updatedTasks)

		setTasks(updatedTasks)
	}

	function deleteTask(id){
		const remainingTasks = tasks.filter(task => task.id !== id)

		saveDoc(remainingTasks)

		setTasks(remainingTasks)
	}

	function toggleTaskCompleted(id){
		const updatedTasks = tasks.map(task => {
			if(task.id === id){
				return {...task, completed: !task.completed}
			}
			return task
		})

		saveDoc(updatedTasks)

		setTasks(updatedTasks)
	}

	function editTask(id, newName){
		const updatedTasks = tasks.map(task => {
			if(task.id === id){
				return {...task, name: newName, completed: false}
			}
			return task
		})

		saveDoc(updatedTasks)

		setTasks(updatedTasks)
	}

	useEffect(() => {
		document.title = "todo app"
	}, [])

	const filterButtons = FILTER_NAMES.map(name => {
		return <Filter
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		>
		</Filter>
	})

	const taskList = tasks.filter(FILTER_MAP[filter]).map(task => {
		return <Todo
			key = {task.id}
			id = {task.id}
			name = {task.name}
			completed = {task.completed}
			deleteTask = {deleteTask}
			toggleTaskCompleted = {toggleTaskCompleted}
			editTask = {editTask}
		>
		</Todo>
	})

	return(
		<div className="max-w-sm mt-8 mx-auto px-4">
			<h1 className="text-2xl font-semibold text-center my-4">
				todo app &#128526; &#127928;
			</h1>

			<Form addTask={addTask}></Form>

			<div className="grid grid-cols-3 gap-1 mb-4">
				{filterButtons}
			</div>

			<h2 className="font-semibold mb-4">
				there are {taskList.length} tasks
			</h2>

			<ul>
				{taskList}
			</ul>
		</div>
	)

}