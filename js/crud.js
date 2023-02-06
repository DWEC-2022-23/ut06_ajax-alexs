document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/invitados')
    .then((response) => response.json())
    .then((data) => paint(data));
})

function paint(data) {
  data.forEach(invitado => {
    const guest = createGuest(invitado.nombre);

    if (invitado.confirmado) {
      guest.querySelector("input[type='checkbox']").checked = true;
      guest.className = 'responded';
    }

    guest.id = invitado.id;
    guestList.appendChild(guest);
  });
}

// TODO
// ! not working
function insert(guest) {
  fetch('http://localhost:3000/invitados', {
    method: 'PUT',
    body: JSON.stringify(guest)
  })
}