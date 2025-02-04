import {useState, useEffect} from "react";
import axios from 'axios'
import './AllBlogs.css';
import {Atom} from "react-loading-indicators";

function AllBlogs () {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/blogs/get_all_blogs');
                setBlogs(response.data);
            }
            catch (error) {
                console.log(error.response.data);
                setError(error.response.data.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [])
    if (loading) return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%'
    }}><Atom color="#15d2f1" size="medium" text="加载中。。。" textColor="#15d2f1" /></div>;
    if (error) return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h2 className="error-title">访问错误</h2>
                <p className="error-message">{error}</p>
                <button
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    重新加载
                </button>
            </div>
        </div>
    );


    return (
        <div className="blog-page">
            <h1>All Blogs</h1>
            <div className="blog-list">
                {blogs.map(blog => (
                    <div key={blog.id} className="blog-card">
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllBlogs;