const form = document.getElementById("form")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []



itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    let id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0 //tem que fazer -1 pois o length é 3, mas como o array conta o 0, então tem que fazer o -1
    const existe = itens.find( elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //elemento ja existe no meu array, ele chama a função e atualiza as informações conforme o id usando a const itemAtual. Para verificar se ja existe, ele verifica se o nome que eu digitei e o valor do local storage são exatamente iguais
    if (existe) {
        console.log(existe)
        console.log("Antes de sobrescrever repare no id ", itemAtual)
        itemAtual.id = existe.id
        console.log(itemAtual)
        existeElemento(itemAtual)

        //atualiza todo o array do localstorage, pega o item na posição escolhida e altera. Qnd ele alterar o array será sobrescrevido por completo, todos os outros itens continuarão como está, mas o item atual selecionado será atualizado
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }
    //novo elemento, cria um novo elemento no array
    else {

        itemAtual.id = id

        //cria uma li com o nome e quantidade conforme clica
        if((nome.value.length && quantidade.value.length) != 0){
            criaElemento(itemAtual)
        } else {
            alert("Por favor preencha todos os campos")
            return
        }
        //coloca o item no array de itens
        itens.push(itemAtual)
    }

    //define o local storage e atualiza
    localStorage.setItem("itens", JSON.stringify(itens))

    //zera os inputs
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {

    //cria uma li
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    //cria um strong
    const numeroItem = document.createElement('strong')

    //coloca a quantidade no strong
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    //coloca o strong dentro da li
    novoItem.appendChild(numeroItem)

    //escreve na li o nome
    novoItem.innerHTML += item.nome

    novoItem.appendChild(createBotaoDeleta(item.id))
    novoItem.appendChild(createButtonDone(item.id))

    //coloca o li por ultimo no ul
    lista.appendChild(novoItem)
}

function existeElemento(item) {
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}

function createBotaoDeleta(id) {
    const btn = document.createElement('button')
    btn.innerText = 'X'

    console.log("o id do botao delete está no elemento " + id)

    btn.addEventListener('click', function () {
        deleteItem(this.parentNode, id)
    })

    return btn
}

function deleteItem(element, id) {
    element.remove(id)
    // console.log(element)
    console.log("clicou no botão de deletar " + id)

    itens.splice(itens.findIndex(elemento => elemento.id == id), 1)

    //sobrescrevendo o array itens com o conteudo novo gerado do itens após a exclusão
    localStorage.setItem("itens", JSON.stringify(itens))
}



function createButtonDone(element) {
    const btn = document.createElement('button')
    btn.innerHTML = 'Concluido'

    btn.addEventListener('click', function () {
        this.parentNode.style.backgroundColor = 'green'
    })

    return btn
}

