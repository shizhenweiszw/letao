//查询用户是否登陆
var userInfo=null;
$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    async: false,
    success: function (es) {
        if(es.error&&es.error==400){
            location.href='login.html';
        }
        userInfo=es;
    }
});
$(function () {
    console.log(userInfo);
    $('#user_phone').html(userInfo.mobile);
    $('#user_name').html('账号:'+userInfo.username);
    //退出登录
    $('#logout').on('tap',function () {
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function (es) {
                if (es.success){
                    location.href='index.html';
                }
            }
        });
    });
});