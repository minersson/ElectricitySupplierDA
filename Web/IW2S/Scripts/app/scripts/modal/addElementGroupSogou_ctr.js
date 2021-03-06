var addElementGroupSogou_ctr = function ($scope, $modalInstance, $rootScope, $http) {


    $scope.weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $scope.list1 = $scope.SelectedKeyword;
    $scope.list2 = [];
    $scope.list3 = [];
    $scope.list4 = [];

    $scope.list5 = $scope.GetBaiduSearchKeyword;
    $scope.ok = function () {
        $modalInstance.close($scope.selected);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    /// <param name="usr_id"></param>
    /// <param name="groupName"></param>
    /// <param name="lawCode"></param>
    /// <param name="weight"></param>
    /// <param name="groupType">

    $scope.newGroup = function () {

        if ($scope.groupName == "" || $scope.groupName == null) {
            alert("请输入组别名！");
            return false;
        }
        if ($scope.list1.length == 0) {
            alert("请拖拽关键词至右边区域");
            return false;
        }
        if ($scope.weight == "") {
            alert("请选择权重！");
            return false;
        }
        if ($scope.InfriType == "") {
            alert("请选择链接标签！");
            return false;
        }
        var groupType = 2;
        var keywordIds = "";
        $.each($scope.list1, function (i, e) {
            keywordIds += e._id + ",";
        });
        keywordIds = keywordIds.substring(0, keywordIds.length - 1);
        if ($scope.operate == 1) {
            var url = "/api/WXSource/InsertKeywordGroup?usr_id=" + $rootScope.userID + "&groupName=" + encodeURIComponent($scope.groupName) + "&lawCode=" + $scope.InfriType + "&weight=" + $scope.weight + "&groupType=" + groupType + "&keywordIds=" + keywordIds + "&projectId=" + $rootScope.getProjectId;
            var keywordId = $rootScope.getBaiduRecordId;
            if (keywordId != null) {
                url += "&keywordId=" + keywordId;
            } else {
                url += "&keywordId=";
            }
            if ($scope.parentgroupId != null) {
                url += "&parentGroupId=" + $scope.parentgroupId;
            } else {
                url += "&parentGroupId=";
            }
            var q = $http.get(url);
            q.success(function (response, status) {
                console.log('addElementGroup_ctr>newGroup');
                console.log($scope.InfriType);
                $modalInstance.close($scope.selected);
                $rootScope.GetBaiduSearchKeyword2($rootScope.getBaiduRecordId, $rootScope.getBaiduRecordName);
            })
            q.error(function (response) {
                $scope.error = "网络打盹了，请稍后。。。";
            });
        }
        else if ($scope.operate == 2) {

            var url = "/api/WXSource/UpdateKeywordGroup?groupid=" + $scope.parentgroupId + "&groupName=" + encodeURIComponent($scope.groupName) + "&lawCode=" + $scope.InfriType + "&weight=" + $scope.weight + "&groupType=" + groupType + "&keywordIds=" + keywordIds + "&user_id=" + $rootScope.userID

            var q = $http.get(url);
            q.success(function (response, status) {
                console.log('addElementGroup_ctr>newGroup');
                $modalInstance.close($scope.selected);
                $rootScope.GetBaiduSearchKeyword2($rootScope.getBaiduRecordId, $rootScope.getBaiduRecordName);
            })
            q.error(function (response) {
                $scope.error = "网络打盹了，请稍后。。。";
            });
        }
    }

}