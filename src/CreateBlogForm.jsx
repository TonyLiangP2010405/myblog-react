import { useState } from 'react';
import axios from 'axios';
import './CreateBlogForm.css';
import { useNavigate } from 'react-router-dom';

function CreateBlogForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = '标题不能为空';
        if (!formData.content.trim()) newErrors.content = '内容不能为空';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // 添加请求头携带token
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/blogs/create_blog',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // 更严谨的成功判断
            if (response.data && response.data.success) {
                setSuccessMessage('博客创建成功！');
                setFormData({ title: '', content: '' });

                // 调整跳转逻辑：先显示成功提示再跳转
                setTimeout(() => {
                    navigate('/blogs/get_all_blogs'); // 确保跳转到正确的路由
                }, 1500); // 1.5秒后跳转
            }
        } catch (error) {
            console.error('提交错误:', error);
            // 更详细的错误处理
            const errorMsg = error.response?.data?.message ||
                error.message ||
                '提交失败，请稍后重试';
            setErrors({ submit: errorMsg });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-blog-container">
            <h2 className="create-blog-header">创建新博客</h2>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errors.submit && <div className="error-message">{errors.submit}</div>}

            <form onSubmit={handleSubmit} className="create-blog-form">
                <div className="form-input-group">
                    <label htmlFor="title" className="form-label">标题:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        disabled={isSubmitting}
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                </div>

                <div className="form-input-group">
                    <label htmlFor="content" className="form-label">内容:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="form-input form-input-content"
                        disabled={isSubmitting}
                    />
                    {errors.content && <span className="error-text">{errors.content}</span>}
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '提交中...' : '提交'}
                </button>
            </form>
        </div>
    );
}

export default CreateBlogForm;