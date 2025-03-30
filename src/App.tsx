import { Navigate, Route, Routes } from "react-router"
import { EditProfile, EmbeddedSystem, Home, NotFound } from "@/pages"
import Layout from "@/layout/Layout"
import AuthProvider from "@/context/auth/AuthProvider"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <AuthProvider>
      <Routes >
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/embedded-system" element={<EmbeddedSystem />} />

          {/* Redirect to NotFound for unknown routes */}
          <Route path="*" element={<Navigate to="/404" replace />} />

          {/* Not found page */}
          <Route path="/404" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={2500}/>
    </AuthProvider>
  )
}

export default App
