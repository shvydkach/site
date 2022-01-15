const getDataCabinet = async () => {
  const response = await fetch("./data/cabinet.json")
  const data = await response.json()
  return data
}

export default getDataCabinet

