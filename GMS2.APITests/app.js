var jsonfile = require('jsonfile');
var request = require('request');

var file = 'test-data/mock-users.json';

var userList;

jsonfile.readFile(file, function (err, obj) {


    obj.forEach(element => {
        request('http://localhost:5000/api/account/register', {
            method: 'POST',
            json: true,
            body: element
        }, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
    });
})

