var totalItems = 0;

function getFirstCategoryData(page, pageSize) {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (es) {
            var html = template('template', es);
            $('#first_category').html(html);
            totalItems = Number(es.total);
            localStorage.setItem('totalItems_first', totalItems);
        }
    });
}

$(function () {
    //获取一级分类数据并展示
    var page = 1;
    var pageSize = 3;

    getFirstCategoryData(page, pageSize);
    //上一页
    $('#prev').on('click', function () {
        page--;
        page = page < 1 ? 1 : page;
        getFirstCategoryData(page, pageSize);
    });
    //下一页
    $('#next').on('click', function () {
        page++;
        var totalPage = Math.ceil(totalItems / pageSize);
        page = page > totalPage ? totalPage : page;
        getFirstCategoryData(page, pageSize);
    });
    //添加一级分类
    $('#addFirsetCategory').on('click', function () {
        var categoryName = $.trim($('[name="categoryName"]').val());
        if (!categoryName) {
            $('.alert-danger').html('请输入分类名称').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: {
                categoryName: categoryName
            },
            success: function (es) {
                if (es.success) {
                    location.reload();
                }
            }
        });
    });
});
