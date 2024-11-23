document.addEventListener('DOMContentLoaded', function () {
    console.log('页面已加载完成');
    loadComments();  // 页面加载时获取评论
});

const WORKER_URL = 'https://github.doon.eu.org';

document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value;
    const comment = document.getElementById('commentInput').value;

    const commentData = {
        username: username,
        body: comment,
        createdAt: new Date().toISOString(),
        likes: 0
    };

    const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    });

    if (response.ok) {
        loadComments();
        document.getElementById('commentInput').value = '';
        document.getElementById('usernameInput').value = '';
    } else {
        alert('评论提交失败，请稍后重试。');
    }
});

async function loadComments() {
    const response = await fetch(WORKER_URL);
    const comments = await response.json();
    
    const container = document.getElementById('commentsContainer');
    container.innerHTML = '';

    comments.reverse().forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-card';
        commentElement.innerHTML = `
            <div class="username">${comment.username || '匿名用户'}</div>
            <div class="time">${new Date(comment.createdAt).toLocaleString()}</div>
            <div class="text">${comment.body}</div>
            <button class="like-button">${comment.likes} 👍</button>
        `;
        container.appendChild(commentElement);
    });
}
