import { useState, useEffect } from "react";
import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const  APPI_URL = "https://playground.4geeks.com/apis/fake/todos/user/appa1715"

//create your first component
const Home = () => {
	const [task, settaks] = useState ({
		label: "",
		"done": false
	});

	const [listtaks, setlisttaks] = useState ([]);
	
	const handleOnChange = (e) => {
		settaks({
			...task,
			label: e.target.value
		})
	};
	const handleDelete = (id) => {
		const dellisttask = listtaks.filter((task, index)=> index !== id);
		
		setlisttaks([...dellisttask])
		settaks(listtaks.length-1)
		
		task.length-1 === 0 ? setlisttaks("You are free now, add a "):null
	}

	const saveTask = async (e) =>{
		if (e.key == "Enter") { 
			try {
				let response = await fetch (APPI_URL, {
					method: "PUT", headers:{
						"Content-Type": "application/json"}, BODY: JSON.stringify([...listtaks, task])
				})
				if (response.ok) {
					getTask(), settaks({
						label: "",
						"done": false
					})
				}
			} catch (error) {
				console.log("ERROR!");
			}
		}
	}

	const getTask = async () =>{
		try {
			let response = await fetch (APPI_URL)
			if (response.ok) {
				let data = await response.json ()
				setlisttaks(data)
			}
		
		} catch (error) {
			console.log("ERROR!");
		}
	}

	useEffect (()=> {
		getTask()
	}, []);
	

	return (
		<div className="card text-center">
  			<div className="header ">
			  <h1 className="bg-black p-2 text-white bg-opacity-25 rounded">My TO-DO List!</h1>
 			</div>
  			<div className="card-body">
				<input className="label w-50 p-1 border border-3"
				type="text" 
				placeholder="Writte a new pending task!"
				value={task.label}
				onChange={handleOnChange}
				onKeyDown={saveTask}
				/>
				
  			</div>
			<div>
				<button className="btn btn-outline-secondary"
				onClick={() =>{}}>Create!</button>
			  	<button 
				className="btn btn-outline-secondary"
				onClick={()=>handleDelete(index)}>Delete!
				</button>
			</div>
  			<div className="card-footer text-muted">
			  <label className="footer">{setlisttaks + "task"} </label>
  			</div>
		</div>
	);
};

export default Home;
