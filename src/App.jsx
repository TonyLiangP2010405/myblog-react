import './App.css'
import './navigation.jsx'
import Navigation from "./navigation.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AllBlogs from "./AllBlogs.jsx";
import CreateBlogForm from "./CreateBlogForm.jsx";
import Background from "./index.jsx";
import ChangeBlogForm from "./ChangeBlogForm.jsx";
import ShowBlogDetail from "./ShowBlogDetail.jsx";

function App() {
  return (
      <div className="app-container">
          <Background />
          <div className="content-wrapper">
          <Router>
            <Navigation />
              <Routes>
                  <Route path="/blogs/get_all_blogs" element={<AllBlogs />} />
                  <Route path="/blogs/create_blog_form" element={<CreateBlogForm />} />
                  <Route path="/blogs/update_blog/:id" element={<ChangeBlogForm />} />
                  <Route path="/blogs/get_blog/:id" element={<ShowBlogDetail />} />
              </Routes>
          </Router>
          </div>
      </div>

  )
}

export default App
