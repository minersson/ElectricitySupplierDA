﻿var baidu_share_2_ctr = myApp.controller("baidu_share_2_ctr", function ($scope, $rootScope, $http, $location, $window, $cookieStore, $modal, myApplocalStorage) {


  $scope.CurSelectedKeyword = [];
  $scope.keywordCisActive1 = true;
  $scope.keywordCisActive2 = false;
  $scope.keywordCisActive3 = false;
  $scope.keywordCisActive4 = false;
  $scope.keywordCisActive5 = false;
  $scope.Analysis_list = [];
  $scope.isActive_AnalysisZ1 = true;
  $scope.isActive_AnalysisZ2 = false;
  $scope.isActive_AnalysisZ3 = false;
  $scope.Analysis_name = '';
  $scope.Analysis_list = [];
  $scope.Analysis_id = "";
  $scope.isactriveChgSelIt = true;
  $scope.isActiveAnalysis_selected = true;
  $scope.isgroup = true;
  $scope.shareProjectId = '';
  chk_global_vars($cookieStore, $rootScope, null, $location, $http, myApplocalStorage);
  //_______________________________________________________________

  $scope.changePetID = function () {
      var name, value;
      var str = location.href; //取得整个地址栏
      var num = str.indexOf("?")
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

      //var arr = str.split("&"); //各个参数放到数组里
      //for (var i = 0; i < arr.length; i++) {
      //    num = arr[i].indexOf("=");
      //    if (num > 0) {
      //        name = arr[i].substring(0, num);
      //        value = arr[i].substr(num + 1);
      //        this[name] = value;
      //    }
      //}
      $scope.shareProjectId = str;
  }
  $scope.changePetID();

  //14.下拉框

  $scope.changePrjAsIt_list1 = function () {
    console.log($rootScope.PrjAnalysisItemName_list);
    $scope.InfriTypes1 = new Array();
    for (var i = 0; i < $rootScope.PrjAnalysisItemName_list.length; i++) {
      $scope.InfriTypes1[$rootScope.PrjAnalysisItemName_list[i]._id] = $rootScope.PrjAnalysisItemName_list[i].Name;
    }
  };
  $scope.changePrjAsIt_list1();


  $scope.kindGroup = function (groupId, InfriLawCode, InfriLawCodeStr, Weight, ParentName) {

    $scope.CurSelectedKeyword = [];
    $scope.InfriLawCode = InfriLawCode;
    $scope.Weight1 = Weight;
    $scope.InfriLawCodeStr1 = InfriLawCodeStr;
    var url = "/api/Keyword/GetKeywordGroup?usr_id=" + $rootScope.userID + "&groupType=" + $scope.groupType + "&projectId=" + $scope.shareProjectId;
    if ($scope.keywordId != null) {
      url += "&keywordId=" + $scope.keywordId;
    }
    else {
      url += "&keywordId=";
    }
    if (groupId != null) {
      url += "&groupid=" + groupId;
    }
    else {
      url += "&groupid=";
    }

    var q = $http.get(url);
    q.success(function (response, status) {
      console.log('keywordMng_ctr>kindGroup');
      $scope.SelectedKeyword = response;
      if ($scope.InfriLawCode == null || $scope.InfriLawCode == "") {
        $scope.InfriTypeschange = true;
      } else {
        $scope.InfriTypeschange = false;
      }

      $scope.modelCallBack(groupId, 1, null, $scope.InfriLawCode, 0, ParentName);
    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  };

  $scope.EditKindGroup = function (groupId, parentid, Name, InfriLawCode, Weight, ParentName) {
    $scope.CurSelectedKeyword = [];

    var url = "/api/Keyword/GetEditKeywordGroup?usr_id=" + $rootScope.userID + "&groupType=" + $scope.groupType + "&projectId=" + $scope.shareProjectId;
    if ($scope.keywordId != null) {
      url += "&keywordId=" + $scope.keywordId;
    }
    else {
      url += "&keywordId=";
    }
    if (groupId != null) {
      url += "&groupid=" + groupId;
    }
    else {
      url += "&groupid=";
    }
    if (parentid != null) {
      url += "&parentid=" + parentid;
    }
    else {
      url += "&parentid=";
    }

    var q = $http.get(url);
    q.success(function (response, status) {
      console.log('keywordMng_ctr>EditKindGroup');
      if (response != null) {
        $scope.SelectedKeyword = response.UnSelected
        $scope.CurSelectedKeyword = response.Selected;
        $scope.modelCallBack(groupId, 2, Name, InfriLawCode, Weight, ParentName);
      }
    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });

  };

  //重搜
  $scope.searchCategoryAgain = function (id) {
    $scope.isgroup = true;
    var url = "/api/Keyword/SetCommendKeywordsStatus?categoryId=" + id + "&prjId=" + $scope.shareProjectId + "&isgroup=" + $scope.isgroup + "&status=" + 0 + "&user_id=" + $rootScope.userID;
    var q = $http.get(url);
    q.success(function (response, status) {
      if (response.IsSuccess) {
        $scope.addAlert('success', "所选分组正在重新搜索...");
        $rootScope.GetBaiduSearchKeyword2();
        $scope.GetAllKeywordCategory();
        $scope.GetBaiduKeyword();
      }
    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  }
  //搜所有关键词
  $scope.searchAllKeywordAgain = function (id) {
    $scope.isgroup = false;
    var url = "/api/Keyword/SetCommendKeywordsStatus?categoryId=" + id + "&prjId=" + $scope.shareProjectId + "&isgroup=" + $scope.isgroup + "&status=" + 0 + "&user_id=" + $rootScope.userID;
    var q = $http.get(url);
    q.success(function (response, status) {
      if (response.IsSuccess) {
        $scope.addAlert('success', "所有关键词正在重新搜索...");
        $rootScope.GetBaiduSearchKeyword2();
        $scope.GetAllKeywordCategory();
        $scope.GetBaiduKeyword();
      }
    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  }

  //
  $scope.modal_demo = function () {
    var kw_scope = $rootScope.$new();
    var frm = $modal.open({
      templateUrl: 'Scripts/app/views/modal/addElementGroup.html',
      controller: addElementGroup_ctr,
      scope: kw_scope,
      // label: label,
      keyboard: false,
      backdrop: 'static',
      size: 'lg'
    });
    frm.result.then(function (response, status) {
    });
  };
  //
  $scope.inputKeyword_OT = function (id) {
    var CP_scope = $rootScope.$new();
    CP_scope.projectId = id;
    var frm = $modal.open({
      templateUrl: 'Scripts/app/views/modal/inputKeywords.html',
      controller: inputKeywords_ctr,
      scope: CP_scope,
      // label: label,
      keyboard: false,
      backdrop: 'static',
      size: 'cd'
    });
    frm.result.then(function (response, status) {
      $rootScope.GetBaiduSearchKeyword2();
    });
  };

  //获取直搜第一行
  //$scope.GetBaiduSearchKeywordLenght = 0;
  $rootScope.GetBaiduSearchKeyword = [];
  $scope.groupType = 1;
  $scope.keywordId = null;
  $rootScope.GetBaiduSearchKeyword2 = function () {
    var url = "/api/Keyword/GetKeywordCategory?user_id=" + $rootScope.userID + "&groupType=" + $scope.groupType + "&projectId=" + $scope.shareProjectId;
    if ($scope.keywordId != null) {
      url += "&keywordId=" + $scope.keywordId;
    }
    else {
      url += "&keywordId=";
    }
    var q = $http.get(url);
    q.success(function (response, status) {
      console.log('keywordMng_ctr>GetBaiduSearchkeyword2');
      $rootScope.GetBaiduKeywordCategory2 = response;
      console.log(response);
    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  };

  //关键词词组点击事件
  $scope.keywordMngClick = function (id) {
    $rootScope.keywordMngClicked = id;
    $cookieStore.put("keywordMngClicked", $rootScope.keywordMngClicked);


  }
  $scope.updateCategoryName = function (groupId) {
    var name = $("#" + groupId).text();
    var url = "/api/Keyword/UpdateKeywordGroupName?groupid=" + groupId + "&groupName=" + encodeURIComponent(name) + "&user_id=" + $rootScope.userID;

    var q = $http.get(url);
    q.success(function (response, status) {
      console.log('keywordMng_ctr>updateCategoryName');

    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  }

  $scope.DelCategory = function (categoryId) {
    if (confirm("确定要删除这个组吗？")) {
      var url = "/api/Keyword/DelKeywordCategory?categoryId=" + categoryId + "&user_id=" + $rootScope.userID;

      var q = $http.get(url);
      q.success(function (response, status) {
        console.log('keywordMng_ctr>DelCategory');
        $scope.RefreshList();
      });
      q.error(function (response) {
        $scope.error = "网络打盹了，请稍后。。。";
      });
    }
  };
  //operate:1,新增；2，修改
  $scope.modelCallBack = function (groupId, operate, Name, InfriLawCode, Weight, ParentName) {
    var kw_scope = $rootScope.$new();
    kw_scope.GetBaiduSearchKeyword = $scope.SelectedKeyword;
    kw_scope.SelectedKeyword = $scope.CurSelectedKeyword;
    kw_scope.ParentName = ParentName;
    kw_scope.parentgroupId = groupId;
    kw_scope.operate = operate;
    kw_scope.InfriTypes = $scope.InfriTypes;
    kw_scope.groupName = Name;
    kw_scope.InfriType = InfriLawCode;
    kw_scope.weight = Weight;
    kw_scope.InfriTypeschange = $scope.InfriTypeschange;
    kw_scope.Weight1 = $scope.Weight1
    kw_scope.InfriLawCodeStr1 = $scope.InfriLawCodeStr1
    var frm = $modal.open({
      templateUrl: 'Scripts/app/views/modal/addElementGroup.html',
      controller: addElementGroup_ctr,
      scope: kw_scope,
      // label: label,
      keyboard: false,
      backdrop: 'static',
      size: 'lg'
    });
    frm.result.then(function (data) {
      $rootScope.GetBaiduSearchKeyword2();
    });
  };

  $scope.RefreshList = function () {
    var url = "/api/Keyword/GetKeywordCategory?user_id=" + $rootScope.userID + "&groupType=" + $scope.groupType + "&projectId=" + $scope.shareProjectId;
    if ($scope.keywordId != null) {
      url += "&keywordId=" + $scope.keywordId;
    }
    else {
      url += "&keywordId=";
    }
    var q = $http.get(url);
    q.success(function (response, status) {
      console.log('keywordMng_ctr>RefreshList');
      $rootScope.GetBaiduKeywordCategory2 = response;

    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  };

  //矩阵图
  $scope.juzhentu = function () {
    var url = "/api/Keyword/GetRectangularTreeUrl?usr_id=" + $rootScope.userID + "&projectId=" + $scope.shareProjectId;
    var q = $http.get(url);
    q.success(function (response, status) {
      $scope.ecahrtsJZ(response.Url);
    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  }
  $scope.ecahrtsJZ = function (jsonUrl) {
    var myChart = echarts.init(document.getElementById('charts111'));
    //var jsonUrl = "Scripts/app/data/echarts.txt";
    myChart.showLoading();
    $.getJSON(jsonUrl, function (rawData) {

      myChart.hideLoading();

      function convert(source, target, basePath) {
        for (var key in source) {
          var path = basePath ? (basePath + '>' + key) : key;
          if (key.match(/^\$/)) {

          }
          else {
            target.children = target.children || [];
            var child = {
              name: path
            };
            target.children.push(child);
            convert(source[key], child, path);
          }
        }

        if (!target.children) {
          target.value = source.$count || 1;
        }
        else {
          target.children.push({
            name: basePath,
            value: source.$count
          });
        }
      }

      var data = [];

      convert(rawData, data, '');

      myChart.setOption(option = {
        title: {
          text: '矩阵图demo',
          subtext: '2016/08',
          left: 'leafDepth'
        },
        tooltip: {},
        series: [{
          name: '面包屑',
          type: 'treemap',
          visibleMin: 100,
          data: data.children,
          leafDepth: 2,
          levels: [
            {
              itemStyle: {
                normal: {
                  borderColor: '#555',
                  borderWidth: 2,
                  gapWidth: 2
                }
              }
            },
            {
              colorSaturation: [0.3, 0.6],
              itemStyle: {
                normal: {
                  borderColorSaturation: 0.7,
                  gapWidth: 1,
                  borderWidth: 1
                }
              }
            },
            {
              colorSaturation: [0.3, 0.5],
              itemStyle: {
                normal: {
                  borderColorSaturation: 0.6,
                  gapWidth: 1
                }
              }
            },
            {
              colorSaturation: [0.3, 0.5]
            }
          ]
        }]
      })
    });
  }

  //圆形d3图
  $scope.GetD3TreeData = function () {
    var url = "/api/Keyword/GetAllGroupTreeUrl?usr_id=" + $rootScope.userID + "&projectId=" + $scope.shareProjectId;
    var q = $http.get(url);
    q.success(function (response, status) {
      //console.log(response);
      //$scope.getJson(JSON.stringify(response));
      $scope.getJson(response.Url);
    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  }

  $scope.getJson = function (jsonUrl) {
    //Radial Reingold–Tilford Tree_______________________
    var diameter = 700;
    var tree = d3.layout.tree()
      .size([360, diameter / 2 - 120])
      .separation(function (a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      });

    var diagonal = d3.svg.diagonal.radial()
      .projection(function (d) {
        return [d.y, d.x / 180 * Math.PI];
      });

    var svg2 = d3.select("#Tilford-Tree").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .append("g")
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
    d3.select(self.frameElement).style("height", diameter - 50 + "px");


    d3.json(jsonUrl, function (error, root) {
      if (error) throw error;

      var nodes = tree.nodes(root),
        links = tree.links(nodes);

      var link = svg2.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

      var node = svg2.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        })

      node.append("circle")
        .attr("r", 4.5);

      node.append("text")
        .attr("dy", ".31em")
        .attr("text-anchor", function (d) {
          return d.x < 180 ? "start" : "end";
        })
        .attr("transform", function (d) {
          return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
        })
        .text(function (d) {
          return d.name;
        });
    });
  }

  //关键词对比图

  $scope.GetData = function () {
    var url = "/api/Keyword/GetKeywordBygroup?user_id=" + $rootScope.userID + "&projectId=" + $scope.shareProjectId;
    var q = $http.get(url);
    q.success(function (response, status) {
      console.log('iw2s_dashboard_ctr>GetData');
      if (response.Error) {
        alert(response.Error);
      } else {
        $scope.getjson(response.Url);
      }
    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  }

  $scope.getjson = function (url) {

    var margin = {top: 150, right: 0, bottom: 10, left: 150},
      width = 750,
      height = 750;

    var x = d3.scale.ordinal().rangeBands([0, width]),
      z = d3.scale.linear().domain([0, 4]).clamp(true),
      c = d3.scale.category10().domain(d3.range(10));

    var svg1 = d3.select("#bd").append("svg")
      .attr("width", width)
      .attr("height", height)
      //.style("margin-left", margin.left + "px")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(url, function (miserables) {
      var matrix = [],
        nodes = miserables.nodes,
        n = nodes.length;

      //Compute index per node.
      nodes.forEach(function (node, i) {
        node.index = i;
        node.count = 0;
        matrix[i] = d3.range(n).map(function (j) {
          return {x: j, y: i, z: 0};
        });
      });

      //Convert links to matrix; count character occurrences.
      miserables.links.forEach(function (link) {
        matrix[link.source][link.target].z += link.value;
        matrix[link.target][link.source].z += link.value;
        matrix[link.source][link.source].z += link.value;
        matrix[link.target][link.target].z += link.value;
        nodes[link.source].count += link.value;
        nodes[link.target].count += link.value;
      });

      //Precompute the orders.
      var orders = {
        name: d3.range(n).sort(function (a, b) {
          return d3.ascending(nodes[a].name, nodes[b].name);
        }),
        count: d3.range(n).sort(function (a, b) {
          return nodes[b].count - nodes[a].count;
        }),
        group: d3.range(n).sort(function (a, b) {
          return nodes[b].group - nodes[a].group;
        })
      };

      //The default sort order.
      x.domain(orders.name);

      svg1.append("rect")
        .attr("class", "background")
        .attr("width", width * .7)
        .attr("height", height * .7);

      var row = svg1.selectAll(".row")
        .data(matrix)
        .enter().append("g")
        .attr("class", "row")
        .attr("transform", function (d, i) {
          return "translate(0," + x(i) * .7 + ")";
        })
        .each(row);

      row.append("line")
        .attr("x2", width * .7);

      row.append("text")
        .attr("x", -6)
        .attr("y", x.rangeBand() / 2 * .7)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        //设置字体大小为9像素
        .attr("style", "font-size:9px")
        .text(function (d, i) {
          return nodes[i].name;
        });

      var column = svg1.selectAll(".column")
        .data(matrix)
        .enter().append("g")
        .attr("class", "column")
        .attr("transform", function (d, i) {
          return "translate(" + x(i) * .7 + ")rotate(-90)";
        });

      column.append("line")
        .attr("x1", -width * .7);

      column.append("text")
        .attr("x", 6)
        .attr("y", x.rangeBand() / 2 * .7)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        //设置字体大小为9像素
        .attr("style", "font-size:9px")
        .text(function (d, i) {
          return nodes[i].name;
        });

      function row(row) {
        var cell = d3.select(this).selectAll(".cell")
          .data(row.filter(function (d) {
            return d.z;
          }))
          .enter().append("rect")
          .attr("class", "cell")
          .attr("x", function (d) {
            return x(d.x) * .7;
          })
          .attr("width", x.rangeBand() * .7)
          .attr("height", x.rangeBand() * .7)
          .style("fill-opacity", function (d) {
            return z(d.z);
          })
          .style("fill", function (d) {
            return nodes[d.x].group == nodes[d.y].group ? c(nodes[d.x].group) : null;
          })
          .on("mouseover", mouseover)
          .on("mouseout", mouseout);
      }

      function mouseover(p) {
        d3.selectAll(".row text").classed("active", function (d, i) {
          return i == p.y;
        });
        d3.selectAll(".column text").classed("active", function (d, i) {
          return i == p.x;
        });
      }

      function mouseout() {
        d3.selectAll("text").classed("active", false);
      }

      d3.select("#order").on("change", function () {
        clearTimeout(timeout);
        order(this.value);
      });

      function order(value) {
        x.domain(orders[value]);

        var t = svg1.transition().duration(2500);

        t.selectAll(".row")
          .delay(function (d, i) {
            return x(i) * 4;
          })
          .attr("transform", function (d, i) {
            return "translate(0," + x(i) * .7 + ")";
          })
          .selectAll(".cell")
          .delay(function (d) {
            return x(d.x) * 4;
          })
          .attr("x", function (d) {
            return x(d.x) * .7;
          });

        t.selectAll(".column")
          .delay(function (d, i) {
            return x(i) * 4;
          })
          .attr("transform", function (d, i) {
            return "translate(" + x(i) * .7 + ")rotate(-90)";
          });
      }

      var timeout = setTimeout(function () {
        order("group");
        d3.select("#order").property("selectedIndex", 2).node().focus();
      }, 2000);
    });
  }

  //树状图
  $scope.d3tree = function (treeData) {

    // Calculate total nodes, max label length
    var totalNodes = 0;
    var maxLabelLength = 0;
    // variables for drag/drop
    var selectedNode = null;
    var draggingNode = null;
    // panning variables
    var panSpeed = 200;
    var panBoundary = 20; // Within 20px from edges will pan when dragging.
    // Misc. variables
    var i = 0;
    var duration = 750;
    var root;

    // size of the diagram
    var viewerWidth = ($('#treeBlock').width()) - 5;
    var viewerHeight = ($('#treeBlock').height()) - 5;
    //console.log(viewerWidth);
    //console.log(viewerWidth);

    var tree = d3.layout.tree()
      .size([viewerHeight, viewerWidth]);

    // define a d3 diagonal projection for use by the node paths later on.
    var diagonal = d3.svg.diagonal()
      .projection(function (d) {
        return [d.y, d.x];
      });

    // A recursive helper function for performing some setup by walking through all nodes

    function visit(parent, visitFn, childrenFn) {
      if (!parent) return;

      visitFn(parent);

      var children = childrenFn(parent);
      if (children) {
        var count = children.length;
        for (var i = 0; i < count; i++) {
          visit(children[i], visitFn, childrenFn);
        }
      }
    }

    // Call visit function to establish maxLabelLength
    visit(treeData, function (d) {
      totalNodes++;
      maxLabelLength = Math.max(d.name.length, maxLabelLength);

    }, function (d) {
      return d.children && d.children.length > 0 ? d.children : null;
    });


    // sort the tree according to the node names

    function sortTree() {
      tree.sort(function (a, b) {
        return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
      });
    }

    // Sort the tree initially incase the JSON isn't in a sorted order.
    sortTree();

    // TODO: Pan function, can be better implemented.

    function pan(domNode, direction) {
      var speed = panSpeed;
      if (panTimer) {
        clearTimeout(panTimer);
        translateCoords = d3.transform(svgGroup.attr("transform"));
        if (direction == 'left' || direction == 'right') {
          translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
          translateY = translateCoords.translate[1];
        } else if (direction == 'up' || direction == 'down') {
          translateX = translateCoords.translate[0];
          translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
        }
        scaleX = translateCoords.scale[0];
        scaleY = translateCoords.scale[1];
        scale = zoomListener.scale();
        svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
        d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
        zoomListener.scale(zoomListener.scale());
        zoomListener.translate([translateX, translateY]);
        panTimer = setTimeout(function () {
          pan(domNode, speed, direction);
        }, 50);
      }
    }

    // Define the zoom function for the zoomable tree

    function zoom() {
      svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }


    // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
    var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

    function initiateDrag(d, domNode) {
      draggingNode = d;
      d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
      d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
      d3.select(domNode).attr('class', 'node activeDrag');

      svgGroup.selectAll("g.node").sort(function (a, b) { // select the parent and sort the path's
        if (a.id != draggingNode.id) return 1; // a is not the hovered element, send "a" to the back
        else return -1; // a is the hovered element, bring "a" to the front
      });
      // if nodes has children, remove the links and nodes
      if (nodes.length > 1) {
        // remove link paths
        links = tree.links(nodes);
        nodePaths = svgGroup.selectAll("path.link")
          .data(links, function (d) {
            return d.target.id;
          }).remove();
        // remove child nodes
        nodesExit = svgGroup.selectAll("g.node")
          .data(nodes, function (d) {
            return d.id;
          }).filter(function (d, i) {
            if (d.id == draggingNode.id) {
              return false;
            }
            return true;
          }).remove();
      }

      // remove parent link
      parentLink = tree.links(tree.nodes(draggingNode.parent));
      svgGroup.selectAll('path.link').filter(function (d, i) {
        if (d.target.id == draggingNode.id) {
          return true;
        }
        return false;
      }).remove();

      dragStarted = null;
    }

    // define the baseSvg, attaching a class for styling and the zoomListener
    var baseSvg = d3.select("#tree-container").append("svg")
      .attr("width", viewerWidth)
      .attr("height", viewerHeight)
      .attr("class", "overlay")
      .call(zoomListener);


    // Define the drag listeners for drag/drop behaviour of nodes.
    dragListener = d3.behavior.drag()
      .on("dragstart", function (d) {
        if (d == root) {
          return;
        }
        dragStarted = true;
        nodes = tree.nodes(d);
        d3.event.sourceEvent.stopPropagation();
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
      })
      .on("drag", function (d) {
        if (d == root) {
          return;
        }
        if (dragStarted) {
          domNode = this;
          initiateDrag(d, domNode);
        }

        // get coords of mouseEvent relative to svg container to allow for panning
        relCoords = d3.mouse($('svg').get(0));
        if (relCoords[0] < panBoundary) {
          panTimer = true;
          pan(this, 'left');
        } else if (relCoords[0] > ($('svg').width() - panBoundary)) {

          panTimer = true;
          pan(this, 'right');
        } else if (relCoords[1] < panBoundary) {
          panTimer = true;
          pan(this, 'up');
        } else if (relCoords[1] > ($('svg').height() - panBoundary)) {
          panTimer = true;
          pan(this, 'down');
        } else {
          try {
            clearTimeout(panTimer);
          } catch (e) {

          }
        }

        d.x0 += d3.event.dy;
        d.y0 += d3.event.dx;
        var node = d3.select(this);
        node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
        updateTempConnector();
      }).on("dragend", function (d) {
        if (d == root) {
          return;
        }
        domNode = this;
        if (selectedNode) {
          // now remove the element from the parent, and insert it into the new elements children
          var index = draggingNode.parent.children.indexOf(draggingNode);
          if (index > -1) {
            draggingNode.parent.children.splice(index, 1);
          }
          if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
            if (typeof selectedNode.children !== 'undefined') {
              selectedNode.children.push(draggingNode);
            } else {
              selectedNode._children.push(draggingNode);
            }
          } else {
            selectedNode.children = [];
            selectedNode.children.push(draggingNode);
          }
          // Make sure that the node being added to is expanded so user can see added node is correctly moved
          expand(selectedNode);
          sortTree();
          endDrag();
        } else {
          endDrag();
        }
      });

    function endDrag() {
      selectedNode = null;
      d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
      d3.select(domNode).attr('class', 'node');
      // now restore the mouseover event or we won't be able to drag a 2nd time
      d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
      updateTempConnector();
      if (draggingNode !== null) {
        update(root);
        centerNode(draggingNode);
        draggingNode = null;
      }
    }

    // Helper functions for collapsing and expanding nodes.

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function expand(d) {
      if (d._children) {
        d.children = d._children;
        d.children.forEach(expand);
        d._children = null;
      }
    }

    var overCircle = function (d) {
      selectedNode = d;
      updateTempConnector();
    };
    var outCircle = function (d) {
      selectedNode = null;
      updateTempConnector();
    };

    // Function to update the temporary connector indicating dragging affiliation
    var updateTempConnector = function () {
      var data = [];
      if (draggingNode !== null && selectedNode !== null) {
        // have to flip the source coordinates since we did this for the existing connectors on the original tree
        data = [{
          source: {
            x: selectedNode.y0,
            y: selectedNode.x0
          },
          target: {
            x: draggingNode.y0,
            y: draggingNode.x0
          }
        }];
      }
      var link = svgGroup.selectAll(".templink").data(data);

      link.enter().append("path")
        .attr("class", "templink")
        .attr("d", d3.svg.diagonal())
        .attr('pointer-events', 'none');

      link.attr("d", d3.svg.diagonal());

      link.exit().remove();
    };

    // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

    function centerNode(source) {
      scale = zoomListener.scale();
      x = -source.y0;
      y = -source.x0;
      x = x * scale + viewerWidth / 4;
      y = y * scale + viewerHeight / 4;
      d3.select('#tree-container g').transition()
        .duration(duration)
        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
      zoomListener.scale(scale);
      zoomListener.translate([x, y]);
    }

    // Toggle children function

    function toggleChildren(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else if (d._children) {
        d.children = d._children;
        d._children = null;
      }
      return d;
    }

    // Toggle children on click.

    function click(d) {
      if (d3.event.defaultPrevented) return; // click suppressed
      d = toggleChildren(d);
      update(d);
      centerNode(d);
    }

    function update(source) {
      // Compute the new height, function counts total children of root node and sets tree height accordingly.
      // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
      // This makes the layout more consistent.
      var levelWidth = [1];
      var childCount = function (level, n) {

        if (n.children && n.children.length > 0) {
          if (levelWidth.length <= level + 1) levelWidth.push(0);

          levelWidth[level + 1] += n.children.length;
          n.children.forEach(function (d) {
            childCount(level + 1, d);
          });
        }
      };
      childCount(0, root);
      var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line
      tree = tree.size([newHeight, viewerWidth]);

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

      // Set widths between levels based on maxLabelLength.
      nodes.forEach(function (d) {
        d.y = (d.depth * (maxLabelLength * 10)); //maxLabelLength * 10px
        // alternatively to keep a fixed scale one can set a fixed depth per level
        // Normalize for fixed-depth by commenting out below line
        // d.y = (d.depth * 500); //500px per level.
      });

      // Update the nodes…
      node = svgGroup.selectAll("g.node")
        .data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
        .call(dragListener)
        .attr("class", "node")
        .attr("transform", function (d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

      nodeEnter.append("circle")
        .attr('class', 'nodeCircle')
        .attr("r", 0)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeEnter.append("text")
        .attr("x", function (d) {
          return d.children || d._children ? -10 : 10;
        })
        .attr("dy", ".35em")
        .attr('class', 'nodeText')
        .attr("text-anchor", function (d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d) {
          return d.name;
        })
        .style("fill-opacity", 0);

      // phantom node to give us mouseover in a radius around it
      nodeEnter.append("circle")
        .attr('class', 'ghostCircle')
        .attr("r", 30)
        .attr("opacity", 0.2) // change this to zero to hide the target area
        .style("fill", "#00b5ad")
        .attr('pointer-events', 'mouseover')
        .on("mouseover", function (node) {
          overCircle(node);
        })
        .on("mouseout", function (node) {
          outCircle(node);
        });

      // Update the text to reflect whether node has children or not.
      node.select('text')
        .attr("x", function (d) {
          return d.children || d._children ? -10 : 10;
        })
        .attr("text-anchor", function (d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d) {
          return d.name;
        });

      // Change the circle fill depending on whether it has children and is collapsed
      node.select("circle.nodeCircle")
        .attr("r", 4.5)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      // Fade the text in
      nodeUpdate.select("text")
        .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      nodeExit.select("circle")
        .attr("r", 0);

      nodeExit.select("text")
        .style("fill-opacity", 0);

      // Update the links…
      var link = svgGroup.selectAll("path.link")
        .data(links, function (d) {
          return d.target.id;
        });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function (d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        });

      // Transition links to their new position.
      link.transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Append a group which holds all nodes and which the zoom Listener can act upon.
    var svgGroup = baseSvg.append("g");

    // Define the root
    root = treeData;
    root.x0 = viewerHeight / 2;
    root.y0 = 0;

    // Collapse all children of roots children before rendering.
    root.children.forEach(function (child) {
      collapse(child);
    });

    // Layout the tree initially and center on the root node.
    update(root);
    centerNode(root);

  };

  $scope.GetTreeData = function () {
    var url = "/api/Keyword/GetAllGroupTree?usr_id=" + $rootScope.userID + "&projectId=" + $scope.shareProjectId;
    var q = $http.get(url);
    q.success(function (response, status) {
      console.log('keywordMng_ctr>GetTreeData');
      $scope.d3tree(response);
      console.log(response);

    });
    q.error(function (response) {
      $scope.error = "网络打盹了，请稍后。。。";
    });
  }

  //关键词管理切换
  $scope.keywordControlIsActive1 = function () {
    $scope.keywordCisActive1 = true;
    $scope.keywordCisActive2 = false;
    $scope.keywordCisActive3 = false;
    $scope.keywordCisActive4 = false;
    $scope.keywordCisActive5 = false;
    $scope.keywordCisActive6 = false;
  };
  $scope.keywordControlIsActive2 = function () {
    $('#Tilford-Tree svg').remove();
    $scope.keywordCisActive1 = false;
    $scope.keywordCisActive2 = true;
    $scope.keywordCisActive3 = false;
    $scope.keywordCisActive4 = false;
    $scope.keywordCisActive5 = false;
    $scope.keywordCisActive6 = false;
    $scope.GetD3TreeData();
  };
  $scope.keywordControlIsActive3 = function () {
    $('#tree-container svg').remove();
    $scope.keywordCisActive1 = false;
    $scope.keywordCisActive2 = false;
    $scope.keywordCisActive3 = true;
    $scope.keywordCisActive4 = false;
    $scope.keywordCisActive5 = false;
    $scope.keywordCisActive6 = false;
    $scope.GetTreeData();
  };
  $scope.keywordControlIsActive4 = function () {
    $('#bd svg').remove();
    $scope.keywordCisActive1 = false;
    $scope.keywordCisActive2 = false;
    $scope.keywordCisActive3 = false;
    $scope.keywordCisActive4 = true;
    $scope.keywordCisActive5 = false;
    $scope.keywordCisActive6 = false;
    $scope.GetData();
  };
  $scope.keywordControlIsActive5 = function () {
    $scope.keywordCisActive1 = false;
    $scope.keywordCisActive2 = false;
    $scope.keywordCisActive3 = false;
    $scope.keywordCisActive4 = false;
    $scope.keywordCisActive5 = true;
    $scope.keywordCisActive6 = false;
    $scope.juzhentu();
  };
  $scope.keywordControlIsActive6 = function () {
    $scope.keywordCisActive1 = false;
    $scope.keywordCisActive2 = false;
    $scope.keywordCisActive3 = false;
    $scope.keywordCisActive4 = false;
    $scope.keywordCisActive5 = false;
    $scope.keywordCisActive6 = true;
    $scope.GetAnalysisItem();
  };


  //导出关键词词组
  $scope.ExportKeywordGroup = function () {

    $scope.paramsList = {
      user_id: $rootScope.userID,
      projectId: $scope.shareProjectId,
    };
    $http({
      method: 'get',
      params: $scope.paramsList,
      url: "/api/Keyword/ExportKeywordGroup"
    })
      .success(function (response, status) {
        if (response != null) {
          if (response != "没有要导出的数据") {
            window.location.href = "Export/DownLoadExcel?path=" + response;
            $rootScope.addAlert('success', "关键词词组导出成功！");
          } else {
            $rootScope.addAlert('danger', "没有要导出关键词词组！");
          }
        }
      })
      .error(function (response, status, headers, config) {
        publicFunc.showAlert("温馨提示", "连接接服务器出错");
      });
  }
  //分析指项
  $scope.chang_AnalysisZ1 = function () {
    $scope.isActive_AnalysisZ1 = true;
    $scope.isActive_AnalysisZ2 = false;
    $scope.isActive_AnalysisZ3 = false;
    $scope.isactriveChgSelIt = true;
  }
  $scope.chang_AnalysisZ2 = function () {
    $scope.isActive_AnalysisZ1 = false;
    $scope.isActive_AnalysisZ2 = true;
    $scope.isActive_AnalysisZ3 = false;
    $scope.isactriveChgSelIt = true;
  }
  $scope.chang_AnalysisZ3 = function () {
    $scope.isActive_AnalysisZ1 = false;
    $scope.isActive_AnalysisZ2 = false;
    $scope.isActive_AnalysisZ3 = true;
  }
  //获取分析指项
  $scope.GetAnalysisItem = function () {
    $scope.paramsList = {
      prj_id: $scope.shareProjectId,
    };
    $http({
      method: 'get',
      params: $scope.paramsList,
      url: "/api/Keyword/GetAnalysisItem"
    })
      .success(function (response, status) {
        $scope.Analysis_list = response;
        console.log("  1 ")
        console.log(response);
      })
      .error(function (response, status) {
        alert("温馨提示:连接接服务器出错");
      });


  }

  //添加分析指项

  $scope.ItemValues = [];
  $scope.ItemValues.push({Name: "", SeqNo: ""});
  $scope.ItemValues.push({Name: "", SeqNo: ""});
  $scope.add = function () {
    $scope.ItemValues.push({Name: "", SeqNo: ""});
  }
  $scope.InsertAnalysisItem = function () {
    if ($scope.Analysis_name == "" || $scope.Analysis_name == null) {
      $scope.addAlert('danger', "请输入分析指项名称");
      return
    }
    if ($scope.ItemValues[$scope.ItemValues.length - 1].Name == '' || $scope.ItemValues[$scope.ItemValues.length - 1].Name == null || $scope.ItemValues[$scope.ItemValues.length - 1].SeqNo == '' || $scope.ItemValues[$scope.ItemValues.length - 1].SeqNo == null) {
      $scope.addAlert('danger', "请输入完整的“分类指项”类目序号内容");
      return
    }
    $scope.anaItem = {
      UsrId: $rootScope.userID,
      ProjectId: $scope.shareProjectId,
      Name: $scope.Analysis_name,
      ItemValues: $scope.ItemValues,
      _id: $scope.Analysis_id

    };
    var urls = "api/Keyword/InsertAnalysisItem";
    var q = $http.post(
      urls,
      JSON.stringify($scope.anaItem),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    q.success(function (response, status) {
      if (response.IsSuccess == true) {
        $scope.addAlert('success', response.Message);

        $scope.GetAnalysisItem();
        $scope.chang_AnalysisZ2();


      } else {
        $scope.addAlert('danger', response.Message);
      }
    });
    q.error(function (e) {
      $scope.addAlert('danger', "网络打盹了，请稍后。。。");
    });
  }
  $scope.InsertAnalysisItem2 = function () {
    if ($scope.Analysis_name == "" || $scope.Analysis_name == null) {
      $scope.addAlert('danger', "请输入分析指项名称");
      return
    }
    if ($scope.ItemValues[$scope.ItemValues.length - 1].Name == '' || $scope.ItemValues[$scope.ItemValues.length - 1].Name == null || $scope.ItemValues[$scope.ItemValues.length - 1].SeqNo == '' || $scope.ItemValues[$scope.ItemValues.length - 1].SeqNo == null) {
      $scope.addAlert('danger', "请输入完整的“分类指项”类目序号内容");
      return
    }
    $scope.anaItem = {
      UsrId: $rootScope.userID,
      ProjectId: $scope.shareProjectId,
      Name: $scope.Analysis_name,
      ItemValues: $scope.ItemValues,
      _id: $scope.Analysis_id
    };
    var urls = "api/Keyword/InsertAnalysisItem";
    var q = $http.post(
      urls,
      JSON.stringify($scope.anaItem),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    q.success(function (response, status) {
      if (response.IsSuccess == true) {
        $scope.addAlert('success', response.Message);
        $scope.GetPrjAnalysisItem2();
        $scope.chang_AnalysisZ1();


      } else {
        $scope.addAlert('danger', response.Message);
      }
    });
    q.error(function (e) {
      $scope.addAlert('danger', "网络打盹了，请稍后。。。");
    });
  }
  $scope.clearAnalysisItem = function () {
    $scope.Analysis_name = "";
    $scope.ItemValues = [];
    $scope.ItemValues.push({Name: "", SeqNo: ""});
    $scope.ItemValues.push({Name: "", SeqNo: ""});
  }
  //设置为项目分析指项
  $scope.SetPrjAnalysisItem = function (id) {
    //if (confirm("设置分析指项后便不能在设置与修改分析指项，你确定要将本分析指项设置为项目分析指项吗？")) {
    $scope.anaItem = {
      usr_id: $rootScope.userID,
      prjId: $scope.shareProjectId,
      anaItemId: id,
    };
    $http({
      method: 'get',
      params: $scope.anaItem,
      url: "/api/Keyword/SetPrjAnalysisItem"
    })
      .success(function (response, status) {
        $scope.addAlert('success', response.Message);
        $scope.GetPrjAnalysisItem();
        $scope.chang_AnalysisZ1();
        $scope.isActiveAnalysis_selected = false;
        $scope.GetPrjAnalysisItem2();

      })
      .error(function (response, status) {
        $scope.addAlert('danger', "网络打盹了，请稍后。。。");
      });
    //}
  }
  //获取设置项目分析指项
  $scope.GetPrjAnalysisItem = function () {
    $scope.anaItem = {
      usr_id: $rootScope.userID,
      prjId: $scope.shareProjectId,
    };
    $http({
      method: 'get',
      params: $scope.anaItem,
      url: "/api/Keyword/GetPrjAnalysisItem"
    })
      .success(function (response, status) {
        if (response.Name == "" || response.Name == null) {
          $scope.isActiveAnalysis_selected = false;
        } else {
          $scope.isActiveAnalysis_selected = true;
          $scope.GetPrjAnalysisItem_list = response;
          $scope.GetPrjAnalysisItemName_list = response.ItemValues;
          $rootScope.PrjAnalysisItemName_list = response.ItemValues;
          $scope.changePrjAsIt_list1();
        }

      })
      .error(function (response, status) {
        $scope.addAlert('danger', "网络打盹了，请稍后。。。");
      });
  }
  //修改分析指项
  $scope.changeAnalysisItem = function (id, name, ItemValues) {
    $scope.Analysis_name = name;
    $scope.ItemValues = ItemValues;
    $scope.chang_AnalysisZ3();
    $scope.Analysis_id = id;
  };
  $scope.changeAnalysisItem2 = function (id, name, ItemValues) {
    $scope.Analysis_name = name;
    $scope.isactriveChgSelIt = false;
    $scope.ItemValues = ItemValues;
    $scope.chang_AnalysisZ3();
    $scope.Analysis_id = id;
  };
  //新建分析指项
  $scope.newAnalysisItem = function () {
    $scope.clearAnalysisItem();
    $scope.keywordControlIsActive3();
  }
  //删除分析指项
  $scope.RemoveAnalysisItem = function (id) {
    if (confirm("您确定要删除本分析指项吗？")) {
      $scope.anaItem = {
        anaItemId: id,
        user_id: $rootScope.userID
      };
      $http({
        method: 'get',
        params: $scope.anaItem,
        url: "/api/Keyword/RemoveAnalysisItem"
      })
        .success(function (response, status) {
          $scope.GetAnalysisItem();
          $scope.addAlert('success', response.Message);
        })
        .error(function (response, status) {
          $scope.addAlert('danger', "网络打盹了，请稍后。。。");
        });
    }

  }


  //自动加载__________________________________________________
  $rootScope.GetBaiduSearchKeyword2();
  $scope.GetBaiduKeyword();
  $scope.GetPrjAnalysisItem();
});