var React = require('react');
require('../../css/styles.css')
var axios = require('axios')


function BookItem(props){
    console.log(props.data);
    return(
        <tbody>
            <tr>
                <td>{props.data.title}</td>
                <td>{props.data.quantity}</td>
                <td>{props.data.edition}</td>
                <td>{props.data.status}</td>
                <td>{props.data.publisher}</td>
                <td>
                </td>
            </tr>
       </tbody>
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
        <table className="ui celled table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Edition</th>
                <th>Status</th>
                <th>Punblisher</th>
                <th>To Read</th>
            </tr>
            </thead>
            {sections}
        </table>
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
