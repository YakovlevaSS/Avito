import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import ProtectedRoute from "./components/protectedRoute";
import ArticlePage from "./pages/article/ArticlePage";
import LayoutPage from "./pages/layout/LayoutPage";
import MainPage from "./pages/main/MainPage";
import MyArticlePage from "./pages/myArticle/MyArticlePage";
import ProfilePage from "./pages/profile/ProfilePage";
import SellerProfilePage from "./pages/sellerProfile/SellerProfilePage";
import SigninPage from "./pages/signin/SigninPage";
import SignupPage from "./pages/signup/SignupPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<LayoutPage />}>
        <Route path="/" element={<MainPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/artycle/:id" element={<ArticlePage />} />
          <Route path="/myartycle/:id" element={<MyArticlePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sellerprofile/:id" element={<SellerProfilePage />} />
        </Route>
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;
