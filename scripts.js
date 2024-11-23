document.addEventListener('DOMContentLoaded', function () {
    console.log('页面已加载完成');
    loadComments();  // 页面加载时获取评论
});

// 替换为你的 Cloudflare Worker URL
const WORKER_URL = 'https://github-tok.biglindar.worker.dev';

document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const comment = document.getElementById('commentInput').value;

    const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: comment })
    });

    if (response.ok) {
        alert('评论提交成功！');
        loadComments();  // 刷新评论
        document.getElementById('commentInput').value = '';  // 清空输入框
    } else {
        alert('评论提交失败，请稍后重试。');
    }
});

async function loadComments() {
    const response = await fetch(WORKER_URL);
    const comments = await response.json();
    
    const container = document.getElementById('commentsContainer');
    container.innerHTML = '';  // 清空旧评论

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.textContent = comment.body;
        container.appendChild(commentElement);
    });
}
