/*eslint-disable*/

// const locations = JSON.parse(document.getElementById('map').dataset.locations);
// console.log(locations);

export const displayMap = (location) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia3NoaXRpai0wMDc3IiwiYSI6ImNsZ3FkbzliMTBvaDgzZm1tdDVyN3NrNXMifQ.IM1S93NBR4BoDYVgw_qqiA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kshitij-0077/clgrhnqap000s01p6bbefhsv8',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add the Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add PopUp
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
