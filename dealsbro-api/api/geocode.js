import { getLongLatFromPostalCode } from "../utils/geocode"

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

export const getGeocode = async request => {
    const postalCode = request.params.postalCode
    const resp = getLongLatFromPostalCode(postalCode)
    return new Response(JSON.stringify(resp, null, 2), { headers })
}