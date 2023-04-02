import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Question from './components/Question';


//import page content
import Home from "./routes/Home";

function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
