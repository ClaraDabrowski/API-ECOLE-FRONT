
const popup = document.getElementById("popup-container");





function openModal(promo = null) {
    // promoContainer.classList.add("hidden")

    document.querySelector('#name').value = promo ? promo.name : ""
    document.querySelector('#forma').value = promo ? promo.formationDescription : ""
    document.querySelector('#startDate').value = promo ? promo.startDate.split('T')[0] : ""
    document.querySelector('#endDate').value = promo ? promo.endDate.split('T')[0] : ""
    document.querySelector('#namepop').innerHTML = promo ? 'MODIFIER PROMO' : "+ PROMO"
    popup.style.display = 'flex';
}

function closeModal() {
    popup.style.display = 'none'
}

document.addEventListener('click', (e) => {
    if (e.target == document.querySelector('#popup-container')) {
        closeModal()
    }


})



// function openUpdateModal() {
//     popup.style.display = 'flex';
// }

// document.addEventListener('click', (e) => {
//     if (e.target == document.querySelector('#popup-container')) {
//         popup.style.display = 'none'
//     }
//     popup.innerHTML.add(promo)

// })


