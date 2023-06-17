// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.


const postId = new URL(location.href).searchParams.get('postId');
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.json())
    .then(post => postBlockCreator(post));


function postBlockCreator(object) {
    const block = document.getElementsByClassName('postDetails')[0];
    const postBlock = document.createElement('div');
    postBlock.classList.add('postBlock');
    const commentsBlock = document.createElement('div');
    commentsBlock.classList.add('commentsBlock');


    for (const key in object) {
        const title = document.createElement('p');
        title.innerHTML = `<b>${key}:</b> ${object[key]}`;
        postBlock.appendChild(title);
    }

    const button = document.createElement('button');
    button.innerText = 'Comments';
    button.onclick = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(resComments => resComments.json())
            .then(comments => {
                const commentsBlock = document.getElementsByClassName('commentsBlock')[0];
                commentsBlockCreator(comments, commentsBlock)
            });
    }
    block.append(postBlock, commentsBlock);
    postBlock.appendChild(button);
}

// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

function commentsBlockCreator(arr, parent) {
    for (const commentCard of arr) {
        const commentBlock = document.createElement('ul');
        for (const key in commentCard) {
            const li = document.createElement('li');
            li.innerHTML = `<b>${key}:</b> ${commentCard[key]}`;
            parent.appendChild(commentBlock);
            commentBlock.appendChild(li);
        }

    }
}
