
const baseurl = "http://146.59.242.125:3015/"
let updateMode = false
let promoid = ""


document.querySelector("#btna").addEventListener('click', () => {
    updateMode = false
    openModal();
});


    const searchBar = document.querySelector('#searchBar')

    searchBar.addEventListener('keyup', async (e) => {
        const searchLetters = e.target.value;
        const promos = await getPromos();
        const promoFiltered = promos.filter((promo) => {
            console.log(promo.name);
            
        return promo.name.toLowerCase().includes(searchLetters.toLowerCase())
        })
        browsePromos(promoFiltered)
    });


async function getPromos() {

    const response = await fetch(baseurl + 'promos', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071'

        }
    })
    const data = await response.json()
    console.log(data);
    return data;
}



async function browsePromos(promos) {
    document.querySelector('#promoContainer').innerHTML = ""
    console.log(promos);

    promos.forEach(promo => {
        displayPromo(promo)
    });
}



async function deletepromo(id) {
    const res = await fetch(baseurl + `promos/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071'

        }
    })
}

async function Modpromo(id) {
    const promo = {
        name: document.querySelector('#name').value,
        startDate: document.querySelector('#startDate').value,
        endDate: document.querySelector('#endDate').value,
        formationDescription: document.querySelector('#forma').value
    }
    const res = await fetch(baseurl + `promos/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071',
            "Content-type": "Application/json"

        },
        body: JSON.stringify(promo)
    })

    closeModal()
    init()

}




async function addPromos() {
    const promo = {
        name: document.querySelector('#name').value,
        startDate: document.querySelector('#startDate').value,
        endDate: document.querySelector('#endDate').value,
        formationDescription: document.querySelector('#forma').value
    }
    const res = await fetch(baseurl + `promos`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071 ',
            "Content-type": "Application/json"

        },
        body: JSON.stringify(promo)
    })
    const data = await res.json()
    console.log(data);
    displayPromo(data.data)
    closeModal()
}

document.querySelector("#btnAddForm").addEventListener('click', () => {
    if (updateMode) {
        Modpromo(promoid)
    } else {
        addPromos();
    }

})




function displayPromo(promo) {


    const article = document.createElement('article')
    article.classList.add('article')

    const paraname = document.createElement('p')
    paraname.classList.add('namecard')
    paraname.textContent = promo.name
    paraname.innerHTML = promo.name
    article.appendChild(paraname)
    document.querySelector('#promoContainer').appendChild(article)


    const def = document.createElement('p')
    def.textContent = promo.formationDescription
    def.innerHTML = promo.formationDescription
    article.appendChild(def)


    const startDate = document.createElement('p')
    startDate.textContent = promo.startDate.split('T')[0]
    startDate.innerHTML = 'Début : ' + promo.startDate.split('T')[0]
    article.appendChild(startDate)


    const endDate = document.createElement('p')
    endDate.textContent = promo.endDate.split('T')[0]
    endDate.innerHTML = 'Fin : ' + promo.endDate.split('T')[0]
    article.appendChild(endDate)



    // const students = document.createElement('p')
    // students.textContent = promo.students
    // students.innerHTML = 'Étudiants : ' + promo.students
    // article.appendChild(students)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('btncontainer')

    const buttonthree = document.createElement("button");
    buttonthree.classList.add('btn')
    buttonthree.innerHTML = 'Détails';
    buttonthree.addEventListener('click', () => {
        localStorage.setItem("promoid", promo._id)
        location.href = "./pages/students.html"
    })
    buttonContainer.appendChild(buttonthree)




    const button = document.createElement("button");
    button.classList.add('btn')
    button.innerHTML = 'Modifier';
    button.addEventListener('click', () => {
        promoid = promo._id
        updateMode = true
        openModal(promo)
    })
    buttonContainer.appendChild(button)
    article.appendChild(buttonContainer)


    const buttontwo = document.createElement("button");
    buttontwo.classList.add('btn1')
    buttontwo.innerHTML = 'Supprimer';
    buttontwo.addEventListener('click', () => {
        deletepromo(promo._id)
        article.remove()
    })
    buttonContainer.appendChild(buttontwo)
    article.appendChild(buttonContainer)




}




async function init() {

    const promos = await getPromos()
    browsePromos(promos)
}

init()
