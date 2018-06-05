var jsonfile = require('jsonfile');
var request = require('request');



var defaultRequest = request.defaults({
    baseUrl: 'http://localhost:5000'
})

var file = 'test-data/mock-users-2.json';
var userList = jsonfile.readFileSync(file);

//User Registration test
// userList.forEach(element => {
//     defaultRequest.post('/api/account/register', {
//         json: true,
//         body: element
//     }, function (error, response, body) {
//         console.log('error:', error);
//         console.log('statusCode:', response && response.statusCode);
//         console.log('body:', body);
//     });
// });

let count = 0;
let err = 0;
// User Login & Logout test
userList.forEach(element => {
    defaultRequest.post('/api/account/login', {
        json: true,
        body: {
            email: element.Email,
            password: element.Password
        }
    }, function (error, response, body) {
        if ( response.statusCode >= 200 && response.statusCode <= 299)
            count++;
        else
            err++
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('succceded: ', count)
        console.log('failed: ', err)
        //console.log('body:', body);
    });
});
