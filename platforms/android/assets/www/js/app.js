'use strict';

var MyNamespace = MyNamespace || {};

MyNamespace.helpers = {
    sendSms: function(messageContent, numbers, $state) {
        console.log('send sms Begin');
        console.log(messageContent);
        console.log(numbers);
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: '' // send SMS without open any other app
            }
        };
        var success = function () { console.log('Message send Success'); };
        var error = function (e) { console.log('Message Failed:' + e); };
//        $(numbers.split(',')).each(function(){
//            var number = this.toString();
//            console.log(number);
//            sms.send(number, messageContent, options, success, error);
//        });
        console.log('End Send SMS');
        $state.go('msgSuccess');
    }
};

/* App Module */
var messageApp = angular.module('messageApp', [
    'ui.router',
    'messageControllers',
    'messageServices',
    'ngTouch'
]);

messageApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/message');
        $stateProvider.
            state('msg', {
                url: '/message',
                templateUrl: 'partials/message-list.html',
                controller: 'MessageListCtrl'
            }).
            state('msgSend', {
                url: '/message/:message/:numbers',
                templateUrl: 'partials/message-send.html',
                controller: 'MessageSendCtrl'
            }).
            state('msgSuccess', {
                url: '/success',
                templateUrl: 'partials/message-success.html',
                controller: 'MessageSuccessCtrl'
            });
    }]);