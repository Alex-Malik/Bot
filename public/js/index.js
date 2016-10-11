$(function () {
  $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
    FB.init({
      appId: '1544323505870818',
      version: 'v2.8' // or v2.1, v2.2, v2.3, ...
    });
  });

  $('#fb-login').on('click', signInViaFacebook);

  function signInViaFacebook() {
    if (!FB) return;
    FB.login(function (response) {
      // Split object on variables
      var status = response.status;
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      var signedRequest = response.authResponse.signedRequest;
      var expiresIn = response.authResponse.expiresIn;

      // Show auth info in corresponding info box
      $('#fb-accessToken').text(accessToken);
      $('#fb-expiresIn').text(expiresIn);
      $('#fb-signedRequest').text(signedRequest);
      $('#fb-userID').text(uid);

      // Check status and get messages
      if (status === 'connected') {
        getFacebookMessages(uid, accessToken);
      } else if (status === 'not_authorized') {
        // The user is logged in to Facebook,
        // but has not authenticated the app
      } else {
        // The user isn't logged in to Facebook.
      }
    }, {scope: 'pages_messaging'})
  }

  function getFacebookMessages(uid, accessToken) {
    if (!FB) return;

    FB.api('https://graph.facebook.com/v2.6/me/messages?access_token=' + accessToken, 'post', console.log);
  }
});