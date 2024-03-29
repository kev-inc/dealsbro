import { getLongLatFromPostalCode } from "../utils/geocode"
import { get as getOrganisations } from "./organisations"

const url = "https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/"

const headers = {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

export const get = async () => {
    return fetch(url + "outlets.json").then(resp => resp.json())
}

export const getAllOutlets = async () => {
    const data = await get()
    const orgs = await getOrganisations()
    Object.keys(data).forEach(outletId => {
        data[outletId] = {...data[outletId], company: orgs[data[outletId]['companyId']]}
    })
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const addNewOutlet = async request => {
    const toAdd = await request.json()
    if (!('longitude' in toAdd && 'latitude' in toAdd)) {
        const geocode = await getLongLatFromPostalCode(toAdd['postalCode'])
        if (!('longt' in geocode) || !('latt' in geocode)) {
            return new Response(JSON.stringify({"error": "Error getting geocode data"}, null, 2), { status: 500, headers })
        }
        toAdd['longitude'] = geocode['longt']
        toAdd['latitude'] = geocode['latt']
    }
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
    if (!('longitude' in toPut && 'latitude' in toPut)) {
        const geocode = await getLongLatFromPostalCode(toPut['postalCode'])
        if (!('longt' in geocode) || !('latt' in geocode)) {
            return new Response(JSON.stringify({"error": "Error getting geocode data"}, null, 2), { status: 500, headers })
        }
        toPut['longitude'] = geocode['longt']
        toPut['latitude'] = geocode['latt']
    }
    const data = await fetch(url + `outlets/${outletId}.json`, {method: "PUT", body: JSON.stringify(toPut)}).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const deleteOutlet = async request => {
    const outletId = request.params.outletId
    await fetch(url + `outlets/${outletId}.json`, {method: "DELETE"}).then(resp => resp.json())
    return new Response(null, { status_code: 204, headers }) 
}
