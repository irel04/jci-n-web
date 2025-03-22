import { Route, Routes } from "react-router"
import { EditProfile, Home } from "@src/pages"
import Layout from "@src/layout/Layout"
import AuthProvider from "@src/context/auth/AuthProvider"

function App() {

  return (
    <AuthProvider>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile/:userId" element={<EditProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
