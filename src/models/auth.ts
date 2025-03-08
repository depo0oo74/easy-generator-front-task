// Login form interface
export interface ILoginForm {
    email: string,
    password: string
}

// Login form model schema
export const loginModel: ILoginForm = {
    email: '',
    password: ''
}

// Signup form interface
export interface ISignUpForm {
    username: string,
    email: string,
    password: string,
    cpassword: string,
}

// Login form model schema
export const signUpModel: ISignUpForm = {
    username: '',
    email: '',
    password: '',
    cpassword: ''
}