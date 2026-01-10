import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import { Provider } from "react-redux";
import { store } from "./store.ts";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="create-blog" element={<CreateBlogPage />} />
          </Route>

          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
