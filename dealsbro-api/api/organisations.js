import { get as getOutlets } from "./outlets"

const url = "https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/"

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

export const get = async () => {
    return fetch(url + "organisations.json").then(resp => resp.json())
}

export const getAllOrganisations = async () => {
    let data = await get()
    const outlets = await getOutlets()
    Object.keys(data).forEach(orgId => {
        data[orgId] = {...data[orgId], outlets: Object.values(outlets).filter(outlet => outlet.companyId === orgId)}
    })
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const addNewOrganisations = async request => {
    const toAdd = await request.json()
    const data = await fetch(url + "organisations.json", {method: "POST", body: JSON.stringify(toAdd)}).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { status: 201, headers })
}

export const getOrganisation = async request => {
    const orgId = request.params.orgId
    const data = await fetch(url + `organisations/${orgId}.json`).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { headers })}

export const updateOrganisation = async request => {
    const orgId = request.params.orgId
    const toPut = await request.json()
    const data = await fetch(url + `organisations/${orgId}.json`, {method: "PUT", body: JSON.stringify(toPut)}).then(resp => resp.json())
    return new Response(JSON.stringify(data, null, 2), { headers })
}

export const deleteOrganisation = async request => {
    const orgId = request.params.orgId
    await fetch(url + `organisations/${orgId}.json`, {method: "DELETE"}).then(resp => resp.json())
    return new Response(null, { status_code: 204, headers }) 
}
