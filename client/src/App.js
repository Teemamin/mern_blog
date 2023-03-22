
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SharedLayout from './pages/SharedLayout';
import {AllPosts,AddPost,EditPost,Login,PostDetail,Profile,Register} from './pages'
import { AuthAction } from "./components/AuthForm";
import ErrorPage from "./components/ErrorHandler";
import { allPostsLoader } from "./components/PostsContainer";
import {loader as postDetailLoader} from './pages/PostDetail'
import { useAppContext } from "./context/appContext";



function App() {
  const appContext = useAppContext();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SharedLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          element: <AllPosts/>,
          loader: allPostsLoader
        },
        {
          path: ':id',
          children: [
            {
              index: true,
              element: <PostDetail/>,
              loader: postDetailLoader
            },
             {
              path: 'edit-post',
              element: <EditPost/>
            },
          ]
        },
        {
            path: 'add-post',
            element: <AddPost/>
        },
         {
        path: 'profile',
        element: <Profile/>
      },
        {
        path: 'login',
        element: <Login/>,
        action: AuthAction(appContext)
      },
    {
      path: 'register',
      element: <Register/>
    },
      ]
    },
   
  ])
  
  return (
    
       <RouterProvider router={router} />
      
  
  );
}

export default App;
