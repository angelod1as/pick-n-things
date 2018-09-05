var clicked = (e) => {
  e.preventDefault();
  // get HTML elements
  var $textArea = document.getElementById('textarea');
  var $number = document.getElementById('number');
  var $response = document.getElementById('response');
  // get data
  var btnType = e.target.classList[0];
  var textValue = $textArea.value;
  var number = parseInt($number.value);
  // build containers
  var items = [];
  var newItems = [];
  var response = '';

  // reset response
  document.getElementById('response').innerHTML = '';

  // trim items and check for undefined
  if (textValue !== '' && textValue !== undefined) {
    items = textValue.split(/[.,;\/	]/g);
    items.forEach((e, i) => {
      items[i] = e.replace(/\s\s+/g, '');
      items[i] = e.trim();
      if (items[i] === '' || items[i] === ' ') {
        items.splice(i, 1);
        response = '<p>I had to remove some empty items or weird spaces, sorry.</p>';
        i = i - 1;
      }
    });
    $textArea.value = items.join(', ');

    // list has to match number of items
    if (items.length >= number) {
      for (let i = 0; i <= number - 1; i++) {
        var index = Math.floor(Math.random() * items.length);
        var item = items.splice(index, 1);
        newItems.push(item);
      }
      // excludes items from list
      if (btnType === 'btn_exclude') {
        $textArea.value = items.join(', ');
      }

      // build response
      response += `<h2>Your picked items are:</h2><p>${newItems.join(', ')}</p>`;
    } else {
      response += `<p>are you sure you want to pick ${number} items from a list ${items.length} items long?</p>`;
    }
  } else {
    response += '<p>It looks there\'s something wrong with your list. Maybe it\'s empty or whatnot.</p>';
  }

  // insert into response
  var div = document.createElement('div');
  div.innerHTML = response;
  $response.appendChild(div);
}

document
  .getElementById('btn_leave')
  .addEventListener('click', (e) => {
    clicked(e);
  });

document
  .getElementById('btn_exclude')
  .addEventListener('click', (e) => {
    clicked(e);
  });


