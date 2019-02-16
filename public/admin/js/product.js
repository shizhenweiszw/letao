var totalPage = 0;
var productInfo = '';

function getProductData(page, pageSize) {
    //查询商品
    $.ajax({
        url: '/product/queryProductDetailList',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (es) {
            var html = template('template', es);
            //console.log(es);
            productInfo = es.rows;
            totalPage = Math.ceil(es.total / pageSize);
            $('tbody').html(html);
        }
    });
}

$(function () {
    var page = 1;
    var pageSize = 3;

    getProductData(page, pageSize);
    //上一页
    $('#prev').on('click', function () {
        page--;
        page = page < 1 ? 1 : page;
        getProductData(page, pageSize);
    });
    //下一页
    $('#next').on('click', function () {
        page++;
        page = page > totalPage ? totalPage : page;
        getProductData(page, pageSize);
    });

    //下架上架
    $('tbody').on('click', '#edit_btn_statu', function () {
        var statu = $(this).data('statu');
        var index = $(this).parent().siblings().eq(0).html() - (page - 1) * pageSize - 1;
        //1上架 2下架
        statu = statu == 1 ? 2 : 1;
        //获取要下架上架的商品
        var product_edit = productInfo[index];
        product_edit.statu = statu;
        updateProduct(product_edit);
        console.log(product_edit);
    });
    //获取二级级分类数据
    getSecondCategory();
    //选择一级分类
    var brandId = '';
    $('.firstCategoryName').on('click', 'li a', function () {
        $('.product_brand').html($(this).html());
        brandId = $(this).data('id');

    });
    //上传图片
    //图片序号
    var pic_i = 1;
    var img_urls = [];
    var imgs = {};
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            imgs.picName = data.result.picName;
            imgs.picAddr = data.result.picAddr;
            img_urls.push(imgs);
            //push( "picName"++":"++','+'picAddr'+(pic_i)+'='+);
            //console.log(img_urls);
            pic_i++;

        }
    });

    //编辑商品的序号
    var edit_index = -1;
    //编辑商品的id
    var edit_id = '';
    //要编辑商品的状态
    var product_statu = '';
    $('tbody').on('click', '#edit_product', function () {
        $('.title_edit').html('编辑商品');
        edit_id = $(this).data('id');
        product_statu = $(this).data('statu');
        //获取要编辑商品的序号
        edit_index = $(this).parent().siblings().eq(0).html() - (page - 1) * pageSize - 1;
        //获取需要编辑的商品信息
        var product_edit = productInfo[edit_index];
        //需要编辑的商品数据回显
        brandId = product_edit.brandId;//品牌ID
        getBrandName(brandId);//根据ID查询品牌
        //$('.brand').html(getBrandName(brandId));
        $('[name="proName"]').val(product_edit.proName);
        $('[name="proDesc"]').val(product_edit.proDesc);
        $('[name="num"]').val(product_edit.num);
        $('[name="price"]').val(product_edit.price);
        $('[name="oldPrice"]').val(product_edit.oldPrice);
        $('[name="size"]').val(product_edit.size);
    });
    //清除编辑状态
    $('#cancel_edit').on('click', function () {
        location.reload();
    });


    //添加商品
    $('#add_product').on('click', function () {

        //校验数据
        var proName = $.trim($('[name="proName"]').val());
        var proDesc = $.trim($('[name="proDesc"]').val());
        var num = $.trim($('[name="num"]').val());
        var price = $.trim($('[name="price"]').val());
        var oldPrice = $.trim($('[name="oldPrice"]').val());
        var size = $.trim($('[name="size"]').val());
        if (!brandId) {
            $('.alert-danger').html('请选择品牌').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!proName) {
            $('.alert-danger').html('请输入商品名称').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!proDesc) {
            $('.alert-danger').html('请输入商品描述').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!num) {
            $('.alert-danger').html('请输入商品库存').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!/^[0-9]+$/.test(num)) {
            $('.alert-danger').html('库存必须是正整数').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!price) {
            $('.alert-danger').html('请输入商品价格').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!/^[0-9]+([.][\d]{2})?$/.test(price)) {
            $('.alert-danger').html('价格必须是正整数或者保留小数点后两位').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!oldPrice) {
            $('.alert-danger').html('请输入商品原价').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!/^[0-9]+([.][\d]{2})?$/.test(oldPrice)) {
            $('.alert-danger').html('原价必须是正整数或者保留小数点后两位').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!size) {
            $('.alert-danger').html('请输入商品尺寸').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        if (!/^[1-9][0-9][-][1-9][0-9]$/.test(size)) {
            $('.alert-danger').html('尺寸输入格式不对').show();
            setTimeout(function () {
                $('.alert-danger').fadeOut();
            }, 2000);
            return;
        }
        //判断是编辑还是添加edit_index为-1表示添加大于等于0表示编辑
        if (edit_index == -1) {
            if (img_urls.length == 0) {
                $('.alert-danger').html('请添加图片').show();
                setTimeout(function () {
                    $('.alert-danger').fadeOut();
                }, 2000);
                return;
            }
            if (img_urls.length != 3) {
                $('.alert-danger').html('必须加三张图片').show();
                setTimeout(function () {
                    $('.alert-danger').fadeOut();
                }, 2000);
                return;
            }
            img_urls = JSON.stringify(img_urls);
            var addData = {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                statu: 1,
                num: num,
                brandId: brandId,
                pic: img_urls
                // pic:img_urls
            }
            console.log(img_urls);
            addProduct(addData);
        } else {
            var editdata = {
                id: edit_id,
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                statu: product_statu,
                //updateTime: '2019-02-13T03:30:41.000Z',
                num: num,
                brandId: 2
            }
            console.log(edit_id);
            updateProduct(editdata);
        }


    });
});

//添加商品
function addProduct(data) {
    $.ajax({
        url: '/product/addProduct',
        type: 'post',
        traditional: true,
        data: data,
        //dataType: 'json',
        success: function (es) {
            if (es.success) {
                //location.reload();
            }
        }
    });
}

//更新商品信息
function updateProduct(data) {
    $.ajax({
        url: '/product/updateProduct',
        type: 'post',
        data: data,
        success: function (es) {
            console.log(es);
            location.reload();
        }
    });
}

//查询二级级分类
var secondCategoryInfo = '';

function getSecondCategory() {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        success: function (es) {
            //console.log(es);
            secondCategoryInfo = es.rows;
            var html = template('template2', es);
            $('.firstCategoryName').html(html);
        }
    });
}

//根据Id查询品牌
function getBrandName(brandId) {
    for (var i = 0; i < secondCategoryInfo.length; i++) {
        if (secondCategoryInfo[i].id == brandId) {
            $('.product_brand').html(secondCategoryInfo[i].brandName);
            return;
        }
    }
}
















