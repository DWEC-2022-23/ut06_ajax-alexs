
/** Perform crud operations using the fetch API. */
function Fetch() { }
Fetch.prototype = {
  insert: function (guest) {
    fetch('http://localhost:3000/invitados', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(guest)
    });
  },
  remove: function (guestID) {
    fetch('http://localhost:3000/invitados/' + guestID, {
      method: 'DELETE',
    });
  },
  edit: function (guest) {
    fetch('http://localhost:3000/invitados/' + guest.id, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(guest)
    });
  },
  search: async function (predicate) {
    return await fetch('http://localhost:3000/invitados?' + predicate)
      .then((response) => response.json())
      .catch((error) => { throw new Error(error + ", couldn't connect to json server.") })
  }
}

/** Perform crud operations using an XMLHttpRequest object.
 */
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
  },
  search: function (predicate) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", "http://localhost:3000/invitados?" + predicate);
      request.send();
      request.onload = function () {
        if (this.status == 200) resolve(JSON.parse(this.response));
      }
      request.onerror = function () {
        reject("Error connecting to the json server.");
      }
    })
  }
}

/**
 * Guest object to store into and retrieve from the database.
 * @param {number} id ID of the guest.
 * @param {string} name Name of the guest.
 * @param {boolean} checked The guest has confirmed or not assistance to the wedding.
 */
function Guest(id, name, checked) {
  this.id = id;
  this.nombre = name;
  this.confirmado = checked;
}
//Guest.prototype = {}