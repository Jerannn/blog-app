import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import ProtectedRoute from "./ui/ProtectedRoute.tsx";
import PublicRoute from "./ui/PublicRoute.tsx";
import { Toaster } from "react-hot-toast";
import CenterContent from "./ui/CenterContent.tsx";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="create-blog" element={<CreateBlogPage />} />
          </Route>

          <Route
            path="register"
            element={
              <PublicRoute>
                <CenterContent>
                  <RegistrationPage />
                </CenterContent>
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <CenterContent>
                  <LoginPage />
                </CenterContent>
              </PublicRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </Provider>
  );
}
