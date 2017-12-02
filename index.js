$('document').ready(function() {
  getBaskets();

  $('#show-basket-form').click(function() {
    $('.baskets-form').toggle();
  })

  $('#get-basket-data').click(getBaskets);
});

function hideForms() {
  $('.baskets-form').hide();
  $('.ceramics-form').hide();
  $('.accessories-form').hide();
}

function editBasket(id, data) {
  confirmChoice(`Are you sure you want to delete ${name} basket?`)
    .then((secret) => {
      console.warn(secret);
      $.ajax({
        url: '/basket',
        data: { id, data, password: secret },
        type: 'PUT',
        success: function() {
          popUpMessage('Basket successfully edited!');
          getBaskets();
        },
        error: function() {
          popUpMessage('Unauthorized edit canceled.');
          getBaskets();
        }
      });
    })
    .catch(() => popUpMessage('Edit canceled.'));
}

function removeBasket(id, name) {
  confirmChoice(`Are you sure you want to delete ${name} basket?`)
    .then((secret) => {
      $.ajax({
        url: '/basket',
        data: { id, password: secret },
        type: 'DELETE',
        success: function() {
          popUpMessage('Basket successfully deleted!');
          getBaskets();
        },
        error: function() {
          popUpMessage('Unauthorized delete canceled.');
          getBaskets();
        }
      });
    })
    .catch(() => popUpMessage('Delete canceled.'));
}

function getBaskets() {
  $.get('/basket', function(baskets) {
    const $baskets = baskets.map(basket => {
      const $container = $('<div>').attr('id', basket._id).addClass('basket-container simple-row');
      const $year = makeElement('<p>', 'property property-s year', basket.year);
      const $quantity = makeElement('<p>', 'property property-s quantity', basket.quantity);
      const $name = makeElement('<p>', 'property name', basket.name);
      const $type = makeElement('<p>', 'property type', basket.type);
      const $desc = makeElement('<p>', 'property desc', basket.desc);
      const $color = makeElement('<p>', `property property-m color ${basket.color}-text`, basket.color);
      const $size = makeElement('<p>', 'property property-m size', basket.size);
      const $lid = makeElement('<p>', 'property property-s lid');
      $lid.append(makeTrueFalseElement(basket.lid));
      const $liner = makeElement('<p>', 'property property-s liner');
      $liner.append(makeTrueFalseElement(basket.liner));
      const $protector = makeElement('<p>', 'property property-s protector');
      $protector.append(makeTrueFalseElement(basket.protector));
      const $edit = makeElement('<p>', 'property property-s edit');
      $edit.append(
        $('<i>')
        .addClass('fa fa-edit blue-text')
        .attr('aria-hidden', 'true')
        .click(() => enterEditBasketMode(basket._id))
      );
      const $delete = makeElement('<p>', 'property property-s delete');
      $delete.append(
        $('<i>')
        .addClass('fa fa-trash red-text')
        .attr('aria-hidden', 'true')
        .click(() => removeBasket(basket._id, basket.name))
      );
      $container.append($year, $quantity, $name, $type, $color, $size, $lid, $liner, $protector, $edit, $delete);
      return $container;
    });
    $('.products').empty().append(createTableHeader(), $baskets);
  });
}

