$.ajaxSetup({
    headers: {
        "X-CSRFToken": $("meta[name='csrf-token']").attr("content"),
        'Cache-Control': 'no-store'
    },
});
$.ajaxSetup({ cache: false });



function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;


    $.ajax({
            type: "GET",
            url: "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token,
            success: function(response) {
                console.log(response)
                $.ajax({
                    type: "GET",
                    url: "/libraryapp/user/verify/",
                    data: response,
                    success: function(response) {
                        if (response == "success") {
                            location.href= "/libraryapp/user/dashboard/";
                        }
                    },

                    error: function(error) {
                         console.log(error.responseText)
                        if (error.status == 405) {

                            $('.ui.basic.modal')
                                .modal('show');
                            signOut();
                        }

                    },

                    headers: {
                        "X-CSRFToken": $("input[name='csrfmiddlewaretoken']").val()
                    },
                })
            },

            error: function(error) {
                    console.log(error.responseText)
                },
        });
}

function onFailure(error) {
      console.log(error);
    }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect().then(function () {
      console.log('User signed out.');
    });
}

function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': onFailure
      });
    }
