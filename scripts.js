// 页面加载完成后，执行以下操作
document.addEventListener('DOMContentLoaded', function () {
    console.log('页面已加载完成');
    
    // 这里可以添加更多的交互逻辑
});

// === 评论系统代码开始 ===

// 替换为你的 Cloudflare Worker URL
const WORKER_URL = 'https://github-tok.biglindar.workers.dev/';  // 替换为 Cloudflare Worker 的实际 URL

document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const comment = document.getElementById('commentInput').value;

    // 发送请求提交评论
    const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: comment })
    });

    if (response.ok) {
        alert('评论提交成功！');
        loadComments();  // 提交成功后刷新评论
        document.getElementById('commentInput').value = '';  // 清空输入框
    } else {
        alert('评论提交失败，请稍后重试。');
    }
});

// 加载评论
async function loadComments() {
    const response = await fetch(WORKER_URL);  // 从 Cloudflare Worker 拉取评论
    const comments = await response.json();
    
    const container = document.getElementById('commentsContainer');
    container.innerHTML = '';  // 清空旧评论

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.textContent = comment.body;
        container.appendChild(commentElement);
    });
}

// 页面加载时获取评论
document.addEventListener('DOMContentLoaded', loadComments);

// === 评论系统代码结束 ===
