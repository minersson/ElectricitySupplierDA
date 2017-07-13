﻿var publich_ctr = myApp.controller("publich_ctr", function ($scope, $rootScope, $http, $location, $window, $cookieStore, $interval, $filter, $timeout) {
    

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $scope.alert_warning = false;
    $scope.alert_success = false;
    $scope.alert_danger = false;
    $scope.alert_info = false;
    $scope.alert_warning_n = '';
    $scope.alert_success_n = '';
    $scope.alert_danger_n = "";
    $scope.alert_info_n = "";

    $scope.alert_fun = function (lei, nei) {
        $scope.alert_close_fun();
       
            if (lei == "warning") {
                $scope.alert_warning = true;
                $scope.alert_warning_n = nei;
            } else if (lei == "danger") {
                $scope.alert_danger = true;
                $scope.alert_danger_n = nei;
            } else if (lei == "success") {
                $scope.alert_success = true;
                $scope.alert_success_n = nei;
            } else if (lei == "info") {
                $scope.alert_info = true;
                $scope.alert_info_n = nei;
            };
          //  $scope.$apply();
        $timeout(function () {
            $scope.alert_close_fun()
        }, 15000);
    };
    $scope.alert_close_fun = function () {
        $scope.alert_warning = false;
        $scope.alert_success = false;
        $scope.alert_danger = false;
        $scope.alert_info = false;
    };

    //改变信源
    //0.1微信
    $scope.changeModel_baidu = function () {
        $rootScope.isActiveModale = "baidu";
        $cookieStore.put("isActiveModale", $rootScope.isActiveModale)

    }

    $scope.changeModel_bing = function () {
        $rootScope.isActiveModale = "bing";
        $cookieStore.put("isActiveModale", $rootScope.isActiveModale)
    }

    //0.2微信
    $scope.changeModel_sougou = function () {
        $rootScope.isActiveModale = "sougou";
        $cookieStore.put("isActiveModale", $rootScope.isActiveModale)

    }
    //0.3eMN

    $scope.changeModel_eMN = function () {
        $rootScope.isActiveModale = "eMarketNow";
        $cookieStore.put("isActiveModale", $rootScope.isActiveModale)

    }
    //0.4picS

    $scope.changeModel_picS = function () {
        $rootScope.isActiveModale = "picSearch";
        $cookieStore.put("isActiveModale", $rootScope.isActiveModale)
    }
    //0.5搜狗

    $scope.changeModel_weibo = function () {
        $rootScope.isActiveModale = "weibo";
        $cookieStore.put("isActiveModale", $rootScope.isActiveModale)
    }
    //0.6微博

    $scope.changeModel_sougo_new = function () {
        $rootScope.isActiveModale = "sougo_new";
        $cookieStore.put("isActiveModale", $rootScope.isActiveModale)
    }
    //0.7谷歌

    $scope.changeModel_googol = function () {
        $rootScope.isActiveModale = "googol";
        $cookieStore.put("isActiveModale", $rootScope.isActiveModale)
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //5.退出清cookie
    $scope.off = function () {
        $location.path("/home/main_1").replace();
        $rootScope.userID = "";
        $rootScope.LoginName = "";
        $rootScope.UsrRole = "";
        $rootScope.UsrKey = "";
        $rootScope.UsrNum = "";
        $rootScope.UsrEmail = "";
        //页面
        $rootScope.keyword = "";
        $rootScope.keywordName = "";
        //changexinyuan
        $rootScope.selectStatus = "";
        $rootScope.ZhibokeywordId = "";
        $rootScope.BaidukeywordId = "";
        $rootScope.keywordsListRecord = "";
        $rootScope.getBaiduRecordId = "";
        $cookieStore.remove("userID");
        $cookieStore.remove("LoginName");
        $cookieStore.remove("UsrRole");
        $cookieStore.remove("UsrKey");
        $cookieStore.remove("UsrNum");
        $cookieStore.remove("UsrEmail");
        $cookieStore.remove("keyword");
        $cookieStore.remove("keywordName");
        $cookieStore.remove("ZhibokeywordId");
        $cookieStore.remove("BaidukeywordId");
        $cookieStore.remove("keywordsListRecord");
        $cookieStore.remove("getBaiduRecordId");
        $cookieStore.remove("selectStatus");
    }
})