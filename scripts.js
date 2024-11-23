document.addEventListener('DOMContentLoaded', function () {
    console.log('页面已加载完成');
    loadComments();  // 页面加载时获取评论
});

// 替换为你的 Cloudflare Worker URL
const WORKER_URL = 'https://github.doon.eu.org';

// 处理评论表单提交
document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value;
    const comment = document.getElementById('commentInput').value;

    const commentData = {
        username: username,
        body: comment,
        createdAt: new Date().toISOString()  // 添加当前时间戳
    };

    const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    });

    if (response.ok) {
        loadComments();  // 提交成功后刷新评论
        document.getElementById('commentInput').value = '';  // 清空输入框
        document.getElementById('usernameInput').value = '';  // 清空用户名输入框
    } else {
        alert('评论提交失败，请稍后重试。');
    }
});

// 加载评论
async function loadComments() {
    const response = await fetch(WORKER_URL);
    const comments = await response.json();
    
    const container = document.getElementById('commentsContainer');
    container.innerHTML = '';  // 清空旧评论

    comments.reverse().forEach(comment => {  // 确保最新评论显示在最前
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-card';

        // 格式化时间，确保不会显示 "Invalid Date"
        const formattedDate = comment.createdAt ? new Date(comment.createdAt).toLocaleString() : '时间未知';

        commentElement.innerHTML = `
            <div class="username">${comment.username || '匿名用户'}</div>
            <div class="time">${formattedDate}</div>
            <div class="text">${comment.body}</div>
        `;
        container.appendChild(commentElement);
    });
}
