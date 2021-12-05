import { getLongLatFromPostalCode } from "../utils/geocode"

const url = "https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/"

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

const get = async () => {
    const value = await DEALSBRO.get("outlets")
    return JSON.parse(value)
}

const set = async (value) => {
    return DEALSBRO.put("outlets", JSON.stringify(value))
}

export const getAllOutlets = async () => {
    const data = await fetch(url + "outlets.json").then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const addNewOutlet = async request => {
    const toAdd = await request.json()
    const geocode = await getLongLatFromPostalCode(toAdd['postalCode'])
    if (!('longt' in geocode) || !('latt' in geocode)) {
        return new Response(JSON.stringify({"error": "Error getting geocode data"}, null, 2), { status: 500, headers })
    }
    toAdd['longitude'] = geocode['longt']
    toAdd['latitude'] = geocode['latt']
    const data = await fetch(url + "outlets.json", {method: "POST", body: JSON.stringify(toAdd)}).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { status: 201, headers })
}

export const getOutlet = async request => {
    const outletId = request.params.outletId
    const data = await fetch(url + `outlets/${outletId}.json`).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const updateOutlet = async request => {
    const outletId = request.params.outletId
    const toPut = await request.json()
    const geocode = await getLongLatFromPostalCode(toAdd['postalCode'])
    toPut['longitude'] = geocode['longt']
    toPut['latitude'] = geocode['latt']
    const data = await fetch(url + `outlets/${outletId}.json`, {method: "PUT", body: JSON.stringify(toPut)}).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const deleteOutlet = async request => {
    const outletId = request.params.outletId
    const data = await fetch(url + `outlets/${outletId}.json`, {method: "DELETE"}).then(resp => resp.json())
    return new Response(null, { status_code: 204, headers }) 
}
