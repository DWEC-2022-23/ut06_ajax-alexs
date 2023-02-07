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

function Fetch() { }
Fetch.prototype = {
  insert: function (guest) {
    fetch('http://localhost:3000/invitados', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(guest)
    })
  },
  remove: function (guestID) {
    fetch('http://localhost:3000/invitados/' + guestID, {
      method: 'DELETE',
    })
  },
  edit: function (guest) {
    fetch('http://localhost:3000/invitados/' + guest.id, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(guest)
    })
  },
}

function XMLHttp() { }
XMLHttp.prototype = {
  insert: function (guest) {
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/invitados");
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(guest));
  },
  remove: function (guestID) {
    const request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:3000/invitados/" + guestID);
    request.send();
  },
  edit: function (guest) {
    const request = new XMLHttpRequest();
    request.open("PATCH", 'http://localhost:3000/invitados/' + guest.id);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(guest));
  }
}

function Guest(id, name, checked) {
  this.id = id;
  this.nombre = name;
  this.confirmado = checked;
}

Guest.prototype = {}