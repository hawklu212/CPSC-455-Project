// TODO: remove this endpoint after testing
const endpoint = "http://server.a11ymaps.com/";
export async function loginCurl(data) {
  const response = await fetch(`${endpoint}users`, {
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
  const response = await fetch(`${endpoint}users`, {
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

export async function setInitialCookieCurl(data) {
  const response = await fetch(`${endpoint}users/cookie`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getCookieValidationCurl() {
  const response = await fetch(`${endpoint}users/cookie`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response; // parses JSON response into native JavaScript objects
}

export async function logoutCurl() {
  const response = await fetch(`${endpoint}users/cookie/logout`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response; // parses JSON response into native JavaScript objects
}

export async function verificationCurl(data) {
  const response = await fetch(`${endpoint}users/verify`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
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
export async function recoveryCurl(data) {
  const response = await fetch(`${endpoint}users/recovery`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
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

export async function recoverySendCodeCurl(data) {
  const response = await fetch(`${endpoint}users/verify`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
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


export async function getRouteResults(locations, userPref) {

  const routeParams = new URLSearchParams({
    orig: locations[0],
    dest: locations[1],
    userPref: JSON.stringify(userPref),
  });
  const response = await fetch(`${endpoint}routes/?` + routeParams, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });
  return response.json();
}

/*  Get user Preferences  */
export async function getUserPreferenceCurl() {
  const response = await fetch(`${endpoint}profileCreation`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

/*  Put user Preferences  */
export async function putSetUserPreferenceCurl(data) {
  const response = await fetch(`${endpoint}profileCreation`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
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

/*  Get Saved Routes  */
export async function getSavedRoutes() {
  const response = await fetch(`${endpoint}savedRoutes`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
  });
  return response.json();
}

export async function deleteAllSavedRoutes() {
  const response = await fetch(`${endpoint}savedRoutes`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
  });
  return response.json();
}

export async function deleteSavedRoute(name) {
  const response = await fetch(`${endpoint}savedRoutes`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  return response.json();
}

export async function addSavedRoute(data) {
  const savedRoute = {
    origin: data.origin,
    destination: data.destination,
    name: data.name,
  };
  const response = await fetch(`${endpoint}savedRoutes`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(savedRoute),
  });
  return response.json();
}
