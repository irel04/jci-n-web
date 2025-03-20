import { Route, Routes } from "react-router"
import { Home } from "@src/pages"
import { Layout } from "@src/layout"

function App() {

  return (
    <Routes >
      <Route element={<Layout />}>
        <Route path="/" element={<Home/>}/>
      </Route>
    </Routes>
  )
}

export default App
