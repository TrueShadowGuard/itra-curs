export default async function getDetailedProject(id) {
    try {
        const response = await fetch(`/api/projects/getProject/${id}`);
        console.log(response)
        return await response.json();
    } catch (e) {
        console.log('Failed getting project ', e);
    }
}
