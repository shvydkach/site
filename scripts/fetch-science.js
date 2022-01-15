const getDataScience = async () => {
  const response = await fetch("./data/science.json")
  const data = await response.json()
  return data
}

export default getDataScience

