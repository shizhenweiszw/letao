//查询当前用户信息
var userInfo=null;
$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    async: false,
    success: function (es) {
        if(es.error&&es.error==400){
            location.href='login.html';
        }
        userInfo=es;
    }
});
$(function () {
    //根据用户id查询地址信息
    var userId=userInfo.id;
    var address='';
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        data: {
            userId:userId,
        },
        success: function (es) {
            address=es;
            var html= template('addressTemplate',{result:es});
            $('#addressInfo').html(html);
        }
    });
    //删除地址
    $('#addressInfo').on('tap','.delete-btn',function () {
        var li=this.parentNode.parentNode;
        var address_id=$(this).data("id");
        mui.confirm('确定要删除',function (es) {
            if (es.index==1){
                //确定删除
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id:address_id
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.success){
                            location.href='address.html';
                        }
                    }
                });
            }else{
                mui.swipeoutClose(li);
                //location.href='address.html';
            }
        });
    });
    //编辑地址
    $('#addressInfo').on('tap','.edit-btn',function () {
        var address_id=$(this).data("id");
        for (var i=0;i<address.length;i++){
            if (address_id==address[i].id){
                localStorage.setItem('addressMessage',JSON.stringify(address[i]));
                return;
            }
        }

    });
});