import { RouterProvider } from "react-router-dom"
import { router } from "./router" // Adjust the path if your router config is in another file

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
