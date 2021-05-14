Github = {
  proxy: 'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
  options: {},
  init: function (options) {
    this.options = options;
  },
  token: function (code, success) {

    $.ajax({
      url: this.proxy,
      headers: {
        'Accept':'application/json'
      },
      type: 'POST',
      data: JSON.stringify({
        code: code,
        client_id: this.options.clientID,
        client_secret: this.options.clientSecret
      }),
      success: success,
      dataType: 'json'
    });
  }
}