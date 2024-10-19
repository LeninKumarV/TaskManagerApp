import { child, get, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../FIrebase";
import { nanoid } from "nanoid";

const ViewUpdateTask = () => {
  const { data } = useParams();
  console.log(data);

  const [taskData, setTaskData] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    const getTaskData = async () => {
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

  console.log("view", taskData);

  useEffect(() => {
    const hanndleFunc = async () => {
      const findData = taskData.find((f) => f.id === data);
      setTemp(findData);
    };
    hanndleFunc();
  }, [taskData]);

  console.log("temp", temp);

  const handleData = (e) => {
    try {
      const data = setTemp({
        id: nanoid(),
        ...temp,
        [e.target.name]: e.target.value,
      });
      console.log("ans", temp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getTaskData = async () => {
      await get(child(ref(db), `tasks`))
        .then((snapshot) => {
          if (snapshot.exists()) {
              update(ref(db,'tasks/'),temp);
              alert("updated")
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getTaskData();
  };

  //UserList -section
  const [usersLsit, setUsersList] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      await get(child(ref(db), `users`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const data = snapshot.val();
            setUsersList(Object.values(data));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUserData();
  }, []);

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
            value={temp.title}
            onChange={(e) => handleData(e)}
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
            value={temp.description}
            onChange={(e) => handleData(e)}
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
              value={temp.status}
              onChange={(e) => handleData(e)}
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
              value={temp.user}
              onChange={(e) => handleData(e)}
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
              value={temp.deadline}
              onChange={(e) => handleData(e)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ViewUpdateTask;
