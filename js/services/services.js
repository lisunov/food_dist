const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: data,
  });

  return await res.json();
};

async function getResource(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}. Status: ${res.status}`);
  }
  return await res.json();
}

function pad(num, size) {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

export {postData, getResource, pad};