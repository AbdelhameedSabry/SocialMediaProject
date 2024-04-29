import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Layout from "../Layout/Layout";
import SignIn from "../signIn/signIn";
import SignUp from "../signUp/SignUp";
import AdminMainPage from "../components/AdminMainPage";
import EditPostPage from "../post/EditPostPage";
import PostsPage from "../post/PostsPage";
import EditUserPage from "../user/EditUserPage";
import UsersPage from "../user/UsersPage";
import CategoriesPage from "../category/CategoriesPage";
import EditCategoryPage from "../category/EditCategoryPage";
import MyAccount from "../user/MyAccount";
import ProfilePage from "../profile/ProfilePage";

function Router({ setMode, mode }) {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Layout setMode={setMode} mode={mode} />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/saved-posts/:saved" element={<Home />} />
        <Route path="/home/:sectionId" element={<Home />} />
        <Route path="/my-account" element={<MyAccount />} />

        <Route path="/admin" element={<AdminMainPage />}>
          <Route index element={<EditPostPage />} />
          <Route path="/admin/addPost" element={<EditPostPage />} />
          <Route path="/admin/editPost/:id" element={<EditPostPage />} />
          <Route path="/admin/managePosts" element={<PostsPage />} />

          <Route path="/admin/addUser" element={<EditUserPage />} />
          <Route path="/admin/editUser/:id" element={<EditUserPage />} />
          <Route path="/admin/manageUsers" element={<UsersPage />} />

          <Route path="/admin/addCategory" element={<EditCategoryPage />} />
          <Route
            path="/admin/editCategory/:id"
            element={<EditCategoryPage />}
          />
          <Route path="/admin/manageCategories" element={<CategoriesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<>invalid router</>} />
    </Routes>
  );
}

export default Router;
