var React = require('react');
require('../../css/styles.css')
var axios = require('axios');

function MyAuthors(props){
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
                sections.push(<MyAuthors data={item} key={i}/>)
            });
        }

    return (
        <table className="ui celled table">
            <thead>
            <tr>
                <th>Authors</th>
            </tr>
            </thead>
            {sections}
        </table>
    )
}

var Authors = React.createClass({

    getInitialState: function() {
        return {
            data: []
        };
    },

    getAuthorDetail: function() {
        return axios.get('/api/authors/');
    },

    getSetResult: function(response) {
        this.setState({ data: response.data});
    },

    componentDidMount: function() {
        this.getAuthorDetail()
            .then(this.getSetResult)
              .catch(function (response) {
                console.log(response);
        });
    },

    render: function() {
        console.log(this.state.data.next);
        return (
            <div>
               <Details data={this.state.data}/>
               <div>
                <a href={this.state.data.next}>next</a>
               </div>
            </div>
        );
    }

});

module.exports = Authors;
