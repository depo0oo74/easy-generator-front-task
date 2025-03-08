import { useState } from 'react';
import { FormGroup, Label, Button, Form } from 'reactstrap'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';
import { signUpModel, ISignUpForm } from '../../models/auth'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthApis from '../../apis/authApis'

function Signup() {
    // ** States
    const [payload, setPayload] = useState<ISignUpForm>(signUpModel)
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
    const [isCPasswordShown, setIsCPasswordShown] = useState<boolean>(false)

    // ** Hooks
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<ISignUpForm>();

    // ** Function to handle change
    const handleChange = (name: string, value: string) => {
        setPayload(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // ** Function to handle submit
    const onSubmit = async () => {
        const response = await AuthApis.signup(payload)
        if (response) {
            toast.success('تم انشاء المستخدم بنجاح , قم بتسجيل الدخول الان')
            navigate('/login')
        }
    }


    return (
        <div className='auth-form'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>تسجيل حساب جديد</h2>
                <p>مرحباً بك ، أدخل بياناتك للإستمرار</p>
                <p className='another-choice header-choice'>
                  لديك حساب الفعل ؟  <br /> <Link to="/login" className='btn'>قم بتسجيل الدخول</Link>
                </p>
                <FormGroup>
                    <Label for='username'>
                        اسم المستخدم
                    </Label>
                    <input
                        {...register('username', {
                            required: {value: true, message: 'اسم المستخدم مطلوب'},
                            minLength: {value: 3, message: 'اسم المستخدم يجب ان يحتوي علي الاقل علي 3 حروف'}
                        })}
                        className='form-control'
                        name='username'
                        type='text'
                        placeholder='اسم المستخدم ...' 
                        onChange={e => handleChange('username', e.target.value)}
                        value={payload.username}
                    />
                    {errors?.username && <span className='error-msg'>{errors?.username?.message as string}</span>}
                </FormGroup>
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
                            required: { value: true, message: 'كلمة المرور مطلوبة' },
                            minLength: { value: 8, message: 'كلمة المرور يجب ان تحتوي علي الاقل علي 8 حروف' },
                            validate: {
                              containsOneNumber: value =>
                                /\d/.test(value) || 'كلمة المرور يجب ان تحتوي علي الاقل علي رقم واحد',
                              containsOneLetter: value =>
                                /[A-Za-z]/.test(value) || 'كلمة المرور يجب ان تحتوي علي الاقل علي حرف واحد',
                              containsOneSpecialCharacter: value =>
                                /[^A-Za-z0-9\s]/.test(value) || 'كلمة المرور يجب ان تحتوي علي الاقل علي رمز واحد',
                            }
                        })}
                        className='form-control'
                        name='password'
                        placeholder='كلمة المرور ...' 
                        type={isPasswordShown ? 'text' : 'password'}
                        onChange={e => handleChange('password', e.target.value)}
                        value={payload.password}
                    />
                    {errors?.password && <span className='error-msg'>{errors?.password?.message as string}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for='cpassword'>
                        تأكيد كلمة المرور
                    </Label>
                    <Button type='button' className='show-password' onClick={() => setIsCPasswordShown(!isCPasswordShown)}>
                        {isCPasswordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} 
                    </Button>
                    <input
                        {...register('cpassword', {
                            required: { value: true, message: 'تأكيد كلمة المرور مطلوبة' },
                            validate: {
                              matchPassword: value =>
                                payload.password == value || 'كلمات المرور غير متطابقة',
                            }
                        })}
                        className='form-control'
                        name='cpassword'
                        placeholder='تأكيد كلمة المرور ...' 
                        type={isCPasswordShown ? 'text' : 'password'}
                        onChange={e => handleChange('cpassword', e.target.value)}
                        value={payload.cpassword}
                    />
                    {errors?.cpassword && <span className='error-msg'>{errors?.cpassword?.message as string}</span>}
                </FormGroup>
                <p className='another-choice'>
                  بالتسجيل انا أوافق على  <br /> <Link to="/terms-conditions" className='btn'>الشروط والأحكام</Link>
                </p>
                <Button type='submit' className='btn main-btn submit'>تسجيل حساب جديد</Button>
            </Form> 
        </div>
    )
}

export default Signup