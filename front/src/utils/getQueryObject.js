export default function getQueryObject() {
    return Object.fromEntries(window.location.search.slice(1).split('&').map(x => x.split('=')))
}
