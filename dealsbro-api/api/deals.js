import { get as getOutlets } from "./outlets"
import { get as getOrganisations } from "./organisations"

const url = "https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/"

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

export const get = async () => {
    return fetch(url + "deals.json").then(resp => resp.json())
}

export const getAllDeals = async () => {
    const data = await get()
    const outlets = await getOutlets()
    const organisations = await getOrganisations()
    Object.keys(data).forEach(dealId => {
        data[dealId] = {...data[dealId], company: organisations[data[dealId]['companyId']], outlets: Object.values(outlets).filter(outlet => outlet.companyId === data[dealId]['companyId'])}
    })
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const addNewDeal = async request => {
    const toAdd = await request.json()
    const data = await fetch(url + "deals.json", {method: "POST", body: JSON.stringify(toAdd)}).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { status: 201, headers })
}

export const getDeal = async request => {
    const dealId = request.params.dealId
    const data = await fetch(url + `deals/${dealId}.json`).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const updateDeal = async request => {
    const dealId = request.params.dealId
    const toPut = await request.json()
    const data = await fetch(url + `deals/${dealId}.json`, {method: "PUT", body: JSON.stringify(toPut)}).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const deleteDeal = async request => {
    const dealId = request.params.dealId
    await fetch(url + `deals/${dealId}.json`, {method: "DELETE"}).then(resp => resp.json())
    return new Response(null, { status_code: 204, headers }) 
}
