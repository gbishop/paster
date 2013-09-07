var mod = angular.module('MyPasterModule', []);
mod.config(function($compileProvider) {
        // convince angular to allow javascript links
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|javascript):/);
    });
mod.filter('pastify', function() {
        return function(input) {
            function toHTML(input) {
                return input
                    .split('\n')
                    .map(function(t) {
                        return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&#34;');
                    })
                    .join('<br/>');
            }
            return "javascript:(function(){"+
                "var d=document.createElement('div');"+
                "d.innerHTML='" + toHTML(input) + "';"+
                "window.getSelection().getRangeAt(0).insertNode(d);})()";
        };
    });

function PasterControl($scope) {
    $scope.text = "";
}
