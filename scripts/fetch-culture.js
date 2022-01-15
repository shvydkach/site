const getDataCulture = async () => {
  const response = await fetch("./data/culture.json")
  const data = await response.json()
  return data
}

export default getDataCulture

