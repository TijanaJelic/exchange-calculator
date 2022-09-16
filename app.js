const currency_one = document.querySelector('#currency-one')
const currency_two = document.querySelector('#currency-two')
const amount_one = document.querySelector('#amount-one')
const amount_two = document.querySelector('#amount-two')
const swap = document.querySelector('#swap')
const rateEl = document.querySelector('#rate')

// Fetch exchange rates and update the DOM
const calculate = () => {
    const currencyOne = currency_one.value
    const currencyTwo = currency_two.value

    if (currencyOne !== "Select currency" && currencyTwo !== "Select currency") {
        fetch(`https://v6.exchangerate-api.com/v6/0e810eaf8be4f649f9a46c9f/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[currencyTwo]
            amount_two.value = (amount_one.value * rate).toFixed(2)
            rateEl.textContent = `1 ${currencyOne} = ${rate} ${currencyTwo}`
        })
    } else {
        rateEl.textContent = ''
    }
}

currency_one.addEventListener('change', calculate)
currency_two.addEventListener('change', calculate)
amount_one.addEventListener('input', calculate)

swap.addEventListener('click', () => {
    const temp = currency_one.value
    currency_one.value = currency_two.value
    currency_two.value = temp
    calculate()
})
