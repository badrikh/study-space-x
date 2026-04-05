const cards = document.querySelectorAll(".duration-card");
cards.forEach(card => {
    card.addEventListener("click", function () {
        cards.forEach(c => c.classList.remove("active"));
        this.classList.add("active");
    });
});

let available = 12;
const total = 30;

function updateProgressBar(){

    const percentage = (available / total) * 100;

    const progressBar = document.querySelector(".progress-bar");

    if(progressBar){
        progressBar.style.width = percentage + "%";
    }

}

updateProgressBar();

const bookings = {
"9:00 AM":2,
"10:00 AM":2,
"11:00 AM":5,
"12:00 PM":9,
"1:00 PM":8,
"2:00 PM":5,
"3:00 PM":2,
"4:00 PM":5,
"5:00 PM":9,
"6:00 PM":8,
"7:00 PM":5,
"8:00 PM":2
};

const times = [
"9:00 AM","10:00 AM","11:00 AM",
"12:00 PM","1:00 PM","2:00 PM",
"3:00 PM","4:00 PM","5:00 PM",
"6:00 PM","7:00 PM","8:00 PM"
];

function getLevel(count){

    if(count <= 3) return "low";
    if(count <= 6) return "medium";
    return "high";

}

const busyContainer = document.getElementById("busyHours");

if(busyContainer){

    times.forEach(time => {

        const count = bookings[time];
        const level = getLevel(count);
        const percent = (count / 10) * 100;

        const hourDiv = document.createElement("div");
        hourDiv.classList.add("hour");

        hourDiv.innerHTML = `
            <span>${time}</span>
            <div class="bar">
                <div class="fill ${level}" style="width:${percent}%"></div>
            </div>
            <span class="level">${level.charAt(0).toUpperCase() + level.slice(1)}</span>
        `;
        busyContainer.appendChild(hourDiv);

    });

}

function getStatus(count){

    if(count <= 3) return "Quiet";
    if(count <= 6) return "Moderate";
    return "Busy";

}

const select = document.getElementById("timeSelect");

if(select){

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Choose your time";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    select.appendChild(defaultOption);

    times.forEach(time => {

        const status = getStatus(bookings[time]);

        const option = document.createElement("option");

        option.value = time;
        option.textContent = `${time} (${status})`;

        select.appendChild(option);

    });

}

function confirmBooking(){

    const date = document.querySelector("input[type='date']").value;
    const time = document.getElementById("timeSelect").value;
    const duration = document.querySelector(".duration-card.active");
    const people = parseInt(document.getElementById("peopleSelect").value);
    const warning = document.getElementById("warningMessage");

    warning.style.display = "none";
    warning.innerHTML = "";

    if(!date){
        warning.innerHTML = "⚠ Please select a date.";
        warning.style.display = "block";
        return;
    }

    if(!time){
        warning.innerHTML = "⚠ Please choose a time.";
        warning.style.display = "block";
        return;
    }

    if(!duration){
        warning.innerHTML = "⚠ Please select a duration.";
        warning.style.display = "block";
        return;
    }

    if(people > available){
        warning.innerHTML = "⚠ Not enough seats available.";
        warning.style.display = "block";
        return;
    }

    available -= people;

    document.getElementById("availableSeats").innerText = available;

    updateProgressBar();

    document.getElementById("bookingMessage").style.display = "flex";

}