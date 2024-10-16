import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="d-flex my-5">
        <div className="col-3 mx-3">
          <div className="bg-primary px-3 py-2 rounded" style={{color:"white"}}>Todo</div>
          <div className="d-flex align-items-start">Task</div>
        </div>
        <div className="col-3 mx-3">
          <div className="bg-warning px-3 py-2 rounded" style={{color:"white"}}>In Progress</div>
          <div className="d-flex align-items-start">Task</div>
        </div>
        <div className="col-3 mx-3">
          <div className="bg-success px-3 py-2 rounded" style={{color:"white"}}>Done</div>
          <div className="d-flex align-items-start">Task</div>
        </div>
        <div className="col-3 mx-3">
          <div>
            <Link
              className="btn btn-dark  px-3 py-1 rounded"
              to="/addTask"
            //   style={{ backgroundColor: "#333", color: "white",textDecoration:"none" }}
            >
              Add new task +
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
