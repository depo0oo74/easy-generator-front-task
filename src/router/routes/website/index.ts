// ** import views
import Home from '../../../views/website/home'

interface Iroute {
    path: string
    component: React.ComponentType;
    layout: string
}

const websiteRoutes: Iroute[] = [
    {
        path: '/',
        component: Home,
        layout: 'default'
    },
]

export default websiteRoutes