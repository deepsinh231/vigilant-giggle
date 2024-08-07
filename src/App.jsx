import {
  createBrowserRouter,
} from "react-router-dom";
import HomeMain from "./LoadingAndAuth/Home_Main";
import { Login, Register } from "./Pages";
import { Protected, HiroSec, Addpost, Mypost, Post, Allpost } from "./Component";

const App = createBrowserRouter([
  {
    path: "/",
    element: <HomeMain />,
    children: [
      {
        path: "/",
        element: <HiroSec />,
      },
      {
        path: "/login",
        element: (
          <Protected authetication={false}>
            <Login />
          </Protected>),
      },
      {
        path: "/signup",
        element: (
          <Protected authetication={false}>
            <Register />
          </Protected>),
      },
      {
        path: "/addpost",
        element: (
          <Protected authetication>
            {" "}
            <Addpost />
          </Protected>),
      },
      {
        path: "/mypost",
        element: (
          <Protected authetication>
            {" "}
            <Mypost />
          </Protected>),
      },
      {
        path: "/post/:_id",
        element: (
          <Protected authetication>
            {" "}
            <Post />
          </Protected>),
      },
      {
        path: "/allposts",
        element: (
          <Protected authetication>
            {" "}
            <Allpost />
          </Protected>),
      },
      {
        path: "*",
        element: <div>Erro</div>,
      }
    ]
  },


]);
export default App;