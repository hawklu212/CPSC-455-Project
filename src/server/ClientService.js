import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

const getElevation = async (location) => {
  let elevationRequest = {
    params: {
      locations: [],
      key: "placeholderAPIKey",
    },
    timeout: 1000,
  };

  if (typeof location === string) {
  }

  let response = await client.elevation(elevationRequest);
};
client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: "placeholderKey",
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });
