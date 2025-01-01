import "./styles/main.css";
import images from './images/blue-book.png'

function add() {
    const container = document.querySelector(".img-container");
    container.insertAdjacentHTML("beforeend", `<img src="${images}" height="100px" width="100px" alt="blue-book" loading="lazy">`)
}

add()

console.log("Проєкт з Webpack і Tailwind CSS працює!");
