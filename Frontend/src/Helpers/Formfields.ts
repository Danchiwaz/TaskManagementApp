import { emailField, errorText, password1Field, password2Field, usernameField } from "../Dom"

export const FommFieldsNotEmpty = () =>{
    if(usernameField.value === '' && emailField.value === '' && password1Field.value === '' && password2Field.value === ''){
        if(password1Field.value !==password2Field.value){
            errorText.innerText = "Password Mismatch";
        }
        errorText.innerText = "All fields are required";
    }
}