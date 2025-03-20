import { Route, Routes } from "react-router"
import { EditProfile, Home } from "@src/pages"
import { Layout } from "@src/layout"

function App() {

  return (
    <Routes >
      <Route element={<Layout />}>
        <Route path="/" element={<Home/>}/>
        <Route path="/edit-profile/:userId" element={<EditProfile/>}/>
      </Route>
    </Routes>
  )
}

export default App
