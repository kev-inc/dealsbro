const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

export const getLongLatFromPostalCode = async request => {
    const postalCode = request.params.postalCode
    const resp = await fetch(`https://geocode.xyz/${postalCode}?region=SG&json=1`).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
}