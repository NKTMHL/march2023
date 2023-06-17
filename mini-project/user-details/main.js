// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули

const userId = new URL(location.href).searchParams.get('userId');
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
        const userDetails = document.getElementsByClassName('details')[0];
        const ul = document.createElement('ul');
        const postsBlock = document.createElement('div');
        postsBlock.classList.add('postsBlock');
        recursiveBuild(user, ul)

        // 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
        // (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)


        const button = document.createElement('button');
        button.innerText = 'post of current user';
        button.onclick = () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then((resPostsTitle) => resPostsTitle.json())
                .then(posts => {
                    const postsBlock = document.getElementsByClassName('postsBlock')[0];
                    postCreator(posts, postsBlock)
                })
        }
        userDetails.append(ul, button, postsBlock);
    });

// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку
// post-details.html, котра має детальну інфу про поточний пост.
// блоки з короткою іфною про post - в ряд по 5 .

function postCreator(object, parent) {
    for (const post of object) {
        const postBlock = document.createElement('div');
        const title = document.createElement('p');
        const button = document.createElement('button');
        title.innerHTML = `<b>Title:</b> ${post.title}`;
        button.innerText = 'Post details';
        parent.appendChild(postBlock);
        postBlock.append(title, button);
        button.onclick = () => {
            location.href = `../post-details/post_details.html?postId=${post.id}`;
        }
    }
}

function liCreator(key, value, parent) {
    const li = document.createElement('li');
    li.innerHTML = `<b>${key}:</b> ${value}`;
    parent.appendChild(li);
}

function ulBuilder(key, object, parent) {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    li.innerHTML = `<b>${key}:</b>`;
    parent.appendChild(li);
    li.appendChild(ul);
    recursiveBuild(object, ul);

}

function recursiveBuild(object, parent) {
    for (const key in object) {
        typeof object[key] === 'object'
            ? ulBuilder(key, object[key], parent)
            : liCreator(key, object[key], parent)
    }
}