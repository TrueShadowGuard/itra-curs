export default async function (id) {
    const response = await fetch(`/api/profile/${id}`)
    let json = await response.json();
    console.log('json', json)
    return json
}
