var totalPages = 0;

//获取二级目录数据
function getSecondCategoryData(page, pageSize) {
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (es) {
            var html = template('template', es);
            $('#secondCategoryMessages').html(html);
            totalPages = Math.ceil(es.total / pageSize);
        }
    });
}


$(function () {
    var page = 1;
    var pageSize = 6;
    //一级目录总数
    var totalItems_first = localStorage.getItem('totalItems_first');
    //获取一级目录总数据
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: totalItems_first
        },
        success: function (es) {
            var html = template('template2', es);
            $('#firstCategoryMessages').html(html);
        }
    });
    getSecondCategoryData(page, pageSize);

    //上一页
    $('#prev').on('click', function () {
        page--;
        page = page < 1 ? 1 : page;
        getSecondCategoryData(page, pageSize);
    });
    //下一页
    $('#next').on('click', function () {
        page++;
        page = page > totalPages ? totalPages : page;
        getSecondCategoryData(page, pageSize);
    });
    //添加一级分类
    var categoryId_first = 0;
    $('#firstCategoryMessages').on('click', 'li a', function () {
        $('.selectFirstCategory').html($(this).html());
        categoryId_first = $(this).data('id');
    });
    //上传图片
    var img_url = '';
    $('[name="pic1"]').fileupload({
        dataType: 'json',
        done: function (e, data) {
            img_url = data.result.picAddr;
            $('#upload_img').attr('src', img_url);
        }
    });
    //提交分类数据
    $('#add_secondCategory_btn').on('click', function () {
        var firstCategory = $('.selectFirstCategory').html();
        var secondCategory = $.trim($('[name="brandName"]').val());
        if (firstCategory == '请选择') {
            $('.alert-danger').html('请选择一级分类').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!secondCategory) {
            $('.alert-danger').html('请输入二级分类').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!img_url) {
            $('.alert-danger').html('请添加图片').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: {
                brandName: secondCategory,
                categoryId: categoryId_first,
                brandLogo: img_url,
                hot: 0
            },
            success: function (es) {
                if (es.success) {
                    location.reload();
                }
            }
        });
    });
});