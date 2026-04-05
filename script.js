const seats = 18
const total = 30

const percent = Math.round((seats/total)*100)

document.querySelector(".circle").innerText = percent + "%"
document.querySelector(".progress-bar").style.width = percent + "%"