const promoid = localStorage.getItem('promoid')
const baseurl = "http://146.59.242.125:3015/promos/"
let updateModes = false
const searchBarStud = document.querySelector('#searchBarStud')

console.log(promoid);




document.querySelector("#btnabb").addEventListener('click', () => {
    updateModes = false
    openModale();
});



document.querySelector('#btnabc').addEventListener('click', () => {
    openModalCalendar()
});

document.querySelector('#btnevent').addEventListener('click', () => {
    closeModalCalend()
    openModalCalendarTwo()
})

document.querySelector('#bt').addEventListener('click', () => {
    
    addTask()
    closeModalEvent()
    openModalCalendar()
    
})






searchBarStud.addEventListener('keyup', async () => {
    const promo = await getPromosIdStud()
    promo.students = promo.students.filter(student => student.lastName.toLowerCase().includes(searchBarStud.value.toLowerCase()) || student.firstName.toLowerCase().includes(searchBarStud.value.toLowerCase()) || student.age.toString().includes(searchBarStud.value.toString()))
    browseStudents(promo.students)
})






async function getPromosIdStud() {

    const response = await fetch(baseurl + `${promoid}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071'

        }
    })
    const data = await response.json()
    console.log(data);
    return data;
}

getPromosIdStud()



async function browseStudents(students) {
    document.querySelector('#studsContainer').innerHTML = ""
    students.forEach(student => {
        displayPromoStud(student)
    });
}


async function deletestudent(studentsId) {
    const response = await fetch(baseurl + promoid + `/students/${studentsId}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071'

        }
    })
}



async function Modstudents(studentsId) {
    const formData = new FormData()
    formData.append("firstName", document.querySelector('#namestud').value)
    formData.append("lastName", document.querySelector('#lastnamestud').value)
    formData.append("age", document.querySelector('#agestud').value)
    if (document.querySelector('#avatarstud').files.length > 0) {
        formData.append("avatar", document.querySelector('#avatarstud').files[0])
    }
    const response = await fetch(baseurl + `${promoid}/students/${studentsId}`, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071',
            // "Content-type": "Application/json"

        },
        body: formData
    })

    closeModal()
    init()

}

async function addStudents() {

    const formData = new FormData()
    const avatarimg = document.querySelector('#avatarstud').files[0]
    formData.append("firstName", document.querySelector('#namestud').value)
    formData.append("lastName", document.querySelector('#lastnamestud').value)
    formData.append("age", document.querySelector('#agestud').value)
    if (avatarimg) {
        formData.append("avatar", document.querySelector('#avatarstud').files[0])
    }


    const res = await fetch(baseurl + `${promoid}/students`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071 ',

        },
        body: formData
    })
    const data = await res.json()
    console.log(data);
    displayPromoStud(data.data)
    closeModal()
}

document.querySelector("#btnAddForm2").addEventListener('click', () => {
    if (updateModes) {
        Modstudents(studentId)
    } else {
        addStudents();
    }

})


async function getAvatar(studentId) {

    const avatar = await fetch(baseurl + promoid + '/students/' + studentId + '/avatar/', {
        headers: {
            Authorization: 'Bearer cd7e3a99-f434-419c-bb4e-57200e68f071'
        },
    });

    const avatarBlob = await avatar.blob();
    const avatarUrl = URL.createObjectURL(avatarBlob);
    const img = document.createElement('img')
    img.src = avatarUrl
    img.alt = 'avatar'
    img.width = 100
    img.height = 100
    return img

}

async function displayPromoStud(student) {


    const article = document.createElement('article')
    article.classList.add('article2')

    // const avatStud = document.createElement('p')
    // avatStud.classList.add('avatStud')
    // avatStud.textContent = student.avatar
    // article.appendChild(avatStud)
    // document.querySelector('#studsContainer').appendChild(article)


    const avatarImg = await getAvatar(student._id)
    const imgContainer = document.createElement('div')
    imgContainer.classList.add('imgContainer')
    imgContainer.appendChild(avatarImg)
    article.appendChild(imgContainer);

    const lastnamestud = document.createElement('p')
    lastnamestud.classList.add('lastnamestudy')
    lastnamestud.textContent = 'Nom : ' + student.lastName
    article.appendChild(lastnamestud)
    document.querySelector('#studsContainer').appendChild(article)

    const namestud = document.createElement('p')
    namestud.classList.add('namestudy')
    namestud.textContent = 'Prénom : ' + student.firstName
    article.appendChild(namestud)
    document.querySelector('#studsContainer').appendChild(article)

    const agestud = document.createElement('p')
    agestud.classList.add('agestudy')
    agestud.textContent = 'Âge : ' + student.age
    article.appendChild(agestud)
    document.querySelector('#studsContainer').appendChild(article)

    // const prom = document.createElement ('p')
    // prom.textContent = 'Promo : ' + prom.name
    // article.appendChild(prom)
    // document.querySelector('#studsContainer').appendChild(article)

    const idstud = document.createElement('p')
    idstud.classList.add('idstudy')
    idstud.textContent = 'ID : ' + student._id
    article.appendChild(idstud)
    document.querySelector('#studsContainer').appendChild(article)


    const btnContainer = document.createElement('div')
    btnContainer.classList.add('btn2container')


    const btn = document.createElement("button");
    btn.classList.add('btn3')
    btn.innerHTML = 'Modifier';
    btn.addEventListener('click', () => {
        studentId = student._id
        updateModes = true
        openModale(student)
    })
    btnContainer.appendChild(btn)
    article.appendChild(btnContainer)


    const btntwo = document.createElement("button");
    btntwo.classList.add('btn4')
    btntwo.innerHTML = 'Supprimer';
    btntwo.addEventListener('click', () => {
        deletestudent(student._id)
        article.remove()
    })
    btnContainer.appendChild(btntwo)
    article.appendChild(btnContainer)

}


async function init() {

    const promo = await getPromosIdStud()
    browseStudents(promo.students)
}

init()
