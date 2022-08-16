import { projectInterface } from "../interfaces/projectsInterface";

export const TaskRendering = (data:projectInterface[]) =>{
    return data
      .map(
        (dat) => `
    <div class="project_container">
    
                <div class="project_headerDetails">
                  <h6 id="project_header">${dat.title}</h6>
                  <div class="project_Btn">
                  ${
                    !dat.completed
                      ? `<button data-id="${dat.project_id}" id="updateBtn">update</button>
                    <button data-id="${dat.project_id}" id="deleteBtn" >Delete</button>`
                      : `<button data-id="${dat.project_id}"  id="deleteBtn">Delete</button>`
                  }
                    
                  </div>
                </div>
                <div id="project_body">
                  <p class="project_description">${dat.description}</p>
                </div>
                <div class="project__footer">
                   <div class="project_Status">
                    <h6>${!dat.completed ? "Pending" : "Completed"}</h6>
                    
                   </div>
                   <div class="assigned">
                   ${
                     !dat.completed
                       ? `<h6>Assgined to:</h6>
                      <h6 id="assignedName">${dat.username}</h6>`
                       : `<h6>Done By:</h6>
                      <h6 id="assignedName">${dat.username}</h6>`
                   }
                      
                    </div>
                </div>
              </div>
    `
      )
      .join(" ");
}


export const completedProjects = (data: projectInterface[]) => {
  return data
    .map(
      (dat) => `
      
    <div class="project_container">
    
                <div class="project_headerDetails">
                  <h6 id="project_header">${dat.title}</h6>
                  <div class="project_Btn"><button data-id="${dat.project_id}"  id="deleteBtn">Delete</button>
                  
                    
                  </div>
                </div>
                <div id="project_body">
                  <p class="project_description">${dat.description}</p>
                </div>
                <div class="project__footer">
                   <div class="project_Status">
                    <h6>Completed</h6>
                    
                   </div>
                   <div class="assigned">
                  
                       <h6>Done By:</h6>
                      <h6 id="assignedName">${dat.username}</h6>
                   }
                      
                    </div>
                </div>
              </div>
    `
    )
    .join(" ");
};


