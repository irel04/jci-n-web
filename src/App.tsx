import { Route, Routes } from "react-router"
import { EditProfile, Home } from "@src/pages"
import Layout from "@src/layout/Layout"
import AuthProvider from "@src/context/auth/AuthProvider"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <AuthProvider>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" />
    </AuthProvider>
  )
}

export default App
