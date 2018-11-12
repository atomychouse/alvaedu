myapp.controller('headCtr',function($scope,$http,pathImgCrop){
    $scope.section = {
        stype:'page',
        pk:'1',
        portada:{
                title:'BRANDLINE ',
                imgp:'/static/imgs/172689131.jpg',
            }
    };

    $scope.cambiale = function(ev,element,targetimg,stylimg) {
        ev.preventDefault();
        jQuery('#loader-file').click();
        $scope.elementado = element;
        $scope.targetimg = targetimg;
        $scope.stylimg = stylimg;
        pasale = $scope;
        pathImgCrop.setPath([element,targetimg]);
    };



});