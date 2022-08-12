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
      user_name.innerText =
        user_info.role === "admin"
          ? `Welcome Admin,${user_info.username}`
          : `Welcome ,${user_info.username}`;
    }
  };

  // displayUsersInfomation = () =>{

  // }

  public  logout = async () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    location.href = "/Frontend/public/index.html";
  };
}

const singleUser = new user();
user.getUser();

logoutBtn.addEventListener("click", () => {
  singleUser.logout();
});
