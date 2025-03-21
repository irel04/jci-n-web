import { Route, Routes } from "react-router"
import { EditProfile, Home } from "@src/pages"
import { Layout, PrivateLayout } from "@src/layout"
import { AuthProvider } from "@src/auth"

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
