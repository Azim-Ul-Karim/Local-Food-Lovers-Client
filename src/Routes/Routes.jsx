import { createBrowserRouter } from "react-router";
import PathError from "./PathError";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AllReviews from "../Pages/AllReviews/AllReviews";
import MyReviews from "../Pages/MyReviews/MyReviews";
import AddReview from "../Pages/MyReviews/AddReview";
import MyFavorites from "../Pages/MyFavorites/MyFavorites";
import ForgetPassword from "../Pages/Authentication/ForgetPassword";
import PrivateRoute from "../Contexts/PrivateRoute";
import ReviewDetails from "../Pages/AllReviews/ReviewDetails";
import EditReview from "../Pages/MyReviews/EditReview";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        errorElement: PathError,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'all-reviews',
                Component: AllReviews
            },
            {
                path: 'review-details/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/reviews/${params.id}`),
                element: (
                    <PrivateRoute>
                        <ReviewDetails></ReviewDetails>
                    </PrivateRoute>
                )
            },
            {
                path: 'my-reviews',
                element: (
                    <PrivateRoute>
                        <MyReviews></MyReviews>
                    </PrivateRoute>
                )
            },
            {
                path: 'add-review',
                element: (
                    <PrivateRoute>
                        <AddReview></AddReview>
                    </PrivateRoute>
                )
            },
            {
                path:'edit-review/:id',
                element: (
                    <PrivateRoute>
                        <EditReview></EditReview>
                    </PrivateRoute>
                )
            },
            {
                path: 'my-favorites',
                element: (
                    <PrivateRoute>
                        <MyFavorites></MyFavorites>
                    </PrivateRoute>
                )
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'forget-password',
                Component: ForgetPassword
            }
        ]
    }
])