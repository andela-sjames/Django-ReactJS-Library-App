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
                showCursor: true,
                contentType: 'html',
                typeSpeed: 30,
                backSpeed: 0,
            });


            // $("#authorDisplay").typed({
            //     strings: quotes_author,
            //     loop: true,
            //     showCursor: true,
            //     contentType: 'html',
            //     typeSpeed: 250,
            //     backSpeed: 250,
            //     backDelay: 1000,
            // });

        },


    })


})();
