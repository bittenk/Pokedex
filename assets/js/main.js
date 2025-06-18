const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadingSpinner = document.getElementById('loadingSpinner')
const buttonText = loadMoreButton.querySelector('.buttonText')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    return pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit).then(() => {
    offset += limit
})

loadMoreButton.addEventListener('click', () => {
    loadMoreButton.disabled = true
    buttonText.style.display = 'none'
    loadingSpinner.classList.add('spinning')
    loadingSpinner.style.display = 'inline-block'

    // Delay de 3 segundos simulando carregamento
    setTimeout(() => {
        const qtdRecordsWithNextPage = offset + limit

        if (qtdRecordsWithNextPage >= maxRecords) {
            const newLimit = maxRecords - offset

            loadPokemonItens(offset, newLimit).then(() => {
                loadMoreButton.remove()
            })
        } else {
            loadPokemonItens(offset, limit).then(() => {
                offset += limit
                loadMoreButton.disabled = false
                buttonText.style.display = 'inline'
                loadingSpinner.classList.remove('spinning')
                loadingSpinner.style.display = 'none'
            })
        }
    }, 3000)
})
