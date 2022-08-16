const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;
const user_name = document.getElementById("user_name")!;

interface UserInterface {
  user_id: string;
  username: string;
  email: string;
  role: string;
}
class user {

  static getUser = () => {
    const userInfo: string | null = localStorage.getItem("data");
    if (typeof userInfo === "string") {
      const user_info = JSON.parse(userInfo);
      localStorage.setItem("userId", user_info.user_id);
      user_name.innerText =
        user_info.role === "admin"
          ? `Welcome Admin,${user_info.username}`
          : `Welcome ,${user_info.username}`;
    }
  };

  public logout = async () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    location.href = "/Frontend/public/index.html";
  };

  markAsComplete() {
    console.log("markAsComlete");
  }


  public completeProject = async (id: any) => {
    try {
      await fetch(`http://127.0.0.1:5003/projects/completed/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };


  public getProjects = async () => {
    const displayUserProject = document.querySelector(
      "#displayUserProject"
    ) as HTMLDivElement;
    try {
      const userId = localStorage.getItem("userId");

      await fetch(`http://127.0.0.1:5003/users/project/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.project) {
            displayUserProject.innerHTML ="<h5 id='completeUpdate'>No Project Assigned.</h5>"
          }
          displayUserProject.innerHTML = ` <div class="project_container">
              <div class="project_headerDetails">
                <div id="user_project_header"><h6>${
                  data.project.title
                }</h6></div>
                <div class="project_Btn">
                 ${
                   !data.project.completed
                     ? `Due at:${new Date(
                         data.project.due_at
                       ).toLocaleDateString()}`
                     : `<p class="complete">Completed on:</p> ${new Date().toLocaleDateString()}`
                 }  
                
                </div>
              </div>
              <div id="project_body">
                <p id="user_project_description">${data.project.description}</p>
              </div>
              <div class="project__footer">
                <div class="project_Status">
                ${
                  !data.project.completed
                    ? "<h6 id='user_projectStatus'>Pending</h6>"
                    : "<h6>Complete</h6>"
                }
                  
                </div>
                ${
                  !data.project.completed
                    ? "<div class='assigned'><button type='button' id='completeBtn'>Mark as Complete</button>"
                    : ""
                }
              
                </div>
              </div>
            </div>`;

          // mark as complete functionality
          const completeBtn = document.querySelector(
            "#completeBtn"
          ) as HTMLButtonElement;
          completeBtn.addEventListener("click", () => {
            console.log(data.project.project_id);

            this.completeProject(data.project.project_id);
            location.reload();
          });
          // end of mark as complete
        });
    } catch (error) {}
  };
}

const singleUser = new user();
user.getUser();

logoutBtn.addEventListener("click", () => {
  singleUser.logout();
});
window.onload = () => {
  singleUser.getProjects();
};

const completeBtn = document.querySelector("#completeBtn") as HTMLButtonElement;
if (completeBtn) {
  completeBtn.addEventListener("click", () => {
    console.log("Daniel Maina");
  });
}
