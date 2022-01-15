const getDataWorld = async () => {
  const response = await fetch("./data/world.json")
  const data = await response.json()
  return data
}

export default getDataWorld

