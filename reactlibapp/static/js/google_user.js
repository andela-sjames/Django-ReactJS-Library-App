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
                            alert("wrong data received")
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





    console.log('id_token: ' + id_token);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}


//url: "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token,
