document.addEventListener('DOMContentLoaded', () => {
  const guestForm = document.getElementById('registrar');
  const input = guestForm.querySelector('input');

  const mainContent = document.querySelector('main');
  const guestList = document.getElementById('guestList');

  const filter = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheck = document.createElement('input');

  // Add filter components to the DOM
  filterLabel.textContent = "Ocultar los que no hayan respondido";
  filterCheck.type = 'checkbox';
  filter.appendChild(filterLabel);
  filter.appendChild(filterCheck);
  mainContent.insertBefore(filter, guestList);

  // Hide guests on filter check
  filterCheck.addEventListener('change', (e) => {
    const hide = e.target.checked;
    const guests = guestList.children;

    for (let guest of guests) {
      if (!hide)
        guest.style.display = '';
      else if (hide && guest.className !== 'responded')
        guest.style.display = 'none';
    }
  });

  // Add or remove 'responded' class to guests on checkbox click
  guestList.addEventListener('change', (e) => {
    const hasResponded = e.target.checked;
    const guest = e.target.parentNode.parentNode;
    const guestName = guest.getElementsByTagName('span')[0].innerText;

    if (hasResponded) guest.className = 'responded';
    else guest.className = '';

    new XMLHttp().edit(new Guest(guest.id, guestName, hasResponded));
  });

  // TODO refactor
  // Button functionalities
  guestList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const guest = button.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          new XMLHttp().remove(guest.id);
          guestList.removeChild(guest);
        },
        edit: () => {
          const span = guest.firstElementChild;
          const input = document.createElement('input');
          input.type = 'name';
          input.value = span.textContent;
          guest.insertBefore(input, span);
          guest.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = guest.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          guest.insertBefore(span, input);
          guest.removeChild(input);
          button.textContent = 'edit';
          new XMLHttp().edit(new Guest(guest.id, input.value));
        }
      };

      nameActions[action]();
    }
  });

  guestForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const guestName = input.value;
    if (guestName === "") return;

    // Otra opción es crear un objeto Guest con un método insert
    // dentro de él y que auto actualice su id al insertarse.
    new XMLHttp().insert(new Guest(0, guestName, false));

    const guest = createGuest(guestName);
    const savedGuest = await new XMLHttp().search('nombre=' + guestName);
    guestList.appendChild(guest);
    guest.id = savedGuest[0].id;
    input.value = '';
  });

  (async function () {
    try {
      let data = await new XMLHttp().search();
      console.log(data)
      paint(data);
    }
    catch (error) {
      let errorWarning = document.createElement('h2');
      errorWarning.innerText = error;
      mainContent.appendChild(errorWarning);
    }
  })()
}); // END DOMContentLoaded

function createGuest(name) {
  function createElement(elementName, property, value) {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  }

  function appendToLI(elementName, property, value) {
    const element = createElement(elementName, property, value);
    li.appendChild(element);
    return element;
  }

  const li = document.createElement('li');
  appendToLI('span', 'textContent', name);
  appendToLI('label', 'textContent', 'Confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));
  appendToLI('button', 'textContent', 'edit');
  appendToLI('button', 'textContent', 'remove');
  return li;
}

function paint(data) {
  data.forEach(invitado => {
    const guest = createGuest(invitado.nombre);

    guest.id = invitado.id;
    if (invitado.confirmado) {
      guest.querySelector("input[type='checkbox']").checked = true;
      guest.className = 'responded';
    }

    guestList.appendChild(guest);
  });
}