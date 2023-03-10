const tarefa = document.querySelector('#inpTarefa')
const btnTarefa = document.querySelector('.btnTarefa')
const ulTarefa = document.querySelector('.ulTarefas')
const div = document.querySelector('.container')

function criaLi() {
    const li = document.createElement('li')
    return li
}

btnTarefa.addEventListener('click' , function() {
    if (tarefa.value === '') return;
    criaTarefa()
})

function limpaInput() {
    tarefa.value = ''
    tarefa.focus()
}

div.addEventListener('keypress' , function(e) {
    if (e.key === 'Enter') {
        criaTarefa()
    }
})

function criaTarefa() {
    let li = criaLi()
    li.innerHTML = tarefa.value
    ulTarefa.appendChild(li)
    criaBtnApagar(li)
    limpaInput()
    salvarTarefas()
}

function criaBtnApagar(li) {
    li.innerHTML += ' '
    let btnApagar = document.createElement('button')
    btnApagar.innerHTML = 'X'
    btnApagar.style.color = 'Red'
    btnApagar.setAttribute('class', 'apagar')
    li.appendChild(btnApagar)
}

document.addEventListener('click' , function (e) {
    let click = e.target
    if (click.classList.contains('apagar')){
        click.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas() {
    const liTarefas = ulTarefa.querySelectorAll('li')
    const listaDeTarefas = []
    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('X' , '').trim()
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas' , tarefasJSON)
}

function adiocionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}
adiocionaTarefasSalvas()