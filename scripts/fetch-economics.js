const getDataEconomics = async () => {
  const response = await fetch("./data/economics.json")
  const data = await response.json()
  return data
}

export default getDataEconomics

