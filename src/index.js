const baseURL = "http://localhost:3000/posts";

document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
  document
    .getElementById("new-post-form")
    .addEventListener("submit", createPost);
});

function fetchPosts() {
  fetch(baseURL)
    .then((res) => res.json())
    .then((posts) => {
      const list = document.getElementById("post-list");
      list.innerHTML = "";
      posts.forEach((post) => {
        const li = document.createElement("li");
        li.textContent = post.title;
        li.addEventListener("click", () => showPostDetail(post));
        list.appendChild(li);
      });

      if (posts.length) showPostDetail(posts[0]); // auto-show first post
    });
}

function showPostDetail(post) {
  const detail = document.getElementById("post-content");
  detail.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <small>— ${post.author}</small>
  `;
}

function createPost(e) {
  e.preventDefault();
  const form = e.target;
  const newPost = {
    title: form.title.value,
    content: form.content.value,
    author: form.author.value,
  };

  fetch(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
    .then((res) => res.json())
    .then(() => {
      form.reset();
      fetchPosts();
    });
}
