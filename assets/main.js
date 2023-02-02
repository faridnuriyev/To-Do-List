const container = document.querySelector('.container')
const allInputs = container.getElementsByTagName('input')
const inputs = container.querySelector('.inputs')
const deleteButtons = document.getElementsByClassName('sil')
const inputsItem = document.querySelectorAll('.inputs__item')
const addBtn = document.querySelector('.buttonlar')
const board = document.querySelector('.board')
const draggables = document.querySelectorAll('.draggable')
const dones = document.getElementsByClassName('done')
const sort = document.querySelector('.sort')

let flagAdd = 1
let flagSort = true

addBtn.addEventListener('click', createInput)
sort.addEventListener('click', sortFunc)

Array.from(dones).forEach(item => {
    item.addEventListener('click', mobileAdd)
})

//  The function of adding an input from the main platform 
//  to the second platform in the mobile version using a button
function mobileAdd(e) {
    let arg = true
    let dragElement = e.target.parentElement
    let buttonCheck = e.target
    drag(dragElement, arg);
    allowDrop(e);
    drop(buttonCheck);

}

//  On the main platform creates inputs with a maximum of 5
function createInput() {

    if (flagAdd < 5 && allInputs[allInputs.length - 1].value.trim() !== '') {
        flagAdd++

        let html = `    <div class="inputs__item draggable" ondragstart="drag(event)" draggable="true" >
                        <button class="done">✔</button>
                                 <input type="text" class="inpt" />
                                 <button class="sil">x</button>
                        </div>`
        inputs.insertAdjacentHTML("beforeend", html)
    }

    Array.from(deleteButtons).forEach(item => {
        item.addEventListener('click', deleteInput)
    })
    Array.from(dones).forEach(item => {
        item.addEventListener('click', mobileAdd)
    })
}

//  Remove inputs from both platforms
function deleteInput() {
    if (flagAdd > 1) {
        this.parentElement.remove()
        flagAdd--
    }
}

//  On the main platform sort the input elements
function sortFunc() {
    const itemsPool = []
    const inputsArr = Array.from(allInputs)

    inputsArr.forEach(element => {
        if (element.value.trim() !== '') {
            itemsPool.push(element.value)
        } else {
            if (flagAdd > 1) {
                element.parentElement.remove()

            }

        }
    })
    flagAdd = itemsPool.length
    if (Array.from(allInputs).length == 0) {
        let html = `<div class="inputs__item draggable" ondragstart="drag(event)" draggable="true"> 
                            <button class="done">✔</button>
                                 <input type="text" class="inpt" />
                                 <button class="sil">x</button>
                             </div>`
        inputs.insertAdjacentHTML("beforeend", html)
        flagAdd++
    }

    let sortPool;
    if (flagSort) {
        sortPool = itemsPool.sort()
        flagSort = false;

    } else {
        sortPool = itemsPool.sort().reverse()
        flagSort = true;
    }
    sortPool.forEach((item, index) => {
        Array.from(allInputs)[index].value = item
    })
}

//  Function for drag the inputs from main platform to second platform
function drag(ev, arg) {
    if (arg) {
        ev.classList.add('dragging')
    } else {
        ev.target.classList.add('dragging')
    }

}

//  Function to work while dragging
function allowDrop(ev) {
    ev.preventDefault();
}

//  Function to add drag and drop input to the second platform
function drop() {
    const inputPcs = board.querySelectorAll('.inputs__item')
    const draggable = document.querySelector('.dragging');

    if (draggable.querySelector('input').value.trim() !== '' && inputPcs.length < 10) {
        document.querySelector(".dragging").querySelector(".sil").classList.add("sil2")

        document.querySelector(".dragging").querySelector(".sil").classList.remove("sil")

        board.appendChild(draggable)

        if (allInputs.length === 0) {
            let html =
                `<div class="inputs__item draggable" ondragstart="drag(event)" draggable="true">
            <button class="done">✔</button>
            <input type="text" class="inpt" />
            <button class="sil">x</button>
        </div>`
            inputs.insertAdjacentHTML("beforeend", html)
            flagAdd++
            Array.from(dones).forEach(item => {
                item.addEventListener('click', mobileAdd)
            })
        }
        flagAdd--

    }
    document.querySelectorAll('.sil2').forEach(item => {
        item.addEventListener('click', deleteFunc)

    })
    // Function for remove input at second platform
    function deleteFunc(e) {
        e.target.parentElement.remove()
    }
}










