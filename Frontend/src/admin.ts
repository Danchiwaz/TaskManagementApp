import { addProjects, allBtn, completeProject, description, displayCompletedProj, displayProjects, dueDate, formProject, projectInfo, projectSubmitBtn, projNumber, title, updateBtn} from "./Dom.js";
import { clearform } from "./Helpers/clearProjectForm.js";
import { TaskRendering } from "./Helpers/renderToDom.js";
import { projectInterface } from "./interfaces/projectsInterface.js";

const listuser = document.getElementById("listuser") as HTMLSelectElement;

class Admin {
  constructor() {}

  public toggleAdmin = () => {
    allBtn.addEventListener("click", () => {
      formProject.style.display = "none";
      displayCompletedProj.style.display = "none";
      displayProjects.style.display = "block";
    });
    addProjects.addEventListener("click", () => {
      displayCompletedProj.style.display = "none";
      displayProjects.style.display = "none";
      formProject.style.display = "block";
    });
    completeProject.addEventListener("click", () => {
      displayProjects.style.display = "none";
      formProject.style.display = "none";
      displayCompletedProj.style.display = "block";
    });
  };

  public getusers = async () => {
    const usernames = await fetch("http://127.0.0.1:5003/users")
      .then((response) => response.json())
      .then((data) => {
        const ManyUser = data.users;
        for (const user of ManyUser) {
          const child = document.createElement("option");
          child.value = user.username;
          child.innerText = user.username;
          listuser.appendChild(child);
        }
      })
      .catch((err) => console.error(err));
  };

  public insertProject = async (
    title: string,
    description: string,
    due_at: string,
    assigned_to: string
  ) => {
    const res = await fetch("http://127.0.0.1:5003/projects", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        due_at: due_at,
        assigned_to: assigned_to,
      }),
    });
    const jsonResponse = await res.json();
    projectInfo.innerText = jsonResponse.message;
    setTimeout(() => {
      formProject.style.display = "none";
      displayCompletedProj.style.display = "none";
      displayProjects.style.display = "block";
      location.reload();
    }, 1000);
  };

  public deleteProject = async (id: any) => {
    const project_update = document.getElementById("project_update")!;
    await fetch(`http://127.0.0.1:5003/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        project_update.innerText = data.message;
      })
      .catch((err) => console.log(err));
    
  };

  public populateForm = async (id:any) =>{
    await fetch(`http://127.0.0.1:5003/projects/singleproject/${id}`)
    .then(response => response.json())
    .then(data =>{
      title.value = data.singleProject.title;
      description.value = data.singleProject.description;
      dueDate.value = data.singleProject.due_at;
      listuser.value = data.singleProject.username;
      
    })
    .catch(err => console.log(err))
  }

  public listProjects = async () => {
    await fetch("http://127.0.0.1:5003/projects")
      .then((res) => res.json())
      .then((data) => {
        
        displayProjects.innerHTML = !TaskRendering(data)
          ? "<h5>No Tasks available</h5>"
          : TaskRendering(data);

        projNumber.innerText = data.length;
        const deleteBtn = document.querySelectorAll("#deleteBtn");
        const updateBtn = document.querySelectorAll("#updateBtn");
        
        // delete buttons 
        for (const deleteB of deleteBtn) {
          deleteB.addEventListener("click", (e) => {
            if (e.target) {
              const target = e.target as HTMLElement;
              const id = target.getAttribute("data-id");
              if (id) {
                this.deleteProject(id);
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }else{
                console.log('error occured');
                
              }
            }
          });
        }
        // end of the delete buttons 
       
        // update btn  
        for (const updateB of updateBtn) {
          updateB.addEventListener("click", (e) => {
            if (e.target) {
              const target_update = e.target as HTMLElement;
              const id_update = target_update.getAttribute("data-id");
              if (id_update) {
               displayCompletedProj.style.display = "none";
               displayProjects.style.display = "none";
               formProject.style.display = "block";
               projectSubmitBtn.value = "Update Task"

               this.populateForm(id_update)
              }
            }
          });
        }
        // end of the update btn 


      })
      .catch((err) => console.log(err));
  };

  public recordData() {
    projectSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const tit: string = title.value;
      const desc: string = description.value;
      const dat: string = dueDate.value;
      const lis: string = listuser.value;

      if (tit !== "" && desc !== "" && dat !== "" && lis !== "") {
        this.insertProject(tit, desc, dat, lis);
        clearform();
      } else {
        projectInfo.innerText = "All fields are required";
      }
    });
  }

  //  update the task 

//  end of the update task 


}



const admin = new Admin();
admin.getusers();
admin.recordData();
admin.toggleAdmin();
admin.listProjects();

