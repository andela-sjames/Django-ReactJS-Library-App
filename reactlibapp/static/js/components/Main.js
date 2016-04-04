var React = require('react');
require('../../css/styles.css')


var Header = React.createClass({
    render: function(){
        return (
            <div id="react-header">
                <div>
                    <h2 className="title">CuriousMind</h2>
                </div>
            </div>
        )
    }
})

var Footer = React.createClass({

    render: function(){
        return (
            <div id="footer">
                <div>
                    <h2 className="title">Footer</h2>
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
