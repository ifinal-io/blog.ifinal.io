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
      type: 'POST',
      headers: {
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'POST',
        'origin': 'https://blog.ifinal.io',
        'referer': 'https://blog.ifinal.io/',
      },
      data: params,
      success: success,
      dataType: 'json'
    });
  }
}