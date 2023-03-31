import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SharedLayout from './pages/SharedLayout';
import {AllPosts,AddPost,EditPost,Login,PostDetail,Profile} from './pages'
import { authAction } from "./components/AuthForm";
import ErrorPage from "./components/ErrorHandler";
import { allPostsLoader } from "./components/PostsContainer";
import {loader as postDetailLoader} from './pages/PostDetail'
import { action as addPostAction } from "./components/PostForm";
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
          loader: allPostsLoader(appContext)
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
            element: <AddPost/>,
            action: addPostAction(appContext)
        },
         {
        path: 'profile',
        element: <Profile/>
      },
        {
        path: 'login',
        element: <Login/>,
        action: authAction(appContext)
      },
      ]
    },
   
  ])
  
  return (
    
       <RouterProvider router={router} />
      
  
  );
}

export default App;
