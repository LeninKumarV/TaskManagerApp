import React from "react";
import { Link } from "react-router-dom";

const TaskPage = ({ data }) => {

  return (
    <Link to={`viewTask/${data.id}`} style={{ textDecoration:"none"}}>
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
            {
              data.title.length>20 ? 
              <h5>{data.title.slice(0,50)}...</h5>
              :
              <h5>{data.title}</h5>
            }
            
            {
              data.description.length>50 ? 
              <p>{data.description.slice(0,50)}...</p>
              :
              <p>{data.description}</p>
            }
            <span style={{ fontSize: "12px" }}>Deadline: {data.deadline}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TaskPage;
