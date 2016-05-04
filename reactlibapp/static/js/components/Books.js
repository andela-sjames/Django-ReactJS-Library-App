var React = require('react');
require('../../css/styles.css')
var axios = require('axios')


function BookItem(props){
    console.log(props.data);
    return(
        <div>
            <table class="ui celled table">
                <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                </thead>
        </div>
    )
}

function Details(props) {
    var sections = []
        if(props.data.results !== undefined){
            props.data.results.forEach(function(item, i){
                sections.push(<BookItem data={item} key={i}/>)
            });
        }

    return (
        <div>

            {sections}

        </div>
    )
}

var Books = React.createClass({

    getInitialState: function() {
        return {
            data: []
        };
    },

    getBookDetail: function() {
        return axios.get('/api/books/');
    },

    getSetResult: function(response) {
        this.setState({ data: response.data});
    },

    componentDidMount: function() {
        this.getBookDetail()
            .then(this.getSetResult)
              .catch(function (response) {
                console.log(response);
        });
    },

    render: function() {
        return (
            <Details data={this.state.data}/>
        );
    }

});

module.exports = Books;
