async function fetchAPIData(endpoint) {
  const api_key = 'b6fdc03418ae1412aaf0b03762691c22';

  const apiUrl = 'https://api.themoviedb.org/3/';

  const res = await fetch(apiUrl + endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${api_key}`,
      'content-Type': 'application/json'
    }
  });

  const data = await res.json();

  return data;
}

export default fetchAPIData;
