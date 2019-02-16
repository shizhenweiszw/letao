$(function () {
    var keyArr=[];
    $('#letao-button').on('tap',function () {
        var keyword=$(this).siblings('input').val();
        if (keyword){
            //将用户输入的关键字放到数组
            keyArr.push(keyword);
            //转化为字符串存到本地
            localStorage.setItem('keyArr',JSON.stringify(keyArr));
            location.href='search-result.html?keyword='+keyword+'';
        }


    });
    //点击搜索框弹出搜索记录
    if (localStorage.getItem('keyArr')) {
        $('#search-text').on('tap',function () {
            //JSON字符串转化为对象
            keyArr=JSON.parse(localStorage.getItem('keyArr'));
            var html=template('searchResult',{result:keyArr});
            $('#letao-seach-history').html(html);
        });
    }

    //清除搜索记录
    $('#clear-seach-history').on('tap',function () {

        $('#letao-seach-history').html('');
        localStorage.removeItem('keyArr');
    });
    //点击搜索记录搜索
    $('#letao-seach-history').on('tap','li',function () {
        location.href='search-result.html?keyword='+$(this).html()+'';
    });
});