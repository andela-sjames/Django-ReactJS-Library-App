var React = require('react');
require('../../css/styles.css')
var axios = require('axios')

var Header = React.createClass({
    render: function(){
        console.log(this.props);
        return (
            <div id="head" className="ui block header">
                <div className="ui grid">
                    <div className="four column row">
                        <div className="left floated column">
                            <h1 id="title">CuriousMind</h1>
                        </div>
                        <div className="right floated column cont">
                            <div className="item"><span id="title">Logged in as {this.props.username}</span></div>
                            <div className="item"><img src={this.props.image} className="ui mini circular image"/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

var Footer = React.createClass({

    render: function(){
        return (
            <div id="react-footer" className="ui block header bc-grnd">
                <div>
                    <h2 className="footer-title">Footer</h2>
                </div>
            </div>
        )
    }
})


var Main = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            image_url: ''
        };
    },

    getUserDetail: function() {
        return axios.get('/api/appuser/');
    },

    getResult: function(response) {
        this.setState({
            username: response.data.app_user.username,
            image_url: response.data.appuser_picture,
        });

    },

    componentDidMount: function() {
        return this.getUserDetail()
            .then(this.getResult)
              .catch(function (response) {
                console.log(response);
            });
    },


    render: function() {
        return (
            <div className='main-container'>
                <Header username={this.state.username} image={this.state.image_url}/>
                {this.props.children}
                <Footer />
            </div>
        );
    }

});

module.exports = Main;
