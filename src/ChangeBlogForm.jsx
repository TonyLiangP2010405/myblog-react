import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChangeBlogForm.css';
import { Atom } from "react-loading-indicators";

function UpdateBlogForm() {  // 1. More descriptive component name
    const { id } = useParams();
    const navigate = useNavigate();  // 2. Added for navigation after submit
    const [blog, setBlog] = useState({ title: '', content: '' });  // 3. Initialize with proper structure
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});  // 4. Changed to object for multiple errors
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // 5. Added cleanup for useEffect
    useEffect(() => {
        let isMounted = true;

        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/blogs/get_blog/${id}`);
                if (isMounted) {
                    setBlog(response.data);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setErrors({
                        fetch: error.response?.data?.message || 'Failed to load blog'
                    });
                    setLoading(false);
                }
            }
        };

        fetchBlog();

        return () => { isMounted = false };  // 6. Prevent state updates on unmounted component
    }, [id]);  // 7. Added dependency array

    const validateForm = () => {
        const newErrors = {};
        if (!blog.title.trim()) newErrors.title = '标题不能为空';
        if (!blog.content.trim()) newErrors.content = '内容不能为空';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // 8. Changed to PUT method for proper REST semantics
            const response = await axios.put(
                `http://localhost:3000/blogs/update_blog/${id}`,
                blog
            );
            console.log(response.data)
            if (response.status === 200) {
                setSuccessMessage('博客更新成功！');
                // 9. Redirect after success
                setTimeout(() => navigate(`/blogs/${id}`), 2000);
            }
        } catch (error) {
            console.error('提交错误:', error);
            setErrors({
                submit: error.response?.data?.message || '提交失败，请稍后重试'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setBlog(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        // 10. Clear error when user modifies field
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        }
    };

    if (loading) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%'
        }}><Atom color="#15d2f1" size="medium" text="加载中。。。" textColor="#15d2f1" /></div>
    );

    if (errors.fetch) return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h2 className="error-title">访问错误</h2>
                <p className="error-message">{errors.fetch}</p>
                <button
                    className="retry-button"
                    onClick={() => window.location.reload()}
                    aria-label="重新加载"
                >
                    重新加载
                </button>
            </div>
        </div>
    );

    return (
        <div className="update-blog-container">  {/* 11. Unique class name */}
            <h2 className="update-blog-header">编辑博客</h2>  {/* 12. Updated header text */}

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                    <div className="loading-bar"></div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="update-blog-form">
                <div className="form-input-group">
                    <label htmlFor="title" className="form-label">标题:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        className={`form-input ${errors.title ? 'input-error' : ''}`}
                        disabled={isSubmitting}
                        aria-describedby="title-error"
                    />
                    {errors.title && (
                        <span id="title-error" className="error-text">{errors.title}</span>
                    )}
                </div>

                <div className="form-input-group">
                    <label htmlFor="content" className="form-label">内容:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        className={`form-input form-input-content ${
                            errors.content ? 'input-error' : ''
                        }`}
                        disabled={isSubmitting}
                        aria-describedby="content-error"
                    />
                    {errors.content && (
                        <span id="content-error" className="error-text">{errors.content}</span>
                    )}
                </div>

                {errors.submit && (
                    <div className="submit-error">{errors.submit}</div>
                )}

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? '提交中...' : '更新博客'}  {/* 13. Updated button text */}
                </button>
            </form>
        </div>
    );
}

export default UpdateBlogForm;