import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import {
  Authentication,
  Signup,
  Signin,
  Blogs,
  AddBlog,
  IndividualBlog,
  Profile,
  UpdateUsername,
  UpdatePassword,
  EditBlog,
  Users
} from "./components";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./app/store.js";
import { signin } from "./features/AuthSlice/UseAuth.js";

const AppRoutes = () => {
  let token = "";
  const dispatch = useDispatch();
  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) {
      dispatch(signin());
    }
  }, [dispatch, token]);
  const isAuthenticated = useSelector(
    (state) => state.authStatus.isAuthenticated
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<Layout />}>
        {isAuthenticated ? (
          <Route path="/" element={<Blogs />} />
        ) : (
          <Route path="/" element={<Authentication />} />
        )}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/blog/:blogID" element={<IndividualBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-username" element={<UpdateUsername />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/blog/edit/:blogID" element={<EditBlog />} />
        <Route path="/users" element={<Users />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>
);
