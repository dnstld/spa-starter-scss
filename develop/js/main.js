var MyPage = {
  instances: {},
  variables: {},

  init: function() {
    "use strict";

    MyPage.carousel();
  },
  carousel: function() {
    "use strict";

    return false;
  }
}
$(document).on("ready", function() {
  "use strict";

  MyPage.init();
});
