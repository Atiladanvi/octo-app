export default (object, headers) => {
  headers.map(header => {
    object[header.name] = header.value
  })
}
