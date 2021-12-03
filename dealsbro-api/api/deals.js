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
    const value = await get()
    return new Response(JSON.stringify(JSON.parse(value), null, 2), { headers })
}

export const addNewDeal = async request => {
    const deals = await get()
    const toAdd = await request.json()
    toAdd['id'] = crypto.randomUUID()
    deals.push(toAdd)
    await set(deals)
    return new Response(JSON.stringify(toAdd, null, 2), { headers })
}
