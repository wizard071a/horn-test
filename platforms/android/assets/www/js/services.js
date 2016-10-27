'use strict';

/* Services */
var messageServices = angular.module('messageServices', ['ngResource']);

messageServices.factory('Message', ['$resource',
        function($resource){
            return $resource('message/messages.json/:title', {}, {
                query: {method:'GET', isArray:true}
            });
        }]
);