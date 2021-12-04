const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

const get = async () => {
    const value = await DEALSBRO.get("organisations")
    return JSON.parse(value)
}

const set = async (value) => {
    return DEALSBRO.put("organisations", JSON.stringify(value))
}

export const getAllOrganisations = async request => {
    const orgs = await get()
    return new Response(JSON.stringify(orgs, null, 2), { headers })
}

export const addNewOrganisations = async request => {
    const orgs = await get()
    const toAdd = await request.json()
    toAdd['id'] = crypto.randomUUID()
    orgs.push(toAdd)
    await set(orgs)
    return new Response(JSON.stringify(toAdd, null, 2), { status: 201, headers })
}

export const getOrganisation = async request => {
    const orgId = request.params.orgId
    const orgs = await get()
    const indexToGet = orgs.findIndex(org => org['id'] === orgId) 
    if (indexToGet == -1) {
        return new Response(JSON.stringify({"error": "orgId not found"}, null, 2), { status: 404, headers })
    }
    return new Response(JSON.stringify(orgs[indexToGet], null, 2), { headers })
}

export const updateOrganisation = async request => {
    const orgId = request.params.orgId
    const toPut = await request.json()
    const orgs = await get()
    const indexToPut = orgs.findIndex(org => org['id'] === orgId)
    if (indexToPut == -1) {
        return new Response(JSON.stringify({"error": "orgId not found"}, null, 2), { status: 404, headers })
    }
    toPut['id'] = orgId
    orgs[indexToPut] = toPut
    await set(orgs)
    return new Response(JSON.stringify(toPut, null, 2), { headers })
}

export const deleteOrganisation = async request => {
    const orgId = request.params.orgId
    const orgs = await get()
    const indexToDelete = orgs.findIndex(org => org['id'] === orgId)
    if (indexToDelete == -1) {
        return new Response(JSON.stringify({"error": "orgId not found"}, null, 2), { status: 404, headers })
    }
    orgs.splice(indexToDelete, 1)
    await set(orgs)
    return new Response(null, { status: 204, headers })    
}
