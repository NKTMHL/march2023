// В post_details.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в post_details.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід
// на сторінку user-details.html, котра має детальну інфорацію про об'єкт
// на який клікнули
// post_details.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під
// інформацією про user.

fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => {
        const block = document.getElementsByClassName('users')[0];
        for (const user of users) {
            const userBlock = document.createElement('div');
            userBlock.innerHTML = `<b>#${user.id}</b> ${user.name}`;
            block.appendChild(userBlock);

            const button = document.createElement('button');
            button.innerText = 'user details';
            userBlock.appendChild(button);

            button.onclick = () => {
                location.href  = `../user-details/user_details.html?userId=${user.id}`;
            }
        }
    })

// let url = new URL("https://jsonplaceholder.typicode.com/users")
// url.searchParams.forEach(value => console.log(value));
