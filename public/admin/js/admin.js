//拦截未登录
// $.ajax({
//     url: '/employee/checkRootLogin',
//     type: 'get',
//     async: false,
//     success: function (es) {
//         if (es.error&&es.error==400) {
//             location.href='login.html';
//             return;
//         }
//     }
// });

$(function () {
    /*1.进度显示功能*/
    /*不显示转圈效果*/
    NProgress.configure({
        showSpinner: false
    });
    /*在ajax开始请求的时候  把进度条显示出来*/
    $(window).ajaxStart(function () {
        NProgress.start();
    });
    /*在ajax结束请求的时候  把进度条完成*/
    $(window).ajaxStart(function () {
        NProgress.done();
    });

    /*退出功能*/
    $('.glyphicon-log-out').on('click', function () {
        if (confirm('确定要退出')) {
            $.ajax({
                url: '/employee/employeeLogout',
                type: 'get',
                success: function (es) {
                    if (es.success) {
                        location.href = 'login.html';
                    }
                }
            });
        }
    });


    var navLi = $('.navs li');
    navLi.on('click', function () {
        $(this).find('div').slideToggle();
    });

});