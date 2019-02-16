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
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:0//自动轮播周期，若为0则不自动播放，默认为0；
    });
    //获取商品数据
    getProductData();


});

//获取刷新数据
function getProductData() {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page:1,
            pageSize:100
        },
        success: function (es) {
            console.log(es);
                var html=template('productInfo',es);
                $('.sport').html(html);
                $('.lady').html(html);
                $('.men').html(html);

        }
    });
}