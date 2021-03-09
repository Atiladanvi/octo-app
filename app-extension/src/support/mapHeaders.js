export default (common, headers) => {
    headers.map(header => {
        common[header.name] = header.value
    })
}
