'use strict';

Coffee.coffeLineDataServices.factory('CoffeeLineData', function ($resource) {
        return $resource('http://192.168.66.76:9999/users/getCoffeeLine', {}, {
            query: { method: 'GET', params: {}, isArray: true }
        });
    });