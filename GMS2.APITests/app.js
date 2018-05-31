var jsonfile = require('jsonfile');
var request = require('request');


var userList;

var defaultRequest = request.defaults({baseUrl: 'http://localhost:5000' })

//User Registration test
var file = 'test-data/mock-users-2.json';
jsonfile.readFile(file, function (err, obj) {
    this.userList = obj;
})

userList.forEach(element => {
    defaultRequest.post('/api/account/register', {
        json: true,
        body: element
    }, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body); 
    });
});

// User Login & Logout test

userList.forEach(element => {
        defaultRequest.post('/api/account/register', {
            json: true,
            body: {email: element['email'], password: element['password']}
        }, function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode); 
            console.log('body:', body); 
        });
    });
})
