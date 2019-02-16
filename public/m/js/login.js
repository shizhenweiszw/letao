$(function () {
    $('#login-btn').on('tap',function () {
        var username=$.trim($('[name=username]').val());
        var password=$.trim($('[name=password]').val());
        if (username==''){
            mui.toast('请输入用户名');
            return;
        }
        if (password==''){
            mui.toast('请输入密码');
            return;
        }
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username:username,
                password:password
            },
            beforeSend:function(){
                $('#login-btn').html('登录中...');
            },
            success: function (es) {
                if (es.success){
                    mui.toast('登录成功');
                    $('#login-btn').html('登录');
                    setTimeout(function () {
                        location.href='user.html';
                    },1000);
                } else{
                    mui.toast('用户名或者密码错误');
                    $('#login-btn').html('登录');
                }
            }
        });

    });
    
});