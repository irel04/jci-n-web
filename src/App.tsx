import AuthProvider from "@/auth/AuthProvider"
import AdminLayout from "@/layout/AdminLayout"
import ClientLayout from "@/layout/ClientLayout"
import Layout from "@/layout/Layout"
import { AdminHome, EditProfile, EmbeddedSystem, Home, NotFound } from "@/pages"
import { Navigate, Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <AuthProvider>
      <Routes >
        <Route element={<Layout/>}>
          {/* Client */}
          <Route element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="/edit-profile" element={<EditProfile />} />

            <Route path="/embedded-system" element={<EmbeddedSystem />} />
          </Route>

          {/* Admin */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminHome />} />
          </Route>

          {/* Special Page */}
          {/* Redirect to NotFound for unknown routes */}
          <Route path="*" element={<Navigate to="/404" replace />} />
          {/* Not found page */}
          <Route path="/404" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={2500} />
    </AuthProvider>
  )
}

export default App
