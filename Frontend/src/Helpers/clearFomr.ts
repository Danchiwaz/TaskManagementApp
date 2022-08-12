import { emailField, password1Field, password2Field, usernameField } from "../Dom.js"

export const clearForm = () =>{
    usernameField.value = ''
    emailField.value = ''
    password1Field.value = ''
    password2Field.value = ''
}