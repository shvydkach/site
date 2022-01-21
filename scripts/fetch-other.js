const getDataOther = async () => {
  const response = await fetch("./data/other.json")
  const data = await response.json()
  return data
}

export default getDataOther

