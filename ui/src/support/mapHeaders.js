export default (api, headers) => {
    headers.map(header => {
        api.defaults.headers.common[header.key] = header.value
    })
}