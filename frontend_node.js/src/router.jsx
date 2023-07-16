import { createBrowserRouter } from "react-router-dom";
import {
    MainPage,
    ErrorPage,
    ActorsPage,
    DoramsPage,
    ActorsInfo,
    DoramsInfo,
    Authorization,
    Registration
} from "./routes/index"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Authorization />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/actors',
        element: <ActorsPage />,
    },
    {
        path: "/actors/:actorsId",
        element: <ActorsInfo />
    },
    {
        path: '/doram',
        element: <DoramsPage />,
    },
    {
        path: "/doram/:doramsId",
        element: <DoramsInfo />
    },
    {
        path: '/main',
        element: <MainPage />,
    },
    {
        path: '/regis',
        element: <Registration />,
    }
]);

export default router;