const scores = JSON.parse(localStorage.getItem("scores"));
const main = document.getElementById("main");
console.log(scores);


scores.forEach((show, index) => {
    console.log(index)
    main.innerHTML += `<ul><li><div><span>${index + 1} </span><p>${show.name}</p></div><span>${show.score}</span></li></ul>`
})