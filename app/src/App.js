import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PersistLogin from "./services/PersistLogin";
import RequireAuth from "./services/RequireAuth";
import { Welcome, Signup, Login } from "./features/user-accounts";
import { BrowsePage } from "./features/browse";
import { Profile } from "./features/user-profile/";
import ErrorPage from "./pages/error/ErrorPage";
import ResetPassword from "./features/reset-password";
import { TitlePage } from "./features/title-view";
import { WatchlistPage } from "./features/watchlist";
import { Preferences } from "./features/preferences";
import { VideoPage } from "./features/video-player";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route index element={<BrowsePage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="title/:id" element={<TitlePage />} />
              <Route path="watchlist" element={<WatchlistPage />} />
              <Route path="preferences" element={<Preferences />} />
              <Route path="video" element={<VideoPage />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="welcome" element=<Welcome /> />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />

          <Route
            path="*"
            element={<ErrorPage code={404} message="Page not found" />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
