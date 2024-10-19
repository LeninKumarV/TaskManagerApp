import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../FIrebase";
import { child, get, ref } from "firebase/database";
import TaskPage from "./TaskPage";
import { nanoid } from "nanoid";

const Home = () => {
  const [taskData, setTaskData] = useState([]);
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {

    const getTaskData =async () => {
     await get(child(ref(db), `tasks`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();                     
            setTaskData(Object.values(data));
                   
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
    getTaskData();
  }, []);


  useEffect(()=>{
    const handleFunc=async()=>{
      const doneData = taskData.filter((f) => f.status === "done");
      setDone(doneData);

      const progressData = taskData.filter((f) => f.status === "inprogress");
      setProgress(progressData);

      const todoData = taskData.filter((f) => f.status === "todo");
      setTodo(todoData);
    }
    handleFunc();
  },[taskData]);


  console.log("home", taskData);
  console.log("done", done);
  console.log("progress", progress);
  console.log("todo", todo);
  
  

  return (
    <main>
      <div className="d-flex my-5">
        <div className="col-3 mx-3">
          <div
            className="bg-primary px-3 py-2 rounded"
            style={{ color: "white" }}
          >
            Todo
          </div>
          <div>{todo && todo.map((m) => <TaskPage key={m.id} data={m} />)}</div>
        </div>
        <div className="col-3 mx-3">
          <div
            className="bg-warning px-3 py-2 rounded"
            style={{ color: "white" }}
          >
            In Progress
          </div>
          <div>
            {progress && progress.map((m) => <TaskPage key={m.id} data={m} />)}
          </div>
        </div>
        <div className="col-3 mx-3">
          <div
            className="bg-success px-3 py-2 rounded"
            style={{ color: "white" }}
          >
            Done
          </div>
          <div>{done && done.map((m) => <TaskPage key={m.id} data={m} />)}</div>
        </div>
        <div className="col-3 mx-3">
          <div>
            <Link className="btn btn-dark  px-3 py-1 rounded" to="/createTask">
              Add new task +
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
