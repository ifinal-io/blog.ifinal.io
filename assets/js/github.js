Github = {
  options: {},
  init: function (options) {
    this.options = options;
  },
  token: function (params, success) {

    $.extend(params, this.options);
    console.log(params);
    $.ajax({
      url: 'https://github.com/login/oauth/access_token',
      data: params,
      success: success,
      dataType: 'json'
    });
  }
}