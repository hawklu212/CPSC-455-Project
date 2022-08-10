const endpoint = "http://server.a11ymaps.com/";
export async function loginCurl(data) {
  const response = await fetch(`${endpoint}users`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function signUpCurl(data) {
  const response = await fetch(`${endpoint}users`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function setInitialCookieCurl(data) {
  const response = await fetch(`${endpoint}users/cookie`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getCookieValidationCurl() {
  const response = await fetch(`${endpoint}users/cookie`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response;
}

export async function logoutCurl() {
  const response = await fetch(`${endpoint}users/cookie/logout`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response;
}

export async function verificationCurl(data) {
  const response = await fetch(`${endpoint}users/verify`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}
export async function recoveryCurl(data) {
  const response = await fetch(`${endpoint}users/recovery`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function recoverySendCodeCurl(data) {
  const response = await fetch(`${endpoint}users/verify`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
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
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

/*  Put user Preferences  */
export async function putSetUserPreferenceCurl(data) {
  const response = await fetch(`${endpoint}profileCreation`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

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
