const getDataUkraine = async () => {
  const response = await fetch("./data/ukraine.json")
  const data = await response.json()
  return data
}

export default getDataUkraine



