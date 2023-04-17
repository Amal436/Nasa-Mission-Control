const API_URL = "http://localhost:8000/v1"

/**
 * Loads all planets from the API.
 * @return {Array<Object>} Planets
 */
const httpGetPlanets = async () => {
  const response = await fetch(`${API_URL}/planets`)

  return await response.json()
}

/**
 * Load launches, sort by flight number, and return as JSON.
 * @return {Array<Object>} Planets
 */
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)

  const launches = await response.json()

  return launches.sort((a, b) => a.flightNumber - b.flightNumber)
}   

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch)
    })
  } catch (error) {
    return {
      ok: false
    }
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE"
    })
  } catch (error) {
    console.error(error)

    return {
      ok: false
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch }
