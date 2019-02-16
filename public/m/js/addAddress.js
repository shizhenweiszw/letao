$(function () {
    var url='';
    var html='';
    var address_id='';
    //判断是添加地址还是编辑地址 1编辑 0添加
    var isEdit=Number(getParamsByUrl(location.href,'isEdit'));;
    if(isEdit){
        //编辑
        var addressMessage=JSON.parse(localStorage.getItem('addressMessage'));
        address_id=addressMessage.id;
        html=template('oldAddress',addressMessage);
        url='/address/updateAddress';
    }else{
        //添加
        var html=template('oldAddress',{});
        url='/address/addAddress';
    }


    $('.mui-input-group').html(html);
    //创建一个picker选择器
    var picker = new mui.PopPicker({
        layer: 3
    });
    //添加数据
    picker.setData(cityData);
    $('#selectCity').on('tap',function () {
        picker.show(function (selectItem) {
            $('#selectCity').val(selectItem[0].text+selectItem[1].text+selectItem[2].text);
        });
    });
    //提交数据
    $('#add_address_btn').on('tap',function () {
        var recipients=$.trim($('[name=recipients]').val());
        var postcode=$.trim($('[name=postcode]').val());
        var address=$.trim($('[name=address]').val());
        var addressDetail=$.trim($('[name=addressDetail]').val());
        var data={
                recipients:recipients,
                postcode:postcode,
                address:address,
                addressDetail:addressDetail
            }
         if (isEdit){
             data={
                 recipients:recipients,
                 postcode:postcode,
                 address:address,
                 addressDetail:addressDetail,
                 id:address_id
             }
         }
        //数据校验
        if(!recipients){
            mui.toast('请输入收货人姓名');
            return;
        }
        if(!postcode){
            mui.toast('请输入邮政编码');
            return;
        }
        if(!address){
            mui.toast('请选择省市区');
            return;
        }
        if(!addressDetail){
            mui.toast('请输入详细地址');
            return;
        }
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (es) {
                if (es.success){
                    location.href='address.html';
                } else{
                    mui.toast('添加失败');
                }
            }
        });
    });
});