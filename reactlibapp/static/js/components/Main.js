var React = require('react');
require('../../css/styles.css')

var styles = {

    header: {
        color: '#4A90E2',
      },
}

var Header = React.createClass({
    render: function(){
        return (
            <div id="head" className="ui block header">
                <div className="ui grid">
                    <div className="four column row">
                        <div className="left floated column">
                            <h1 id="title">CuriousMind</h1>
                        </div>
                        <div className="right floated column">
                            <h1 id="title">Logged in as...</h1>
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

    render: function() {
        return (
            <div className='main-container'>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }

});

module.exports = Main;
