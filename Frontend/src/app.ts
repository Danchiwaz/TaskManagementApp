import {
  btnSign,
  emailField,
  errorText,
  form_for_login,
  loginBtn,
  login_error,
  login_form,
  password1Field,
  password2Field,
  password_login,
  SingInbtn,
  toggledesc,
  toggle_sign_form,
  usernameField,
  username_login,
} from "./Dom.js";
import { clearForm } from "./Helpers/clearFomr.js";

class User {
  constructor() {}

  toggleHero = () => {
    btnSign.addEventListener("click", () => {
      toggledesc.style.display = "none";
      login_form.style.display = "none";
      toggle_sign_form.style.display = "block";
    });
    SingInbtn.addEventListener("click", () => {
      toggledesc.style.display = "none";
      toggle_sign_form.style.display = "none";
      login_form.style.display = "block";
    });
  };

  public registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    const res = await fetch("http://127.0.0.1:5003/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const jsonresponse = await res.json();
    errorText.innerText = jsonresponse.message;
  };

  public loginUser(username: string, password: string): void {
    const prom = new Promise<{
      error?: string;
      token?: string;
      message?: string;
    }>((resolve, reject) => {
      fetch("http://localhost:5003/users/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => {
          resolve(res.json());
        })
        .catch((err) => {
          reject(err);
        });
    });

    prom
      .then((data) => {
        data.token ? localStorage.setItem("token", data.token) : "";
      })
      .catch((err) => {
        login_error.innerHTML = `<p id="error_login">Username and password required</p>`;
      });
  }

  redirect(): void {
    const token: string = localStorage.getItem("token") as string;
    console.log(token);
    new Promise<{
      user_id: string;
      username: string;
      email: string;
      role: string;
    }>((resolve, reject) => {
      fetch("http://localhost:5003/users/check", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        method: "GET",
      })
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err));
    }).then((data) => {
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data));
      if (data.role === "admin") {
          if (data.role !== "admin"){
            location.href = "/Frontend/public/errorPage/error.html";
          }
            location.href = "/Frontend/public/admin/admin.html";
      } else if (data.role === "user") {
        if (data.role !== "user"){
          location.href = "/Frontend/public/errorPage/error.html";
        }
          location.href = "/Frontend/public/users/user.html";
      }
    });
  }

  login = () => {
    form_for_login.addEventListener("submit", (e) => {
      e.preventDefault();
      if (username_login.value !== "" && password_login.value !== "") {
        this.loginUser(username_login.value, password_login.value);

        this.redirect();
      } else {
        login_error.innerHTML = `<p id="error_login">Username and password required</p>`;
      }
    });
  };

  public getData = (): void => {
    toggle_sign_form.addEventListener("submit", (e) => {
      e.preventDefault();
      const usern: string = usernameField.value;
      const emailF: string = emailField.value;
      const pass1: string = password1Field.value;
      const pass2: string = password2Field.value;
      if (usern !== "" && pass1 !== "" && pass2 !== "" && emailF !== "") {
        if (pass1 !== pass2) {
          errorText.innerText = "Password Mismatch";
        } else {
          this.registerUser(usern, emailF, pass1);

          clearForm();
        }
      } else {
        errorText.innerText = "All fields required";
      }
    });
  };
}

const user = new User();
user.login();
user.toggleHero();
user.getData();
