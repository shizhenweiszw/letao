$(function () {
    $.ajax({
        url: "/user/queryUser",
        type: 'get',
        data: {
            page: 1,
            pageSize: 3
        },
        success: function (es) {
            var html = template('list', es);
            $('#userMessage').html(html);
        }
    });

    $('#userMessage').on('click', '#edit-btn', function () {
        var isDelete = $(this).data('isdelete');
        var id = $(this).data('id');
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1,
            },
            success: function (es) {
                if (es.success) {
                    location.reload();
                }
            }
        });
    });
});