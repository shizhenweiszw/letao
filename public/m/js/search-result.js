//获取用户输入的关键字
var keyword=getParamsByUrl(location.href,'keyword');
//当前页
var page=1;
//页面数据
var html='';
//价格排序参数 默认升序
var price='1';
//库存排序 默认升序
var sort_num='2';

var that=null;
$(function () {
    //上拉加载
    mui.init({
        pullRefresh : {
            container:refreshContainer,//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //按照价格排序
    $('#sortByPrice').on('tap',function () {
        if ($(this).find('span').hasClass('mui-icon-arrowdown')) {
            $('#sortByPrice span').removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup');
        }else {
            $('#sortByPrice span').removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
        }
        //1升序 2降序
        price=price==1?2:1;
        html='';
        page=1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData(price);
    });
    //按照库存排序
    $('#sortByNum').on('tap',function () {
        if ($(this).find('span').hasClass('mui-icon-arrowdown')) {
            $('#sortByNum span').removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup');
        }else {
            $('#sortByNum span').removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
        }
        //1升序 2降序
        sort_num=sort_num==1?2:1;
        page=1;
        html='';
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData('',sort_num);
    });
});

//获取刷新数据
function getData(price,num) {
    this.price=price||'';
    this.num=num||'';
    if (!that){
        that=this;
    }

    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page:page++,
            pageSize:4,
            proName:keyword,
            price:price,
            num:num
        },
        success: function (es) {
            // console.log(es);
            if (es.data.length>0){
                html+=template('searchResult',es);
                $('#productList').html(html);
                //告诉上拉组件当前数据加载完毕
               that.endPullupToRefresh(false);
            }else{
                //true表示没有更多数据
               that.endPullupToRefresh(true);
            }

        }
    });
}