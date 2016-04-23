var React = require('react');
require('../../css/styles.css')

var Books = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            image_url: ''
        };
    },

    getBookDetail: function() {
        return axios.get('/api/books/');
    },

    getSetResult: function(response) {
        this.setState({

        });
    }

    componentDidMount: function() {
        this.getBookDetail()
            .then(this.getSetResult)
              .catch(function (response) {
                console.log(response);
        });
    },

    render: function() {
        return (
            <div>
                I have a lot of books
            </div>
        );
    }

});

module.exports = Books;
