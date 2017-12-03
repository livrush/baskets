const make = {
  element: {
    select: {},
  },
  design: {},
  popUp: {},
  icon: {},
};

// !!! //////////////////////////////////////////////////////////////
// !!! ELEMENT //////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

make.element.any = function (element, text, attributes, classNames) {
  const $element = $(element);
  $element.text(text);
  $element.addClass(classNames.join(' '));
  $element.attr(attributes);
  return $element;
}

make.element.label = function (value, classNames) {
  const $label = $('<label>');
  $label.text(value);
  $label.addClass(classNames.join(' '));
  return $label;
}

make.element.input = function (attributes, classNames) {
  const $input = $('<input>');
  $input.attr(attributes);
  $input.addClass(classNames.join(' '));
  $input.addClass('form-control');
  return $input;
}

make.element.select.number = function ({ name, start, end, select }) {
  const $select = $('<select>')
    .attr('name', name)
    .addClass('form-control');
    $select.append(
      $('<option>').text('N/A')
    )
    for (let val = start; val < end + 1; val++) {
      const $option = $('<option>').text(val);
      $select.append($option);
      if (val === select) {
        $option.prop('selected', true);
      }
    }
    return $select;
  }
  
  make.element.select.word = function ({ name, choices, select }) {
    const $select = $('<select>')
    .attr('name', name)
    .addClass('form-control');
  $select.append(
    $('<option>').text('N/A')
  )
  choices.forEach((choice) => {
    const $option = $('<option>').text(choice);
    $select.append($option);
    if (choice === select) {
      $option.prop('selected', true);
    }
  })
  return $select;
}

// !!! //////////////////////////////////////////////////////////////
// !!! ICON /////////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

make.icon.trueFalse = function (bool) {
  if (bool) {
    return $('<i>').addClass('fa fa-check-square green-text').attr('exists', 'true').attr('aria-hidden', 'true');
  } else {
    return $('<i>').addClass('fa fa-window-close red-text').attr('exists', 'false').attr('aria-hidden', 'true');
  }
}

// !!! //////////////////////////////////////////////////////////////
// !!! LAYOUT ///////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

make.design.row = function () {
  return $('<div>').addClass('row input-section');
}

make.design.poductsHeader = function () {
  const $year = makeElement('<label>', 'property property-s year', 'Year');
  const $quantity = makeElement('<label>', 'property property-s quantity', '#');
  const $name = makeElement('<label>', 'property name', 'Name');
  const $type = makeElement('<label>', 'property type', 'Type');
  const $desc = makeElement('<label>', 'property desc', 'Desc');
  const $color = makeElement('<label>', 'property property-m color', 'Color');
  const $size = makeElement('<label>', 'property property-m size hidden-xs', 'Size');
  const $lid = makeElement('<label>', 'property property-s lid hidden-xs', 'Lid');
  const $liner = makeElement('<label>', 'property property-s liner hidden-xs', 'Liner');
  const $protector = makeElement('<label>', 'property property-s protector hidden-xs', 'Prot.');
  const $edit = makeElement('<label>', 'property property-s edit hidden-xs', 'Edit');
  const $delete = makeElement('<label>', 'property property-s delete hidden-xs', 'Del');
  return $('<div>').append($year, $quantity, $name, $type, $color, $size, $lid, $liner, $protector, $edit, $delete).addClass('table-header simple-row');
}

make.design.productsBody = function (products) {

}

make.design.editProduct = function (product) {
  
}

// !!! //////////////////////////////////////////////////////////////
// !!! POPUP ////////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

make.popUp.confirm = function (message) {
  return new Promise((res, rej)=> {
    const $popUp = $('<div>')
      .addClass('pop-up_confirm');
    const $title = $('<h1>')
      .text('Are you sure?');
    const $label = $('<label>')
      .text(message);
    const $message = $('<p>')
      .text('If so, enter authorization password below.');
    const $input = $('<input>')
      .attr('id', 'secret')
      .attr('type', 'password')
      .addClass('form-control');
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
    $popUp.append($title, $label, $message, $input, $('<div>').append($decline, $accept));
    $('body').append($popUp);
    $input.focus();
  })
}

make.popUp.message = function (message) {
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