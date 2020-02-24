console.log('Clientside Javascript is loaded!!!')



const weatherForm = document.querySelector('button')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('click', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading data...'
    messageTwo.textContent = ''


    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = ''
                messageTwo.textContent = data.location + data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})