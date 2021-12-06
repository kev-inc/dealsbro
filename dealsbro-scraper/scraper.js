const results = []
const parent = document.querySelectorAll("div > div > div.center-block.no-padding > div.top-description > div > div.col-xs-10.no-padding")
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