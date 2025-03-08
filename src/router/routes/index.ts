import websiteRoutes from "./website";
import authRoutes from "./auth";

const routes = [
    ...authRoutes,
    ...websiteRoutes
]

export default routes