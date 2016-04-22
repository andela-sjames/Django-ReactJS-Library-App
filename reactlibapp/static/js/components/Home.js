var React = require('react');
require('../../css/main.css');
var Books = require('./Books');
var Categories = require('./Categories');
var Authors = require('./Authors');


// var styles = {

//     header: {
//         fontSize: 45,
//         color: '#fff',
//         fontWeight: 100,
//       },
// }

var Home = React.createClass({

    render: function() {
        return (
            <div id='home'>
                <div className="spacetop">search</div>
                <div className="content">
                    <div className="ui top attached tabular menu">
                        <a className="item active" data-tab="Books">Books</a>
                        <a className="item" data-tab="Categories">Categories</a>
                        <a className="item" data-tab="Authors">Authors</a>
                        <a className="item" data-tab="Interest">Interest</a>
                        <a className="item" data-tab="History">History</a>
                    </div>
                    <div>
                        <div className="ui bottom attached tab segment active" data-tab="Books">
                          <Books />
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="Categories">
                          <Categories />
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="Authors">
                          <Authors />
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="Interest">
                          Interest component
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="History">
                          History component
                        </div>

                    </div>
                </div>
                <div className="spacebtm">bottom</div>
            </div>
        );
    }

});

module.exports = Home;
