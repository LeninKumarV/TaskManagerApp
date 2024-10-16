import React from "react";
import { Link } from "react-router-dom";

const TaskPage = ({ data }) => {

  return (
    <Link to={`viewTask/${data.id}`}>
      <div
        className="br-light"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <div className="card mt-3 shadow-sm">
          <div className="card-body">
            <h5>{data.title}</h5>
            <p>{data.description}</p>
            <span style={{ fontSize: "12px" }}>Deadline: {data.deadline}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TaskPage;
