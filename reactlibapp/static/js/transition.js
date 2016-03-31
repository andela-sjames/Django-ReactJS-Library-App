(function(){

    $.ajax({
            type: "GET",
            url: "/api/quotes/",
            success: function(response) {
                quotes_result =[]
                quotes_author =[]
                var data = response.results;
                data.forEach(function(quote, idx){
                    console.log(quote.statement);
                    quotes_result.push(quote.statement);
                    quotes_author.push(quote.author);
                    // return result;
                });
            $("#quotesDisplay").typed({
                strings: quotes_result,
                loop: true,
                showCursor: false,
                contentType: 'html',
                typeSpeed: 30,
                backSpeed: 0,
            });


        },

        error: function(error) {
            console.log(error.responseText)
        },


    })


})();
