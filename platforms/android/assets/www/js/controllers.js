'use strict';

/* Controllers */

var messageControllers = angular.module('messageControllers', []);

messageControllers.controller('MessageListCtrl', ['$scope', 'Message', '$state',
        function($scope, Message, $state) {
            $scope.messages = Message.query();
            $scope.sendSms = function(args){
            $state.go('msgSend', args);
                };
            }]
);

messageControllers.controller('MessageSendCtrl', ['$scope', '$stateParams', '$timeout', '$state',
    function($scope, $stateParams, $timeout, $state) {
        $scope.counter = 10;
        $scope.counterProgressBar = 0;

        var circleProgressObj = $('.circle');

        circleProgressObj.circleProgress({
          startAngle: Math.PI * 1.5,
          value: $scope.counterProgressBar,
          lineCap: 'round',
          fill: {
            gradient: ["#f44437", "#ffc108"],
            gradientAngle: Math.PI / 3.5
          },
          size: 1000,
        }).on('circle-animation-progress', function(event, progress, stepValue) {
            var countdown = 10 - (stepValue.toFixed(1) * 10);
            $(this).find('strong').text(countdown);
        });

        $scope.onTimeout = function(){
            if ( 0 == $scope.counter ) {
                MyNamespace.helpers.sendSms($stateParams.message, $stateParams.numbers, $state);
            } else {
                $scope.counter--;
                $scope.counterProgressBar += 0.1;
                circleProgressObj.circleProgress('value', $scope.counterProgressBar);
                mytimeout = $timeout($scope.onTimeout,1000);
            }
        };

        var mytimeout = $timeout($scope.onTimeout,1000);
    }]);

messageControllers.controller('MessageSuccessCtrl', ['$scope', '$state', '$timeout',
        function($scope, $state, $timeout) {
            $scope.onTimeout = function(){
                $state.go('msg');
            }
            var timeout = $timeout($scope.onTimeout, 3000);
        }]
);