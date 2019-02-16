$(function () {
    //解决a标签不跳转问题
    mui('body').on('tap','a',function(){
        window.top.location.href=this.href;
    });
    $('.my-footer a').on('tap',function () {
        console.log($(this));
        $(this).addClass('mui-active').siblings().removeClass('mui-active');
    });

})
//获取url的参数
function getParamsByUrl(url,name) {
    var paramStr=url.substr(url.indexOf('?')+1);
    var paramArr=paramStr.split('&');
    for (var i=0;i<paramArr.length;i++){
        var param=paramArr[i].split('=');
        if (param[0]==name){
            return param[1];
        }
    }
    return null;
}