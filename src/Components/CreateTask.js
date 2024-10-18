import React, { useEffect, useState } from "react";
import { db } from "../FIrebase";
import { child, get, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

const CreateTask = () => {

  const [formData, setFormData] = useState([{
    title:null,
    description:null,
    status:null,
    user:null,
    deadline:null,
  }]);

  const [usersLsit, setUsersList] = useState([]);

  const getUserData = () => {
    get(child(ref(db), `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setUsersList(Object.values(data));
          console.log(usersLsit);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUserData()
  },[]);

  const handleData=async (e)=>{
    try{
      const data=await setFormData({id:nanoid(),...formData,[e.target.name]:e.target.value})
    }
    catch(error){
      console.log(error);
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const taskId=uuidv4();
    set(ref(db, "tasks/" + taskId),formData);
    console.log(taskId);
    setFormData({
      title:null,
      description:null,
      status:null,
      user:null,
      deadline:null,
    })
  }


  return (
    <div
      className="mt-5 mx-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      <h2>Add Task</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle1" className="form-label">
            Title
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputTitle1"
            name="title"
            onChange={(e)=>handleData(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputDescription1" class="form-label">
            Description
          </label>
          <textarea
            type="password"
            className="form-control"
            id="exampleInputDescription1"
            style={{ height: "20vh" }}
            name="description"
            value={formData.description}
            onChange={(e)=>handleData(e)}
          />
        </div>

        <div className="d-flex">
          <div className="mb-3 col-3 me-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="status"
              name="status"
              onChange={(e)=>handleData(e)}
            >
              <option>Select Status</option>
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="mb-3 col-3 me-3">
            <label htmlFor="assigned-user" className="form-label">
              Assigned User
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="status"
              name="user"
              onChange={(e)=>handleData(e)}
            >
              <option>Select User</option>
              {usersLsit.map((m) => {
                return (
                  <option value={m.email} key={m.id}>
                    {m.username} '{m.email}'
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3 col-3 me-3">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              className="form-control"
              name="deadline"
              id="deadline"
              onChange={(e)=>handleData(e)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={(e)=>handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
