angular.module('mod', ['firebase']);

angular.module('mod').controller('ctrl', function ($scope, $firebaseArray) {
    //读取数据库
    var base = new Firebase('https://lsz.firebaseio.com/');
    var contactBase = $firebaseArray(base);
    $scope.contents = contactBase;

    //初始化
    //昵称
    $scope.nikeName = localStorage.getItem("nikeName");
    $scope.nikeName = $scope.nikeName === null ? "游客" + Math.floor(Math.random() * 100000) : $scope.nikeName;
    //性别
    $scope.sex = localStorage.getItem("sex");
    $scope.sex = $scope.sex === null ? "1" : $scope.sex;
    $scope.sexMark = $scope.sex === "0" ? "♀" : "♂";
    //头像
    //$scope.head = $scope.sex === "1" ? "img/boy-head.jpg?"+Math.random() : "img/girl-head.jpg?"+Math.random();
    $scope.head = localStorage.getItem("head");
    $scope.head = $scope.head === null ? "img/null.jpg?" + Math.random() : $scope.head + "?" + Math.random();

    //发送消息
    $scope.send = function () {
        console.log($scope.message)

        $scope.content = {
            "name": $scope.nikeName,
            "time": $scope.getTime(),
            "message": $scope.message,
            "head": $scope.head,
            "sexMark": $scope.sexMark
        };
        contactBase.$add($scope.content).then(function (ref) {
            $scope.message = "";
        });
    };

    //Enter发送
    $scope.enterSend = function ($event) {
        if ($event.keyCode === 13 && !$scope.sendForm.$invalid) {
            $scope.send();
        }
    };

    //打开设置
    $scope.config = function () {
        $("#configModal").modal("show");
    };

    //保存设置
    $scope.saveConfig = function () {
        localStorage.setItem("nikeName", $scope.nikeName);
        localStorage.setItem("sex", $scope.sex);
        localStorage.setItem("head", $scope.head);
        //$scope.head = $scope.sex === "1" ? "img/boy-head.jpg?"+Math.random() : "img/girl-head.jpg?"+Math.random();
        $scope.head = $scope.head + "?" + Math.random();
        $scope.sexMark = $scope.sex === "0" ? "♀" : "♂";
        $("#configModal").modal("hide");
    };

    //获取当前时间
    $scope.getTime = function () {
        var date = new Date;
        return date.getHours() + ":" + date.getMinutes();
    };

    //全部头像
    $scope.heads = (function () {
        var ary = [];
        for (var i = 1; i <= 8; i++) {
            ary.push("img/h" + i + ".jpg");
        }
        return ary;
    })();

    //设置头像
    $scope.setHead = function (img) {
        $scope.head = img;
    };
});


$(function () {
    //初始化提示
    $('[data-toggle="config"]').tooltip();
    $('[data-toggle="send"]').tooltip();

    $(document).bind("contextmenu", function (e) {
        return false;
    });

});