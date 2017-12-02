const request = {
  basket: {},
  ceramic: {},
  accessory: {},
}

// !!! //////////////////////////////////////////////////////////////
// !!! BASKET ///////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

request.basket.editOne = function (id, data) {
  confirmChoice(`Are you sure you want to update ${data.name} basket?`)
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

request.basket.removeOne = function(id, name) {
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

// TODO: implement this
request.basket.getOne = function () {}

request.basket.getAll = function () {
  $.get('/basket', function(baskets) {
    const $baskets = baskets.map(basket => {
      const $container = $('<div>').attr('id', basket._id).addClass('basket-container simple-row');
      const $year = makeElement('<p>', 'property property-s year', basket.year);
      const $quantity = makeElement('<p>', 'property property-s quantity', basket.quantity);
      const $name = makeElement('<p>', 'property name', basket.name);
      const $type = makeElement('<p>', 'property type', basket.type);
      const $desc = makeElement('<p>', 'property desc', basket.desc);
      const $color = makeElement('<p>', `property property-m color ${basket.color}-text`, basket.color);
      const $size = makeElement('<p>', 'property property-m size hidden-xs', basket.size);
      const $lid = makeElement('<p>', 'property property-s lid hidden-xs');
      $lid.append(makeTrueFalseElement(basket.lid));
      const $liner = makeElement('<p>', 'property property-s liner hidden-xs');
      $liner.append(makeTrueFalseElement(basket.liner));
      const $protector = makeElement('<p>', 'property property-s protector hidden-xs');
      $protector.append(makeTrueFalseElement(basket.protector));
      const $edit = makeElement('<p>', 'property property-s edit hidden-xs');
      $edit.append(
        $('<i>')
        .addClass('fa fa-edit blue-text')
        .attr('aria-hidden', 'true')
        .click(() => enterEditBasketMode(basket._id))
      );
      const $delete = makeElement('<p>', 'property property-s delete hidden-xs');
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

// !!! //////////////////////////////////////////////////////////////
// !!! CERAMIC //////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

// !!! //////////////////////////////////////////////////////////////
// !!! ACCESSORY ////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////