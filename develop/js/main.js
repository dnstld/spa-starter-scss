var Attitude = {
  instances: {},
  variables: {},

  init: function() {
    'use strict';

    Attitude.toggleMenu();
  },
  toggleMenu: function() {
    'use strict';

    $('#btn-menu').click(function() {
      $(this).toggleClass('opened');
      $('#main-navigation').toggleClass('active');
    });
  }
}
$(document).ready(function() {
  'use strict';

  Attitude.init();
});
