import './App.css'
import './navigation.jsx'
import Navigation from "./navigation.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AllBlogs from "./AllBlogs.jsx";

function App() {
  return (
      <Router>
        <Navigation />
          <Routes>
              <Route path="/blogs/get_all_blogs" element={<AllBlogs />} />
          </Routes>
      </Router>

  )
}

export default App
