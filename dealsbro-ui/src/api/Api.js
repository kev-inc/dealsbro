export const getOutlets = async () => {
    const data = await fetch("https://dealsbro-api.kevc.workers.dev/outlets").then(resp => resp.json())
    return data
}