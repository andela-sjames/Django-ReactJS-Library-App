var React = require('react');
require('../../css/styles.css');
var axios = require('axios');

function Category(props){
    return(
        <tbody>
            <tr>
                <td>{props.data.name}</td>
            </tr>
       </tbody>
    )
}

function Details(props) {
    var sections = []
        if(props.data.results !== undefined){
            props.data.results.forEach(function(item, i){
                sections.push(<Category data={item} key={i}/>)
            });
        }

    return (
        <table className="ui celled table">
            <thead>
            <tr>
                <th>Categories</th>
            </tr>
            </thead>
            {sections}
        </table>
    )
}

var Categories = React.createClass({

    getInitialState: function() {
        return {
            data: []
        };
    },

    getCategoryDetail: function() {
        return axios.get('/api/categories/');
    },

    getSetResult: function(response) {
        this.setState({ data: response.data});
    },

    componentDidMount: function() {
        this.getCategoryDetail()
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

module.exports = Categories;