function enterEditBasketMode (id) {
  const $basket = $(`#${id}`);
  const $year = makeInput($basket.find('.year')[0].innerText, 'year', 'property property-s');
  const $quantity = $('<select>').attr('name', 'quantity').addClass('property property-s quantity input-edit');
  Array.from('0000000000').forEach(function(e, i) {
    const $number = $('<option>').text(i + 1);
    if (i + 1 === Number($basket.find('.quantity')[0].innerText)) {
      $number.prop('selected', true);
    }
    $quantity.append($number);
  });
  const $name = makeInput($basket.find('.name')[0].innerText, 'name', 'property');
  const $type = makeInput($basket.find('.type')[0].innerText, 'type', 'property');
  // const $desc = makeInput($basket.find('.desc')[0].innerText, 'desc', 'property');
  const $color = $('<select>')
    .append(
      $('<option>').text('red').attr('value', 'red'),
      $('<option>').text('green').attr('value', 'green'),
      $('<option>').text('blue').attr('value', 'blue'),
      $('<option>').text('N/A').prop('selected', true)
    )
    .attr('name', 'color')
    .addClass('property property-m color input-edit');
  $color.find(`option[value="${$basket.find('.color')[0].innerText}"]`).prop('selected', true);

  const $size = $('<select>')
    .append(
      $('<option>').text('small').attr('value', 'small'),
      $('<option>').text('medium').attr('value', 'medium'),
      $('<option>').text('large').attr('value', 'large'),
      $('<option>').text('N/A').prop('selected', true)
    )
    .attr('name', 'size')
    .addClass('property property-m size input-edit');
  $size.find(`option[value="${$basket.find('.size')[0].innerText}"]`).prop('selected', true);

  const $lid = makeInput($basket.find('.lid').find('i').attr('exists'), 'lid', 'property property-s');
  const $liner = makeInput($basket.find('.liner').find('i').attr('exists'), 'liner', 'property property-s');
  const $protector = makeInput($basket.find('.protector').find('i').attr('exists'), 'protector', 'property property-s');
  const $edit = $('<button>').text('Update').addClass('property').click((e) => {
    e.preventDefault();
    const serialized = $(`#${id}`).serializeArray();
    const formData = serialized.reduce(function(res, data){
      res[data.name] = data.value;
      return res;
    }, {});
    editBasket($basket.attr('id'), formData);
  });
  const $form = $('<form>')
    .attr('id', id)
    .addClass('basket-container simple-row')
    .append($year, $quantity, $name, $type, $color, $size, $lid, $liner, $protector, $edit);

  $basket.replaceWith($form);

  $year.focus();
}

function createTableHeader() {
  const $year = makeElement('<label>', 'property property-s year', 'Year');
  const $quantity = makeElement('<label>', 'property property-s quantity', '#');
  const $name = makeElement('<label>', 'property name', 'Name');
  const $type = makeElement('<label>', 'property type', 'Type');
  const $desc = makeElement('<label>', 'property desc', 'Desc');
  const $color = makeElement('<label>', 'property property-m color', 'Color');
  const $size = makeElement('<label>', 'property property-m size', 'Size');
  const $lid = makeElement('<label>', 'property property-s lid', 'Lid');
  const $liner = makeElement('<label>', 'property property-s liner', 'Liner');
  const $protector = makeElement('<label>', 'property property-s protector', 'Prot.');
  const $edit = makeElement('<label>', 'property property-s edit', 'Edit');
  const $delete = makeElement('<label>', 'property property-s delete', 'Del');
  return $('<div>').append($year, $quantity, $name, $type, $color, $size, $lid, $liner, $protector, $edit, $delete).addClass('table-header simple-row');
}

function makeElement(name, classNames, text, attr) {
  const $element = $(name);
  $element.text(text);
  $element.addClass(classNames);
  if (attr) {
    $element.attr(attr[0], attr[1]);
  }
  return $element;
}

function makeInput(value, name, classNames) {
  const $element = $('<input>');
  $element.attr('value', value);
  $element.attr('name', name)
  $element.addClass(classNames, 'input-edit');
  return $element;
}

function makeTrueFalseElement(bool) {
  if (bool) {
    return $('<i>').addClass('fa fa-check-square green-text').attr('exists', 'true').attr('aria-hidden', 'true');
  } else {
    return $('<i>').addClass('fa fa-window-close red-text').attr('exists', 'false').attr('aria-hidden', 'true');
  }
}

function confirmChoice(message) {
  return new Promise((res, rej)=> {
    const $popUp = $('<div>')
      .addClass('pop-up_confirm');
    const $message = $('<p>')
      .text(message);
    const $message2 = $('<p>')
      .text('If so, enter authorization password below.');
    const $input = $('<input>')
      .attr('id', 'secret')
      .attr('type', 'password')
      .addClass('form-control')
      .focus();
    const $decline = $('<button>')
      .text('No')
      .addClass('btn btn-danger')
      .click(() => {
        $('.pop-up_confirm').remove();
        rej();
      });
      const $accept = $('<button>')
      .text('Yes')
      .addClass('btn btn-success')
      .click(() => {
        const secret = $('#secret').val();
        $('.pop-up_confirm').remove();
        res(secret);
      });
    $popUp.append($message, $message2, $input, $('<div>').append($decline, $accept));
    $('body').append($popUp);
  })
}

function popUpMessage(message) {
  const randomId = `msg${Math.floor(Math.random() * 200)}`
  $('<div>')
    .append(
      $('<label>').text('Message:'),
      $('<p>').text(message),
      $('<i>')
        .addClass('delete-button fa fa-times-circle red-text')
        .attr('aria-hidden', 'true')
        .click(() => $(`#${randomId}`).remove())
    )
    .attr('id', randomId)
    .addClass('pop-up_message')
    .appendTo('body');
}