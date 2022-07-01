export async function loginCurl(data) {
  let response = await fetch("http://localhost:3001/users", {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function signUpCurl(data) {
  let response = await fetch("http://localhost:3001/users", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// JJ: at some point, may need to pass in user here as well
export async function getRouteResults(locations) {
  let routeParams = new URLSearchParams({
    orig: locations[0],
    dest: locations[1],
  });
  let response = await fetch("http://localhost:3001/routes/?" + routeParams, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });
  return response.json();
}
