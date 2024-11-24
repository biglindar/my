document.addEventListener('DOMContentLoaded', function () {
    console.log('页面已加载完成');
    loadComments();  // 页面加载时获取评论
});

// 替换为你的 Cloudflare Worker URL
const WORKER_URL = 'https://github.doon.eu.org';

// 处理评论表单提交
document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const comment = document.getElementById('commentInput').value;

    const commentData = {
        body: comment  // 仅保存评论内容
    };

    const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    });

    if (response.ok) {
        console.log('评论提交成功');
        document.getElementById('commentInput').value = '';  // 清空输入框
        loadComments();  // 重新加载评论
    } else {
        console.log('评论提交失败');
    }
});

// 加载评论
async function loadComments() {
    const response = await fetch(WORKER_URL);
    const comments = await response.json();
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';  // 清空评论容器

    comments.forEach(comment => {
        const commentCard = document.createElement('div');
        commentCard.classList.add('comment-card');

        const commentText = document.createElement('p');
        commentText.classList.add('text');
        commentText.textContent = comment.body;

        commentCard.appendChild(commentText);
        commentsContainer.appendChild(commentCard);
    });
}
