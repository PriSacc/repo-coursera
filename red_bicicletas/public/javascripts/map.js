var map = L.map('main_map').setView([-32.9575, -60.639444], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marcar el mapa
L.marker([-32.9512, -60.6323]).addTo(map)
    .bindPopup('A pretty popup.<br> Don\'t you think?.')
    .openPopup();
L.marker([-32.9553, -60.66]).addTo(map)
    .bindPopup('Popup something.')
    .openPopup();
L.marker([-32.9587, -60.6376]).addTo(map)
    .bindPopup('Say some.')
    .openPopup();