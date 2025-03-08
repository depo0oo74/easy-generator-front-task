import { useState } from 'react';
import { FormGroup, Label, Button, Form } from 'reactstrap'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';
import { loginModel, ILoginForm } from '../../models/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthApis from '../../apis/authApis';

function Login() {
    // ** States
    const [payload, setPayload] = useState<ILoginForm>(loginModel)
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)

    // ** Hooks
    const navigate = useNavigate();
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();

    // ** Function to handle change
    const handleChange = (name: string, value: string) => {
        setPayload(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // ** Function to handle submit
    const onSubmit = async () => {
        interface Iresponse {
            data?: {
                access_token: string
            }
        } 
        const response: Iresponse | undefined = await AuthApis.login(payload)

        if (response) {
            login(response?.data?.access_token ?? '')
            toast.success('تم تسجيل الدخول بنجاح')
            navigate('/')
        }
    }


    return (
        <div className='auth-form'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>تسجيل الدخول</h2>
                <p>اكتب بريدك الالكتروني و كلمة المرور للدخول</p>
                <FormGroup>
                    <Label for='email'>
                        البريد الالكتروني
                    </Label>
                    <input
                        {...register('email', {
                            required: {value: true, message: 'البريد الالكتروني مطلوب'},
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'هذا البريد الالكتروني غير صالح',
                            },
                        })}
                        className='form-control'
                        name='email'
                        type='text'
                        placeholder='البريد الالكتروني ...' 
                        onChange={e => handleChange('email', e.target.value)}
                        value={payload.email}
                    />
                    {errors?.email && <span className='error-msg'>{errors?.email?.message as string}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for='password'>
                        كلمة المرور
                    </Label>
                    <Button type='button' className='show-password' onClick={() => setIsPasswordShown(!isPasswordShown)}>
                        {isPasswordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} 
                    </Button>
                    <input
                        {...register('password', {
                            required: { value: true, message: 'كلمة المرور مطلوبة' }
                        })}
                        className='form-control'
                        name='password'
                        placeholder='كلمة المرور ...' 
                        type={isPasswordShown ? 'text' : 'password'}
                        onChange={e => handleChange('password', e.target.value)}
                        value={payload.password}
                    />
                    {errors?.password && <span className='error-msg'>{errors?.password?.message as string}</span>}
                    <Link to='/forget-password' className='btn forget-password'>نسيت كلمة المرور؟</Link>
                </FormGroup>
                <p className='another-choice'>
                    ليس لديك حساب ؟ <br /> <Link to='/signup' className='btn'>قم بالتسجيل الان</Link>
                </p>
                <Button type='submit' className='btn main-btn submit'>تسجيل دخول</Button>
            </Form> 
        </div>
    )
}

export default Login