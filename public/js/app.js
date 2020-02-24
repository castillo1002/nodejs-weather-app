console.log('Clientside Javascript is loaded!!!')



const weatherForm = document.querySelector('button')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')


weatherForm.addEventListener('click', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading data...'
    messageTwo.textContent = ''
    messageThree.textContent = ''


    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                messageThree.textContent = data.dailyForecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})