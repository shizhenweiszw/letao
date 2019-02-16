$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.00005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        bounce: true
    });

    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function (es) {
           var html= template('category-first',{result:es.rows});
            $('#links').html(html);
            //默认选中第一级第一个分类
            if (es.rows.length) {
                var id=es.rows[0].id;
                getSecondCategory(id);
                $('#links').find('a').eq(0).addClass('active');
            }
        }
    });


    $('#links').on('tap','a',function () {
       var id=$(this).attr('data-id');
       $(this).addClass('active').siblings().removeClass('active');
       getSecondCategory(id);

    });
})
function getSecondCategory(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data:{
            id:id
        },
        success:function (es) {
            var html=template('category-second',es);
            $('#brand-list').html(html);
        }
    });
}