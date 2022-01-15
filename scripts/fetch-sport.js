const getDataSport = async () => {
  const response = await fetch("./data/sport.json")
  const data = await response.json()
  return data
}

export default getDataSport

