import { Route, Routes } from "react-router"
import { EditProfile, Home } from "@src/pages"
import Layout from "@src/layout/Layout"
import PrivateLayout from "@src/layout/PrivateLayout"
import AuthProvider from "@src/context/auth/AuthProvider"

function App() {

  return (
    <AuthProvider>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateLayout />}>
            <Route path="/edit-profile/:userId" element={<EditProfile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
