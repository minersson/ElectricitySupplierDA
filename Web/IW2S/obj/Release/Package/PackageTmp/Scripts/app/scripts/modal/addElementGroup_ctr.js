var addElementGroup_ctr = function ($scope, $modalInstance, $rootScope, $http) {


    $scope.weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $scope.list1 = $scope.SelectedKeyword;
    $scope.list2 = [];
    $scope.list3 = [];
    $scope.list4 = [];
    $scope.change_f_group = true;
    $scope.list5 = $scope.GetBaiduSearchKeyword;
    console.log($scope.list5);
    $scope.newGroup_id = $scope.ParentId;
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


    //______
    $scope.newGroup = function () {

        if ($scope.groupName == "" || $scope.groupName == null) {
            alert("请输入组别名！");
            return false;
        }
        if ($scope.groupName == $scope.ParentName) {
            alert("子组名不能与父组名相同！");
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
            alert("请选择侵权类型！");
            return false;
        }
        var groupType = 2;
        var keywordIds = "";
        $.each($scope.list1, function (i, e) {
            keywordIds += e._id + ",";
        });
        keywordIds = keywordIds.substring(0, keywordIds.length - 1);
        if ($scope.operate == 1) {
            $scope.list_submitAll = [{
                usr_id: $rootScope.userID,
                groupName: $scope.groupName,
                lawCode: $scope.InfriType,
                weight: $scope.weight,
                groupType: groupType,
                keywordIds: keywordIds,
                projectId: $rootScope.getProjectId,
            }]

            if ($rootScope.getBaiduRecordId != null) {
                var cc = new Object();
                cc = $scope.list_submitAll[0];
                cc['keywordId'] = $rootScope.getBaiduRecordId;
                $scope.list_submitAll[0] = cc;
            } else {
                var cc = new Object();
                cc = $scope.list_submitAll[0];
                cc['keywordId'] = '';
                $scope.list_submitAll[0] = cc;
            }
            if ($scope.parentgroupId != null) {
                var cc = new Object();
                cc = $scope.list_submitAll[0];
                cc['parentGroupId'] = $scope.parentgroupId;
                $scope.list_submitAll[0] = cc;
            } else {
                var cc = new Object();
                cc = $scope.list_submitAll[0];
                cc['parentGroupId'] = '';
                $scope.list_submitAll[0] = cc;
            }
            var modale = $rootScope.isActiveModale;
            var urls = "";
            switch (modale) {
                case "baidu":
                    urls = "/api/Keyword/InsertKeywordGroup";
                    break;
                case "sougou":
                    urls = "/api/WXSource/InsertKeywordGroup";
                    break;
                case "bing":
                    urls = "/api/Bing/InsertKeywordGroup";
                    break;
                case "weibo":
                    urls = "/api/Weibo/InsertKeywordGroup";
                    break;
                case "sougo_new":
                    urls = "/api/Sogou/InsertKeywordGroup";
                    break;
                case "googol":
                    urls = "/api/Google/InsertKeywordGroup";
                    break;
                default:
                    break;
            }
            //var urls = "api/Keyword/InsertKeywordGroup";
            var q = $http.post(
                urls,
                JSON.stringify($scope.list_submitAll[0]),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            q.success(function (response, status) {
                console.log('addElementGroup_ctr>newGroup');
                console.log($scope.InfriType);
                $modalInstance.close($scope.selected);
                $rootScope.GetBaiduSearchKeyword2($rootScope.getBaiduRecordId, $rootScope.getBaiduRecordName);
            })
            q.error(function (response) {
                $scope.error = "服务器连接出错";
            });
        }
        //if ($scope.operate == 2) {
        //  var url = "/api/Keyword/UpdateKeywordGroup?groupid=" + $scope.parentgroupId + "&groupName=" + encodeURIComponent($scope.groupName) + "&lawCode=" + $scope.InfriType + "&weight=" + $scope.weight + "&groupType=" + groupType + "&keywordIds=" + keywordIds;
        //
        //  var q = $http.get(url);
        //  q.success(function (response, status) {
        //    $modalInstance.close($scope.selected);
        //    $rootScope.GetBaiduSearchKeyword2($rootScope.getBaiduRecordId, $rootScope.getBaiduRecordName);
        //  })
        //  q.error(function (response) {
        //    $scope.error = "服务器连接出错";
        //  });
        //}
    }

    //$scope.amendKeywordGroupName = function () {
    //  var groupType = 2;
    //  var keywordIds = "";
    //  $.each($scope.list1, function (i, e) {
    //    keywordIds += e._id + ",";
    //  });
    //  keywordIds = keywordIds.substring(0, keywordIds.length - 1);
    //  console.log($scope.groupName)
    //  var url = "/api/Keyword/UpdateKeywordGroup?groupid=" + $scope.parentgroupId + "&groupName=" + encodeURIComponent($scope.groupName) + "&lawCode=" + $scope.InfriType + "&weight=" + $scope.weight + "&groupType=" + groupType + "&keywordIds=" + keywordIds;
    //
    //  var q = $http.get(url);
    //  q.success(function (response, status) {
    //    $modalInstance.close($scope.selected);
    //    $rootScope.GetBaiduSearchKeyword2($rootScope.getBaiduRecordId, $rootScope.getBaiduRecordName);
    //  })
    //  q.error(function (response) {
    //    $scope.error = "服务器连接出错";
    //  });
    //}
    //判断标题
    $scope.JudgmentTitle = function () {
        if ($scope.operate == 1) {
            $scope.operate_W = "新增分组";
            $scope.Judgment = false;
        } else {
            $scope.operate_W = "修改分组";
            $scope.Judgment = true;
        }
    }
    $scope.JudgmentTitle();
    //获取父词组名
    $scope.ParentName_show = function () {
        if ($scope.ParentName == null || $scope.ParentName == "") {
            $scope.ParentName_s = "所有词";
        } else {
            $scope.ParentName_s = $scope.ParentName;
        }
    }
    $scope.ParentName_show();

    //改变父组名
    $scope.changGroup = function () {
        $scope.change_f_group = false;
    }

    $scope.select_gName = function (id, name) {
        $scope.change_f_name = name;
        $scope.parentgroupId_new = id;
        $scope.ParentName_s = name;
        $scope.UpdateKeywordGroup($scope.parentgroupId_new)
    }

    $scope.UpdateKeywordGroup = function (id) {
        var keywordIds = "";
        $.each($scope.list1, function (i, e) {
            keywordIds += e._id + ",";
        });
        keywordIds = keywordIds.substring(0, keywordIds.length - 1);

        $scope.paramsList = {
            groupid: $scope.parentgroupId,
            groupName: $scope.groupName,
            lawCode: $scope.InfriType,
            weight: $scope.weight,
            keywordIds: keywordIds,
            parentGroupId: id,
            user_id: $rootScope.userID
        };
        var modale = $rootScope.isActiveModale;
        var urls = "";
        switch (modale) {
            case "baidu":
                urls = "/api/Keyword/UpdateKeywordGroup";
                break;
            case "sougou":
                urls = "/api/WXSource/UpdateKeywordGroup";
                break;
            case "bing":
                urls = "/api/Bing/UpdateKeywordGroup";
                break;
            case "weibo":
                urls = "/api/Weibo/UpdateKeywordGroup";
                break;
            case "sougo_new":
                urls = "/api/Sogou/UpdateKeywordGroup";
                break;
            case "googol":
                urls = "/api/Google/UpdateKeywordGroup";
                break;
            default:
                break;
        }
        $http.post(
            urls,
            JSON.stringify($scope.paramsList),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

        .success(function (response, status) {
            $scope.change_f_group = true;
            $rootScope.addAlert('success', "父组修改成功！");
            console.log(response);
            $scope.GetKeywordGroup(id);
        })
        .error(function (response, status) {
            $rootScope.addAlert('danger', "服务器连接失败！");
        });
    }
    //获取分组词
    $scope.GetKeywordGroup = function (id) {
        $scope.newGroup_id = id;
        $scope.paramsList = {
            usr_id: $rootScope.userID,
            projectId: $rootScope.getProjectId,
            groupid: id,
        };
        $http({
            method: 'get',
            params: $scope.paramsList,
            url: "/api/Keyword/GetKeywordGroup"
        })
          .success(function (response, status) {
              console.log(response);
              $scope.list5 = response;
          })
          .error(function (response, status) {
              $rootScope.addAlert('danger', "服务器连接失败！");
          });
    }
    //拖拽保存
    $scope.changGroupSave = function () {
        var keywordIds = "";
        $.each($scope.list1, function (i, e) {
            keywordIds += e._id + ",";
        });
        if ($scope.groupName == $scope.ParentName_s) {
            $rootScope.addAlert('danger', "不能和父组重名！");
            return
        }
        keywordIds = keywordIds.substring(0, keywordIds.length - 1);
        $scope.paramsList = {
            groupid: $scope.parentgroupId,
            groupName: $scope.groupName,
            lawCode: $scope.InfriType,
            weight: $scope.weight,
            keywordIds: keywordIds,
            parentGroupId: $scope.newGroup_id,
            user_id: $rootScope.userID
        };
        var modale = $rootScope.isActiveModale;
        var urls = "";
        switch (modale) {
            case "baidu":
                urls = "/api/Keyword/UpdateKeywordGroup";
                break;
            case "sougou":
                urls = "/api/WXSource/UpdateKeywordGroup";
                break;
            case "bing":
                urls = "/api/Bing/UpdateKeywordGroup";
                break;
            case "weibo":
                urls = "/api/Weibo/UpdateKeywordGroup";
                break;
            case "sougo_new":
                urls = "/api/Sogou/UpdateKeywordGroup";
                break;
            case "googol":
                urls = "/api/Google/UpdateKeywordGroup";
                break;
            default:
                break;
        }
        $http.post(
            urls,
            JSON.stringify($scope.paramsList),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

          .success(function (response, status) {
              $scope.change_f_group = true;
              console.log(response);
              $scope.ok();
          })
          .error(function (response, status) {
              $rootScope.addAlert('danger', "服务器连接失败！");
          });
    }
    //选择所有
    $scope.selectAll = function () {
        $scope.list1 = $scope.list5;
        $scope.list5 = [];
    }

}