
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#mensaje-1')
const menssageTwo = document.querySelector('#mensaje-2')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Cargando..'
    menssageTwo.textContent=''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                menssageTwo.textContent = data.forecast

            }

        })
    })
})