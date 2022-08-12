import { description, dueDate, projectInfo, projectSubmitBtn, title } from "./Dom.js";
import { clearform } from "./Helpers/clearProjectForm.js";

const listuser = document.getElementById("listuser") as HTMLSelectElement;

class Admin {
  constructor() {}

  public getusers = async () => {
    const usernames = await fetch("http://127.0.0.1:5003/users")
      .then((response) => response.json())
      .then((data) => {
        const ManyUser = data.users;
        // console.log(ManyUser);
        for (const user of ManyUser) {
          const child = document.createElement("option");
          child.value = user.username;
          child.innerText = user.username;
          listuser.appendChild(child);
     
        }
      })
      .catch((err) => console.error(err));
  };



  public insertProject = async(title:string,description:string, due_at:string, assigned_to:string) =>{
    const res = await fetch("http://127.0.0.1:5003/projects",{
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        title:title,
        description:description,
        due_at:due_at,
        assigned_to:assigned_to,
      })
    })
    const jsonResponse = await res.json()
    projectInfo.innerText = jsonResponse.message;

  };
  

  public recordData (){
    projectSubmitBtn.addEventListener('click', (e) =>{
      e.preventDefault();
   const tit: string = title.value;
   const desc: string = description.value;
   const dat: string = dueDate.value;
   const lis: string = listuser.value;

   if (tit !== "" && desc !== "" && dat !== "" && lis !== "") {
     this.insertProject(tit, desc, dat, lis);
     clearform()
   } else {
     projectInfo.innerText = "All fields are required";
   }
    })

 
  }






}



const admin = new Admin();
admin.getusers();
admin.recordData();
