export default function(queryObject) {
    return '?' + Object.entries(queryObject).map(([k,v]) => k+'='+v).join('&')
}
