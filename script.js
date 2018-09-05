console.log('loaded');
$('button').click(e => {
  e.preventDefault();
  var btnType = $(e.target).attr('class');
  var textArea = $('#textarea').val();
  var number = parseInt($('#number').val());
  var items = [];
  var newItems = [];
  var response = '';
  $('#response').html('');
  // trim items and check for undefined
  if (textArea !== '' && textArea !== undefined) {
    items = textArea.split(/[.,;\/	]/g);
    items.forEach((e, i) => {
      items[i] = e.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
      if (items[i] === '') {
        items.splice(i, 1);
        response = '<p>I had to remove some empty spaces, sorry.</p>';
      }
    });

    // list has to match number of items
    if (items.length >= number) {
      for (let i = 0; i <= number - 1; i++) {
        var index = Math.floor(Math.random() * items.length);
        var item = items.splice(index, 1);
        newItems.push(item);
      }
      // excludes items from list
      if (btnType === 'btn_exclude') {
        $('#textarea').val(items.join(', '));
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
  $('#response').append(response);
});