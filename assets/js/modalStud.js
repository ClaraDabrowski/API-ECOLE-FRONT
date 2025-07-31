
const popup = document.getElementById("popup-container");
const calendarEl = document.getElementById('calendar')
// const calendare = localStorage.getItem('calendar')
// const btn = document.createElement('button')
let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: []
})






function openModale(student = null) {
    // promoContainer.classList.add("hidden")

    document.querySelector('#namestud').value = student ? student.firstName : ""
    document.querySelector('#lastnamestud').value = student ? student.lastName : ""
    document.querySelector('#agestud').value = student ? student.age : ""
    // document.querySelector('#namepopstud').innerHTML = promo ? 'MODIFIER ÉLÈVE' : "+ ÉLÈVE"
    popup.style.display = 'flex';
}

function closeModal() {
    popup.style.display = 'none'
}

document.addEventListener('click', (e) => {
    if (e.target == document.querySelector('#popup-container')) {
        closeModal()
    }


});

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*Fonction pour calendrier */

const modalCalendar = document.querySelector('#modalCalend')


let tasks = []

function openModalCalendar() {




    modalCalendar.style.display = 'flex';
    calendar.render()
}

const modalCalendarEvent = document.querySelector('.popContain')

function openModalCalendarTwo() {

    modalCalendarEvent.style.display = 'flex';
}

function addTask() {
    calendar.addEvent({
        title: document.querySelector('#name').value,
        start: document.querySelector('#date').value
    })

    console.log(calendar.getEvents());

}

function closeModalCalend() {
    modalCalendar.style.display = 'none'
}


document.addEventListener('click', (e) => {
    if (e.target == document.querySelector('#modalCalend')) {
        closeModalCalend()
    }


});


function closeModalEvent() {
    modalCalendarEvent.style.display = 'none';
}


// function openUpdateModal() {
//     popup.style.display = 'flex';
// }

// document.addEventListener('click', (e) => {
//     if (e.target == document.querySelector('#popup-container')) {
//         popup.style.display = 'none'
//     }
//     popup.innerHTML.add(promo)

// })


