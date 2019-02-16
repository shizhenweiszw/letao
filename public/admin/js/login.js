//如果是登陆状态自动跳回用户中心页面
$.ajax({
    url: '/employee/checkRootLogin',
    type: 'get',
    async: false,
    success: function (es) {
        if (es.success) {
            location.href = 'userManage.html';
        }
    }
});

$(function () {
    $('#login-btn').on('click', function () {
        var username = $.trim($('[name=username]').val());
        var password = $.trim($('[name=password]').val());
        if (!username) {
            $('.alert-danger').html('请输入用户名！').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!password) {
            $('.alert-danger').html('请输入密码！').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (es) {
                if (es.success) {
                    location.href = 'userManage.html';
                } else {
                    $('.alert-danger').html('用户名或者密码错误！').show();
                    setTimeout(function () {
                        $('.alert-danger').fadeOut();
                    }, 2000);
                }
            }
        });
    });
});