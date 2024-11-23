// 页面加载完成后，执行以下操作
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
        loadComments();  // 提交成功后刷新评论
        document.getElementById('commentInput').value = '';  // 清空输入框
        document.getElementById('usernameInput').value = '';  // 清空用户名
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

    comments.reverse().forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-card';

        commentElement.innerHTML = `
            <div class="comment-header">
                <img src="default-avatar.png" class="comment-avatar" alt="Avatar">
                <div class="username">${comment.username || '匿名用户'}</div>
            </div>
            <div class="comment-content">
                <div class="time">${new Date(comment.createdAt).toLocaleString()}</div>
                <div class="text">${comment.body}</div>
            </div>
            <div class="comment-footer">
                <button class="reply-button" onclick="showReplyForm(this)">回复</button>
                <button class="like-button" onclick="likeComment(this)">${comment.likes} 👍</button>
            </div>
            <div class="reply-form" style="display:none;">
                <textarea class="reply-input" placeholder="写下你的回复..."></textarea>
                <button class="submit-reply" onclick="submitReply(this, '${comment.id}')">提交回复</button>
            </div>
            <div class="replies-container"></div>
        `;

        container.appendChild(commentElement);
    });
}

// 显示回复表单
function showReplyForm(button) {
    const replyForm = button.parentElement.nextElementSibling;
    replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
}

// 点赞功能
function likeComment(button) {
    let likeCount = parseInt(button.textContent);
    likeCount++;
    button.textContent = `${likeCount} 👍`;
}

// 提交回复功能
function submitReply(button, parentId) {
    const replyText = button.previousElementSibling.value;
    if (replyText.trim() === '') {
        alert('回复不能为空！');
        return;
    }
    // 回复逻辑待补充，需要后端支持存储父评论 ID
}
