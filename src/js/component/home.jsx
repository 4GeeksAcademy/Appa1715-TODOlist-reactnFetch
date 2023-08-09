import { useState, useEffect } from "react";
import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const  APPI_URL = "https://playground.4geeks.com/apis/fake/todos/user/appa1715"

//create your first component
const Home = () => {

    //guardar la tarea que escribo
    const [task, setTask] = useState({
        label: "",
        done: false
    })

    const [listTask, setListTask] = useState([])
    const [erase,setErase] = useState (-1)

    const handleChange = (e) => {
        setTask({
            ...task,
            label: e.target.value
        })
    }
    async function removeItem() {
        try {
            let response = await fetch(APPI_URL, {
                method: "DELETE",
            });
        } catch (err) {
        }
    }

    const saveTask = async (event) => {
        if (event.key == "Enter") {
            try {
                let response = await fetch(APPI_URL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify([...listTask, task])
                })

                if (response.ok) {
                    getTasks()
                    setTask({
                        label: "",
                        done: false
                    })
                }

            } catch (error) {
                console.log("ERROR!")
            }
        }
    }
    const createUser = async ()=>{
        try {
            let response = await fetch(APPI_URL,
                {method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify([])})
                if (response.ok){
                    getTasks ()
                }
        } catch (error) {
            
        }
    }
    

    const getTasks = async () => {
        try {
            let response = await fetch(APPI_URL)
            if (response.ok) {
                let data = await response.json()

                setListTask(data)
            }
            if (response.ok){
                let data = await response.json ()
                setListTask (data)
            }
            if (response.status==404) {
                createUser()
            }

        } catch (error) {
            console.log("ERROR!")
        }
    }


    useEffect(() => {
        getTasks()
    }, [])


    return (
        <div className="card text-center">
  			<div className="header ">
			  <h1 className="bg-black p-2 text-white bg-opacity-25 rounded">My TO-DO List!</h1>
			</div>
  			<div className="card-body">
                    <input
                        type="text"
                        placeholder="Add a new task!"
                        className="form-control"
                        name="label"
                        value={task.label}
                        onChange={handleChange}
                        onKeyDown={saveTask}
                    />

                    <ul className="bg-black p-2 text-white bg-opacity-25 rounded container" >
                        {
                            listTask.map((item, index) => {
                                return (
                                    <li key={index}>{item.label}
                                    <button className="btnClose" onClick={()=>removeItem(index)}></button>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            </div>
        
    );
};


export default Home;
