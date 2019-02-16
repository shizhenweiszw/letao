
$(function () {
    //调用接口获取验证码
    $('.getCode').on('tap',function () {
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function (es) {
                mui.alert('你的验证码是：'+es.vCode+'', '提示');
            }
        });
    });
    $('#register-btn').on('tap',function () {
        var username=$.trim($('[name=username]').val());
        var mobile=$.trim($('[name=mobile]').val());
        var password=$.trim($('[name=password]').val());
        var againPassword=$.trim($('[name=againPassword]').val());
        var vCode=$.trim($('[name=vCode]').val());
        //校验输入内容
        if (username==''){
            mui.alert('请输入用户名', '提示');
            return;
        }
        if (mobile==''){
            mui.alert('请输入手机号', '提示');
            return;
        }
        var rex=/^1[34578]\d{9}$/;
        if(!rex.test(mobile)){
            mui.alert('手机号码格式错误', '提示');
            return;
        }
        if (password==''){
            mui.alert('请输入密码', '提示');
            return;
        }
        if (againPassword==''){
            mui.alert('请输入确认密码', '提示');
            return;
        }
        if (password!=againPassword){
            // mui.toast('前后密码不一致');
            mui.alert('前后密码不一致', '提示');
            return;
        }
        if (vCode==''){
            mui.alert('请输入验证码', '提示');
            return;
        }
        //提交注册数据
        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function () {
                mui.alert('注册成功！', '提示',function () {
                    location.href='login.html';
                });
            }
        });
    });

});



