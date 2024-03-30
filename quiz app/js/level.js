const buttons =document.querySelectorAll("button");

const getData = (event) => {
    const difficulty = event.target.dataset.difficulty;
    localStorage.setItem("difficulty", JSON.stringify(difficulty))
    window.location.assign("../html/index.html")
}


buttons.forEach((button) => {
    button.addEventListener("click", () => getData(event))
})

