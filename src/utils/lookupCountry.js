async function lookupCountry({ latitude: lat, longitude: long }) {
  // Prefix the env file with REACT_APP for react to find it
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  const locationData = await fetch(URL).then((res) => res.json());

  //   const [{ formatted_address: country }] = locationData.results.filter(({ types }) => types.includes('country'));
  const [{ address_components: addressComponents }] = locationData.results.filter(({ types }) => types.includes('country'));

  const [{ short_name: countryCode }] = addressComponents;

  return countryCode;
}

export default lookupCountry;
