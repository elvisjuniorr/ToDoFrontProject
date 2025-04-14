import ToDo from "./components/ToDo"
import Header from "./components/Header"
import { BrowserRouter ,Routes , Route} from "react-router-dom"
import './index.css'
import { LogIn } from "./components/LogIn"
import { SignUp } from "./components/SignUp"


function App() {
  return (
    <div>
      <BrowserRouter>          
        <Header />
        <Routes>
          <Route path="/" element={<ToDo/>} />
          <Route path="/LogIn" element={<LogIn/>} />
          <Route path="/SignUp" element={<SignUp/>} />
        </Routes>  
      </BrowserRouter> 
    </div>
  )
}

export default App
