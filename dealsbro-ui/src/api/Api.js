const BASE_URL = "https://dealsbro-api.kevc.workers.dev"

export const getOutlets = async () => {
    const data = await fetch(BASE_URL + "/outlets").then(resp => resp.json())
    return data
}

export const getDeals = async () => {
    const data = await fetch(BASE_URL + "/deals").then(resp => resp.json())
    return data
}