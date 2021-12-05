const results = []
const parent = document.querySelectorAll("body > div.content-wp > div > div.content.row > main > div > div > div.app > div.locator-configurator > div > div > div.locator-suggestions-box > div > div > div > div.locator-location-basic > div")
parent.forEach(child => {
    const obj = {}
    obj['name'] = child.querySelector('strong').innerHTML
    obj['companyId'] = 'ad5d5c7e-1d47-450a-93f3-7f99af5764a0'
    obj['address'] = child.querySelector('div.location-address').innerHTML
    obj['address'] = obj['address'].replace('<br>', ', ').replaceAll('\n', ' ')
    obj['postalCode'] = obj['address'].substring(obj['address'].length - 6)
    results.push(obj)
})
console.log(results)