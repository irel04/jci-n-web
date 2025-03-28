import { Route, Routes } from "react-router"
import { EditProfile, EmbeddedSystem, Home } from "@/pages"
import Layout from "@/layout/Layout"
import AuthProvider from "@/context/auth/AuthProvider"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <AuthProvider>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/embedded-system" element={<EmbeddedSystem/>}/>
      </Routes>
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={2500}/>
    </AuthProvider>
  )
}

export default App
