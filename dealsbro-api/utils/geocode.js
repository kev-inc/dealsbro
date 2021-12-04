export const getLongLatFromPostalCode = async postalCode => {
    const resp = await fetch(`https://geocode.xyz/${postalCode}?region=SG&json=1`).then(resp => resp.json())
    return resp
}