window.basketForm = () => {
  const $basketForm = $('#form-basket');

  const $header = $('<h3>').text('Basket Entry Form');
  const $form = $('<form>').attr({
    action: '/basket',
    method: 'post',
  });

  // !!! NAME

  const $name = make.design.row();
  const $nameLabel = make.element.label('Name:', ['col-xs-4']);
  const $nameInput = make.element.input({
    name: 'name',
    id: 'basket-focus',
    type: 'text',
    value: '',
  }, 
  []);
  const $nameInputContainer = $('<div>')
    .addClass('col-xs-8')
    .append($nameInput);
  $name.append($nameLabel, $nameInputContainer);

  // !!! TYPE

  const $type = make.design.row();
  const $typeLabel = make.element.label('Type:', ['col-xs-4']);
  const $typeInput = make.element.input({
    name: 'type',
    type: 'text',
    value: '',
  }, 
  []);
  const $typeInputContainer = $('<div>')
    .addClass('col-xs-8')
    .append($typeInput);
  $type.append($typeLabel, $typeInputContainer);

  // !!! DESC

  const $desc = make.design.row();
  const $descLabel = make.element.label('Description:', ['col-xs-4']);
  const $descInput = make.element.input({
    name: 'desc',
    type: 'text',
    value: '',
  }, 
  []);
  const $descInputContainer = $('<div>')
    .addClass('col-xs-8')
    .append($descInput);
  $desc.append($descLabel, $descInputContainer);
  
  // !!! QUANTITY
  
  const $quantity = make.design.row();
  const $quantityLabel = make.element.label('Quantity:', ['col-xs-4']);
  const $quantityInput = make.element.select.number({
    name: 'quantity',
    start: 0,
    end: 15,
    select: 1,
  });
  const $quantityInputContainer = $('<div>')
  .addClass('col-xs-8')
  .append($quantityInput);
  $quantity.append($quantityLabel, $quantityInputContainer);
  
  // !!! YEAR
  
  const $year = make.design.row();
  const $yearLabel = make.element.label('Year:', ['col-xs-4']);
  const $yearInput = make.element.select.number({
    name: 'year',
    start: 1986,
    end: 2017,
    select: 1986,
  });
  const $yearInputContainer = $('<div>')
  .addClass('col-xs-8')
  .append($yearInput);
  $year.append($yearLabel, $yearInputContainer);
  
  // !!! COLOR
  
  const $color = make.design.row();
  const $colorLabel = make.element.label('Color:', ['col-xs-4']);
  const $colorInput = make.element.select.word({
    name: 'color',
    choices: [
      'blue',
      'red',
      'green',
      'ivory',
    ],
    select: 'N/A',
  });
  const $colorInputContainer = $('<div>')
  .addClass('col-xs-8')
  .append($colorInput);
  $color.append($colorLabel, $colorInputContainer)
  
  // !!! SIZE
  
  const $size = make.design.row();
  const $sizeLabel = make.element.label('Size:', ['col-xs-4']);
  const $sizeInput = make.element.select.word({
    name: 'size',
    choices: [
      'small',
      'medium',
      'large',
    ],
    select: 'N/A',
  });
  const $sizeInputContainer = $('<div>')
  .addClass('col-xs-8')
  .append($sizeInput);
  $size.append($sizeLabel, $sizeInputContainer)
  
  // !!! ACCESSORIES

  const $accessories = make.design.row();
  const $accessoriesLabel = make.element.label('Accessories:', ['col-xs-4']);
  const $accessoriesInput = make.element.input({
    name: 'accessories',
    type: 'text',
    placeholder: 'Separate with commas',
    value: '',
  }, 
  []);
  const $accessoriesInputContainer = $('<div>')
    .addClass('col-xs-8')
    .append($accessoriesInput);
  $accessories.append($accessoriesLabel, $accessoriesInputContainer);
  
  // !!! SUBMIT BUTTON

  const $button = make.design.row();
  const $buttonLabel = make.element.label(null, ['col-xs-4']);
  const $buttonInput = make.element.any('<button>', 'Submit', {
    type: 'submit',
  }, 
  [
    'btn',
    'btn-lg',
    'btn-block',
    'btn-success',
  ]);
  const $buttonInputContainer = $('<div>')
    .addClass('col-xs-8')
    .append($buttonInput);
  $button.append($buttonLabel, $buttonInputContainer);
  
  // !!! APPEND

  $form.append(
    $name,
    $type,
    $desc,
    $quantity,
    $year,
    $color,
    $size,
    $accessories,
    $button,
  )

  $basketForm.append(
    $header,
    $form,
  );
}