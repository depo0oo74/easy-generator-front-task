// ** import views
import Login from '../../../views/auth/Login'
import SignUp from '../../../views/auth/SignUp'

interface Iroute {
    path: string
    component: React.ComponentType;
    layout: string
}

const authRoutes: Iroute[] = [
    {
        path: '/login',
        component: Login,
        layout: 'auth'
    },
    {
        path: '/signup',
        component: SignUp,
        layout: 'auth'
    }
]

export default authRoutes