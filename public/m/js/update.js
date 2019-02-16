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
    $('#update-password-btn').on('tap',function () {
        var oldPassword=$.trim($('[name=oldPassword]').val());
        var newPassword=$.trim($('[name=newPassword]').val());
        var confirmNewPassword=$.trim($('[name=confirmNewPassword]').val());
        var vCode=$.trim($('[name=vCode]').val());
        if(!oldPassword){
            mui.toast('请输入原密码');
            return;
        }
        if(!newPassword){
            mui.toast('请输入新密码');
            return;
        }
        if(!confirmNewPassword){
            mui.toast('请输入确认密码');
            return;
        }
        if(newPassword!=confirmNewPassword){
            mui.toast('新密码与确认密码不一致');
            return;
        }
        if(!vCode){
            mui.toast('请输入验证码');
            return;
        }
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword:oldPassword,
                newPassword:newPassword,
                vCode:vCode
            },
            success: function (es) {
                if(es.success){
                    location.href='login.html';
                }
                if(es.error&&es.error==401){
                    mui.toast('验证码错误');
                }
                if(es.error&&es.error==403){
                    mui.toast('原密码错误');
                }
            }
        });
    });
});