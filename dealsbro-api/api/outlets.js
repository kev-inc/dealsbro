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

export const getAllOutlets = async request => {
    const outlets = await get()
    return new Response(JSON.stringify(outlets, null, 2), { headers })
}

export const addNewOutlet = async request => {
    const outlets = await get()
    const toAdd = await request.json()
    toAdd['id'] = crypto.randomUUID()
    outlets.push(toAdd)
    await set(outlets)
    return new Response(JSON.stringify(toAdd, null, 2), { status: 201, headers })
}

export const getOutlet = async request => {
    const outletId = request.params.outletId
    const outlets = await get()
    const indexToGet = outlets.findIndex(outlet => outlet['id'] === outletId) 
    if (indexToGet == -1) {
        return new Response(JSON.stringify({"error": "outletId not found"}, null, 2), { status: 404, headers })
    }
    return new Response(JSON.stringify(outlets[indexToGet], null, 2), { headers })
}

export const updateOutlet = async request => {
    const outletId = request.params.outletId
    const toPut = await request.json()
    const outlets = await get()
    const indexToPut = outlets.findIndex(outlet => outlet['id'] === outletId)
    if (indexToPut == -1) {
        return new Response(JSON.stringify({"error": "outletId not found"}, null, 2), { status: 404, headers })
    }
    toPut['id'] = outletId
    outlets[indexToPut] = toPut
    await set(outlets)
    return new Response(JSON.stringify(toPut, null, 2), { headers })
}

export const deleteOutlet = async request => {
    const outletId = request.params.outletId
    const outlets = await get()
    const indexToDelete = outlets.findIndex(outlet => outlet['id'] === outletId)
    if (indexToDelete == -1) {
        return new Response(JSON.stringify({"error": "outletId not found"}, null, 2), { status: 404, headers })
    }
    outlets.splice(indexToDelete, 1)
    await set(outlets)
    return new Response(null, { status: 204, headers })    
}
