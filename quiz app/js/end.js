const point = localStorage.getItem("point");
const pointer = document.querySelector("h1");
const saveBTN = document.getElementById("save-button");
const input = document.querySelector("input");
const highScores = JSON.parse(localStorage.getItem("scores")) || [];
let isAccess = true;

pointer.innerText = point;

const saveHandler = () => {
    if (!isAccess) {return}
    isAccess = false
    const username = input.value;
    if (point > 0) {
        if (!username) {
            alert("Enter a valid username")
        } else {
            const finalScore = {name: username, score: point};
            highScores.push(finalScore);
            highScores.sort((a,b) => b.score - a.score)
            highScores.splice(10)
            localStorage.setItem("scores", JSON.stringify(highScores))
            console.log(highScores)
            window.location.assign("../html/point.html")
        }
    } else {
        alert("your score is 0")
    }
}


saveBTN.addEventListener("click", saveHandler);

