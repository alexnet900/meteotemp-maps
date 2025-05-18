async function fetchGeoJSON() {
  const estaciones = [
    { id: 'IMIRAM24', coords: [-97.8700, 22.32] },
    { id: 'ITAMPI10', coords: [-97.8600, 22.22] },
    { id: 'ICIUDA235', coords: [-97.8300, 22.32] },
    { id: 'INARAN21', coords: [-97.6900, 21.35] },
    { id: 'IALTAM12', coords: [-97.8900, 22.48] },
    { id: 'IELMAN2', coords: [-99.0100, 22.70] },
    { id: 'ITANTO4', coords: [-98.2900, 21.39] },
    { id: 'IALDAM18', coords: [-98.0700, 22.94] },
    { id: 'ITAMPI7', coords: [-97.894, 22.287] },
    { id: 'ICIUDA207', coords: [-97.84, 22.27] },
    { id: 'IALTAM36', coords: [-97.94, 22.40] },
    { id: 'IALTAM35', coords: [-98.13, 22.52] }
  ];

  const apiKey = '0def5bb3244f4ad4af5bb3244f0ad466';
  const features = [];

  for (const est of estaciones) {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${est.id}&format=json&units=m&apiKey=${apiKey}&numericPrecision=decimal`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const temp = data.observations?.[0]?.metric?.temp;

      if (typeof temp === 'number') {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: est.coords },
          properties: { temp }
        });
      }
    } catch (e) {
      console.error(`Error con estación ${est.id}`, e);
    }
  }

  const geojson = {
    type: "FeatureCollection",
    features
  };

  document.body.innerText = JSON.stringify(geojson);
}

fetchGeoJSON();
