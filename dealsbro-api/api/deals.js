const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

const get = async () => {
    const value = await DEALSBRO.get("deals")
    return JSON.parse(value)
}

const set = async (value) => {
    return DEALSBRO.put("deals", JSON.stringify(value))
}

export const getAllDeals = async request => {
    const deals = await get()
    return new Response(JSON.stringify(deals, null, 2), { headers })
}

export const addNewDeal = async request => {
    const deals = await get()
    const toAdd = await request.json()
    toAdd['id'] = crypto.randomUUID()
    deals.push(toAdd)
    await set(deals)
    return new Response(JSON.stringify(toAdd, null, 2), { status: 201, headers })
}

export const getDeal = async request => {
    const dealId = request.params.dealId
    const deals = await get()
    const indexToGet = deals.findIndex(deal => deal['id'] === dealId) 
    if (indexToGet == -1) {
        return new Response(JSON.stringify({"error": "dealId not found"}, null, 2), { status: 404, headers })
    }
    return new Response(JSON.stringify(deals[indexToGet], null, 2), { headers })
}

export const updateDeal = async request => {
    const dealId = request.params.dealId
    const toPut = await request.json()
    const deals = await get()
    const indexToPut = deals.findIndex(deal => deal['id'] === dealId)
    if (indexToPut == -1) {
        return new Response(JSON.stringify({"error": "dealId not found"}, null, 2), { status: 404, headers })
    }
    toPut['id'] = dealId
    deals[indexToPut] = toPut
    await set(deals)
    return new Response(JSON.stringify(toPut, null, 2), { headers })
}

export const deleteDeal = async request => {
    const dealId = request.params.dealId
    const deals = await get()
    const indexToDelete = deals.findIndex(deal => deal['id'] === dealId)
    if (indexToDelete == -1) {
        return new Response(JSON.stringify({"error": "dealId not found"}, null, 2), { status: 404, headers })
    }
    deals.splice(indexToDelete, 1)
    await set(deals)
    return new Response(null, { status: 204, headers })    
}
