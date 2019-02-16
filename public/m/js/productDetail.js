$(function () {
    //商品id
    var id=getParamsByUrl(location.href,'id');
    //商品声音总数
    var total_num=0
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id:id
        },
        success: function (es) {
            total_num=es.num;
            var html=template('productMessage',es);
            $('.mui-content').html(html);
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:0//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    });
    //选择尺码
    var size=0;
    $('.mui-content').on('tap','.size span',function () {
        $(this).addClass('active').siblings().removeClass('active');
        size=$(this).html();
    });
    //加减数量

    var num=0;
    $('.mui-content').on('tap','#increase',function () {
        num=Number($('#product_num').val());
        num++;
        num=num>total_num?total_num:num;
        $('#product_num').val(num);

    });
    $('.mui-content').on('tap','#reduce',function () {
        num=Number($('#product_num').val());
        num--;
        num= num<0?0:num;
        $('#product_num').val(num);
    });
    //防止输入非数字
    $('.mui-content').on('keyup','#product_num',function () {
        if(!$.isNumeric($('#product_num').val())||$('#product_num').val()<0||$('#product_num').val()>total_num){
            mui.toast('请正确输入数量');
            $('#product_num').val(1);
        }
    });
    //加入购物车
    $('.mui-content').on('tap','#addCart',function () {
        if (!size){
            mui.toast('请选择尺寸');
            return;
        }
        var num=$('#product_num').val();
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num:num,
                size:size
            },
            success: function (es) {
                if (es.success){
                    mui.confirm('是否跳转到购物车页面?',function (res) {
                        if (res.index==1) {
                            location.href='cart.html';
                        }
                    });
                }
            }
        });
    });
});