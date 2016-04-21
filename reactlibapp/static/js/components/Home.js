var React = require('react');

var styles = {

    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100,
      },
}

var Home = React.createClass({

    render: function() {
        return (
            <div id='home' style={styles.container}>
                <h1 style={styles.header}>AMITY</h1>
            </div>
        );
    }

});

module.exports = Home;
