require.config({
    'paths': {//设置短路径(方便后期使用):如果是以require所在文件夹为基础路径，后面的js文件不需要后缀，推荐这样写
        'jq': '../lib/jquery-1.10.1.min',//一般放在js文件夹外的js文件才需要配置短路径
        'wei': '../lib/weicommon'
    },
    'shim': {//设置依赖关系，idx就依赖于common
    }
});
require(['jq', 'wei'], function () {
    require(['myquery'], function (fnnlist) {
        $('#head1').load('head_oth.html', () => {
            let uname = cookieObj.getCookie('name');
            if (uname) {//登录咯
                let htmll = `<span>${uname}</span>
                            <b class="vip"></b>
                            <i class="iconfont icon-iconfontplatformentrance-copy-copy
                                "></i>
                            <div class="nav1_con">
                                <div class="con_t">
                                    <img src="../img/no-img_mid_.jpg" alt="">
                                    <p>
                                        <span>
                                            <i></i>
                                            <i class="logout">退出</i>
                                        </span>
                                        <span>开通PLUS 平均省1012元/年></span>
                                    </p>
                                </div>
                                <div class="con_b">
                                    <p class="left_btn">&lt;</p>
                                    <div class="hidbox">
                                        <dl>
                                            <dd>
                                                <i class="iconfont icon-jingdong"></i>
                                                <span>免费试用</span>
                                            </dd>
                                            <dd>
                                                <i class="iconfont icon-jingdong"></i>
                                                <span>运费单免</span>
                                            </dd>
                                            <dd>
                                                <i class="iconfont icon-jingdong"></i>
                                                <span>生日特权</span>
                                            </dd>
                                            <dd>
                                                <i class="iconfont icon-jingdong"></i>
                                                <span>闪电退款</span>
                                            </dd>
                                            <dd>
                                                <i class="iconfont icon-jingdong"></i>
                                                <span>上门换新</span>
                                            </dd>
                                            <dd>
                                                <i class="iconfont icon-jingdong"></i>
                                                <span>京享值礼包</span>
                                            </dd>
                                            <dd>
                                                <i class="iconfont icon-jingdong"></i>
                                                <span>贵宾专线</span>
                                            </dd>
                                            <dd>
                                                <i class="iconfont icon-jingdong"></i>
                                                <span>运费双免</span>
                                            </dd>
                                        </dl>
                                    </div>
                                    <p class="right_btn">&gt;</p>`;
                $('.nav1 .userbox').html(htmll);
                let num = 0;
                let iw = $('#head1 .hidbox dl dd').outerWidth();
                let lf = $('#head1 .hidbox dl dd').css('margin-right');
                lf = lf.slice(0, -2) * 1;
                let speed = $('#head1 .hidbox dl dd').outerWidth() + lf;
                // console.log(speed);
                $('#head1 .right_btn').click(() => {
                    num++;
                    if (num > $('#head1 .hidbox dl').find('dd').length - 2) {
                        num = 0;
                    }
                    $('#head1 .hidbox dl').stop().animate({ 'left': -num * speed }, 1000, 'linear');
                });
                $('#head1 .left_btn').click(() => {
                    num--;
                    if (num < 0) {
                        num = $('#head1 .hidbox dl').find('dd').length - 2;
                    }
                    $('#head1 .hidbox dl').stop().animate({ 'left': -num * speed }, 1000, 'linear');
                });
                $('#head1 .logout').click(() => {
                    cookieObj.removeCookie('name');
                    location.reload();
                });
                hid();
            } else {
                let htmll = `<span class="gotologin">hello,请先登录</span><span class="gotoreg">免费注册</span>`;
                let n = parseInt(Math.random() * 100);
                $('.nav1 .userbox').html(htmll);
                $('#head1 .gotologin').click(() => {
                    localStorage.setItem('url', 'shoppingCar.html');
                    location.href = 'login.html?' + n;
                    hid();
                });
                $('#head1 .gotoreg').click(() => {
                    localStorage.setItem('url', 'shoppingCar.html');
                    location.href = 'reg.html?' + n;
                });
            }
            $('#gogoindex').click(() => {
                location.href = '../index.html';
            });

            $('#gohoutai').css('color', 'red');
            $('#gohoutai').parent().css('width', '120');
            $('#gohoutai').click(() => {
                location.href = 'manlogin.html';
            });

            if ($('.baby').length <= 0) {
                let kong = `<div class="kongkong">
                                <img src="../img_list/no-login-icon.png" alt="">
                                <p>
                                    <span>购物车空空的哦~，去看看心仪的商品吧~</span>
                                    <a href="###" id="gotolist">去购物 ></a>
                                </p>
                            </div>`;
                $('#car .main').html(kong);
                $('#gotolist').click(() => {
                    location.href = 'list.html';
                });
            }
        });

        //渲染购物车
        let uname = cookieObj.getCookie('name');
        let gid = localStorage.goodname;
        let iGnum = [];
        let gnum = localStorage.goodnum;
        let iGid = [];
        if (gid && gnum) {
            iGnum = gnum.split('&');
            iGid = gid.split('&');
        }
        let iTeam = [];
        iGid.forEach((item, index) => {
            let manber = [item, iGnum[index]];
            iTeam.push(manber);
        });
        // console.log(iTeam);

        function hid() {
            if (uname) {
                $('#tips').css('display', 'none');
            } else {
                $('#tips').css('display', 'flex');
            }
        }
        hid();

        function haonan() {
            let prom2 = new Promise(resolved => {
                $.ajax({
                    type: 'get',
                    url: '../api/gwc.php',
                    async: false,
                    data: {
                        uname: uname
                    },
                    success: str => {
                        // console.log(str);
                        var arr = JSON.parse(str);
                        resolved(arr);
                    }
                });
            });
            prom2.then(arr => {
                let html = '';
                let arr3 = [];
                arr.reverse();
                console.log(arr);
                let arr2 = [];
                arr.forEach(item => {
                    arr2.push(item.shop);
                });
                arr3 = norep(arr2);//店铺去重
                // console.log(arr3);
                for (let i = 0; i < arr3.length; i++) {
                    html += `<div class="ashop" data-id = ${i}>
                        <h3>
                            <input type="checkbox" name="" class="shopn"><label for="">店铺:</label>
                            <span class="shopName">${arr3[i]}</span>
                        </h3>`;
                    for (let j = 0; j < arr.length; j++) {
                        // html += `<ul class="goods" data-id = ${arr[j].gid}>`;
                        if (arr[j].shop == arr3[i]) {
                            html += `<ul class="goods" data-gid = ${arr[j].gid}>
                                <li class="cek">
                                    <input type="checkbox" name="" class="baby" data-sta = "${arr[j].status}">
                                    <img src="${arr[j].imgsrc}" alt="">
                                </li>
                                <li class="ginf">${arr[j].gname}</li>
                                <li class="price">￥ <span class="dj">${arr[j].price}</span></li>
                                <li class="num">
                                    <input type="button" value="-" class="dis">
                                    <input type="text" value="${arr[j].num}" class="jian" data-kc = "200">
                                    <input type="button" value="+" class="add">
                                </li>
                                <li class="total">￥ <span class="zj">${(arr[j].price * arr[j].num).toFixed(2)}</span></li>
                                <li class="del">删除</li>
                            </ul>`;
                        }
                    }
                    html += '</div>';
                }
                $('#car .main').html(html);

                $('#car .baby').each((index, item) => {
                    if ($(item).data('sta') == 2) {
                        $(item).prop('checked', true);
                    } else {
                        $(item).prop('checked', false);
                    }
                });

                bott();
                opAll();

                function bott() {
                    $('#lastNum').html(() => {
                        let number = 0;
                        $('.baby:checked').each((index, item) => {
                            number += $(item).parent().parent().find('.jian').val() - 0;
                        });
                        return number;
                    });
                    $('#lastTot').html(() => {
                        let money = 0;
                        $('.baby:checked').each((index, item) => {
                            money += $(item).parent().parent().find('.zj').text() * 1;
                        });
                        return '￥' + money.toFixed(2);
                    });
                    let yanse = [];
                    $(arr).each(index => {
                        if ($('.baby').eq(index).prop('checked') == true) {
                            yanse.push(1);
                        }
                    });
                    if (yanse.length > 0) {
                        $('#pay').addClass('active');
                    } else {
                        $('#pay').removeClass('active');
                    }
                    if ($('.baby:checked').length == 0) {
                        $('#lastNum').html(0);
                    }
                    $('.baby').each((index, item) => {
                        let goodId = $(item).parent().parent().data('gid');
                        let sta = $(item).prop('checked');
                        if ($(item).prop('checked') == true) {
                            sta = 2;
                        } else {
                            sta = 1;
                        }
                        $.ajax({
                            type: 'post',
                            url: '../api/changcar.php',
                            data: {
                                uname: uname,
                                type: 'status',
                                gid: goodId,
                                sta: sta
                            },
                            success: str => {
                                console.log(str);
                            }
                        });
                    });
                    if ($('.baby').length <= 0) {
                        let kong = `<div class="kongkong">
                                        <img src="../img_list/no-login-icon.png" alt="">
                                        <p>
                                            <span>购物车空空的哦~，去看看心仪的商品吧~</span>
                                            <a href="###" id="gotolist">去购物 ></a>
                                        </p>
                                    </div>`;
                        $('#car .main').html(kong);
                        $('#gotolist').click(() => {
                            location.href = 'list.html';
                        });
                    }
                }


                $('#all').click(() => {
                    let allC = $('#all').prop('checked');
                    $('.shopn').prop('checked', allC);
                    $('.baby').prop('checked', allC);
                    bott();
                });

                $('.main .shopn').each((index, item) => {
                    $(item).click(() => {
                        let sta = $(item).prop('checked');
                        $(arr).each(index => {
                            if ($(item).parent().parent().data('id') == $('.baby').eq(index).parent().parent().parent().data('id')) {
                                $('.baby').eq(index).prop('checked', sta);
                            }
                        });
                        bott();
                        opAll();
                    });
                });

                function opAll() {
                    if ($('.main .shopn:checked').length == arr3.length) {
                        $('#all').prop('checked', true);
                    } else {
                        $('#all').prop('checked', false);
                    }
                    $('.ashop').each((index, item) => {
                        if (($(item).find('.baby:checked')).length == ($(item).find('.baby')).length) {
                            $('.main .shopn').eq(index).prop('checked', true);
                        } else {
                            $('.main .shopn').eq(index).prop('checked', false);
                        }
                    });
                    if ($('.main .baby:checked').length == $('.main .baby').length && $('.main .baby').length > 0) {
                        $('#all').prop('checked', true);
                    } else {
                        $('#all').prop('checked', false);
                    }
                }

                $('.baby').click(() => {
                    bott();
                    opAll();
                });

                function changNum(th, num, pri) {
                    let kucun = $(th).parent().find('.jian').data('kc');
                    if (num <= 1) {
                        num = 1;
                        $(th).parent().find('.dis').attr('disabled', '');
                    } else {
                        $(th).parent().find('.dis').removeAttr('disabled');
                    }
                    if (num >= kucun) {
                        num = kucun;
                        $(th).parent().find('.add').attr('disabled', '');
                    } else {
                        $(th).parent().find('.add').removeAttr('disabled');
                    }
                    $(th).parent().find('.jian').val(num);
                    let tot = (pri * num).toFixed(2);
                    $(th).parent().parent().find('.zj').text(tot);
                    bott();
                    let goodId = $(th).parent().parent().data('gid');
                    $.ajax({
                        type: 'post',
                        url: '../api/changcar.php',
                        data: {
                            uname: uname,
                            type: 'change',
                            gid: goodId,
                            num: num * 1
                        },
                        success: str => {
                            console.log(str);
                        }
                    });
                }


                //加减数量
                $('.num').on('click', '.add', function () {
                    let num = $(this).prev().val();
                    let pri = $(this).parent().parent().find('.dj').text();
                    // console.log(num);
                    num++;
                    changNum($(this), num, pri);
                });

                $('.num').on('click', '.dis', function () {
                    let num = $(this).next().val();
                    let pri = $(this).parent().parent().find('.dj').text();
                    // console.log(num);
                    num--;
                    changNum($(this), num, pri);
                });

                $('.num').on('input', '.jian', function () {
                    let num = $(this).val();
                    let pri = $(this).parent().parent().find('.dj').text();
                    changNum($(this), num, pri);
                });

                //删除节点
                $('.goods').on('click', '.del', function () {
                    let isdel = confirm('你的真不要我了啊？');
                    let goodId = $(this).parent().data('gid');
                    if (isdel) {
                        $.ajax({
                            type: 'post',
                            url: '../api/changcar.php',
                            data: {
                                uname: uname,
                                type: 'del',
                                gid: goodId
                            },
                            success: str => {
                                console.log(str);
                            }
                        });
                        $(this).parent().remove();
                    }
                    $('.ashop').each((index, item) => {
                        if ($(item).find('.goods').length == 0) {
                            // console.log(666);
                            $(item).remove();
                        }
                    });
                    bott();
                    opAll();
                });

                //删除选中
                $('#delchc').click(function () {
                    let isdel = confirm('你的真不要我了啊？');
                    if (isdel) {
                        $('.baby:checked').each((index, item) => {
                            let goodId = $(item).parent().parent().data('gid');
                            $.ajax({
                                type: 'post',
                                url: '../api/changcar.php',
                                data: {
                                    uname: uname,
                                    type: 'del',
                                    gid: goodId
                                },
                                success: str => {
                                    console.log(str);
                                }
                            });
                            $(item).parent().parent().remove();
                        });
                    }
                    $('.ashop').each((index, item) => {
                        if ($(item).find('.goods').length == 0) {
                            // console.log(666);
                            $(item).remove();
                        }
                    });
                    bott();
                    opAll();
                });

                //删除全部
                $('#delall').click(function () {
                    let isdel = confirm('你的真不要我们了吗？');
                    if (isdel) {
                        $('.baby').each((index, item) => {
                            let goodId = $(item).parent().parent().data('gid');
                            $.ajax({
                                type: 'post',
                                url: '../api/changcar.php',
                                data: {
                                    uname: uname,
                                    type: 'del',
                                    gid: goodId
                                },
                                success: str => {
                                    console.log(str);
                                }
                            });
                            $(item).parent().parent().remove();
                        });
                    }
                    $('.ashop').each((index, item) => {
                        if ($(item).find('.goods').length == 0) {
                            // console.log(666);
                            $(item).remove();
                        }
                    });
                    bott();
                    opAll();
                });

            });
        }


        if (uname) {
            if (iGnum.length > 0 && iGid.length > 0) {
                iGid.forEach((item, index) => {
                    $.ajax({
                        type: 'get',
                        url: '../api/tocar.php',
                        data: {
                            gid: item,
                            gnum: iGnum[index],
                            uname: uname
                        },
                        async: false,
                        success: str => {
                            if (index >= (iGid.length - 1)) {
                                haonan();
                                localStorage.removeItem('goodname');
                                localStorage.removeItem('goodnum');
                            }
                        }
                    });
                });
            } else {
                haonan();
            }

        } else {
            var porm1 = new Promise(resolved => {
                var arrr = [];
                iGid.forEach(item => {
                    $.ajax({
                        type: 'get',
                        url: '../api/xq.php',
                        async: false,
                        data: {
                            id: item
                        },
                        success: str => {
                            // console.log(str);
                            let arrrr = JSON.parse(str);
                            arrr.push(arrrr[0]);
                            if (arrr.length == iGid.length) {//循环里面调用ajax，只能用条件来控制何时执行了
                                resolved(arrr);
                            }
                        }
                    });
                });
            });
            let html = '';
            let arr3 = [];
            porm1.then(arr => {
                // console.log(str);
                arr.reverse();
                console.log(arr);
                let arr2 = [];
                arr.forEach(item => {
                    // console.log(item);
                    arr2.push(item.shopname);
                });
                arr3 = norep(arr2);//店铺去重
                console.log(arr2);
                console.log(arr3);
                for (let i = 0; i < arr3.length; i++) {
                    html += `<div class="ashop" data-id = ${i}>
                                    <h3>
                                        <input type="checkbox" name="" class="shopn"><label for="">店铺:</label>
                                        <span class="shopName">${arr3[i]}</span>
                                    </h3>`;
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[j].shopname == arr3[i]) {
                            let goodnumber = iTeam.map(item => {
                                if (item[0] == arr[j].idd) {
                                    return item[1];
                                }
                            }).join('');
                            // console.log(goodnumber);
                            html += `<ul class="goods" data-gid = ${arr[j].idd}>
                                            <li class="cek">
                                                <input type="checkbox" name="" class="baby" data-sta = "1">
                                                <img src="${arr[j].imgurl}" alt="">
                                            </li>
                                            <li class="ginf">${arr[j].nnnnn}</li>
                                            <li class="price">￥ <span class="dj">${arr[j].price}</span></li>
                                            <li class="num">
                                                <input type="button" value="-" class="dis">
                                                <input type="text" value="${goodnumber}" class="jian" data-kc = "200">
                                                <input type="button" value="+" class="add">
                                            </li>
                                            <li class="total">￥ <span class="zj">${(arr[j].price * goodnumber).toFixed(2)}</span></li>
                                            <li class="del">删除</li>
                                        </ul>`;
                        }
                    }
                    html += '</div>';
                }
                $('#car .main').html(html);

                $('#car .baby').each((index, item) => {
                    if ($(item).data('sta') == 2) {
                        $(item).prop('checked', true);
                    } else {
                        $(item).prop('checked', false);
                    }
                });

                bott();
                opAll();

                function bott() {
                    $('#lastNum').html(() => {
                        let number = 0;
                        $('.baby:checked').each((index, item) => {
                            number += $(item).parent().parent().find('.jian').val() - 0;
                        });
                        return number;
                    });
                    $('#lastTot').html(() => {
                        let money = 0;
                        $('.baby:checked').each((index, item) => {
                            money += $(item).parent().parent().find('.zj').text() * 1;
                        });
                        return '￥' + money.toFixed(2);
                    });
                    let yanse = [];
                    $(arr).each(index => {
                        if ($('.baby').eq(index).prop('checked') == true) {
                            yanse.push(1);
                        }
                    });
                    if (yanse.length > 0) {
                        $('#pay').addClass('active');
                    } else {
                        $('#pay').removeClass('active');
                    }
                    if ($('.baby:checked').length == 0) {
                        $('#lastNum').html(0);
                    }
                    if ($('.baby').length <= 0) {
                        let kong = `<div class="kongkong">
                                        <img src="../img_list/no-login-icon.png" alt="">
                                        <p>
                                            <span>购物车空空的哦~，去看看心仪的商品吧~</span>
                                            <a href="###" id="gotolist">去购物 ></a>
                                        </p>
                                    </div>`;
                        $('#car .main').html(kong);
                        $('#gotolist').click(() => {
                            location.href = 'list.html';
                        });
                    }
                }


                $('#all').click(() => {
                    let allC = $('#all').prop('checked');
                    $('.shopn').prop('checked', allC);
                    $('.baby').prop('checked', allC);
                    bott();
                });

                $('.main .shopn').each((index, item) => {
                    $(item).click(() => {
                        let sta = $(item).prop('checked');
                        $(arr).each(index => {
                            if ($(item).parent().parent().data('id') == $('.baby').eq(index).parent().parent().parent().data('id')) {
                                $('.baby').eq(index).prop('checked', sta);
                            }
                        });
                        bott();
                        opAll();
                    });
                });

                function opAll() {
                    if ($('.main .shopn:checked').length == arr3.length) {
                        $('#all').prop('checked', true);
                    } else {
                        $('#all').prop('checked', false);
                    }
                    $('.ashop').each((index, item) => {
                        if (($(item).find('.baby:checked')).length == ($(item).find('.baby')).length) {
                            $('.main .shopn').eq(index).prop('checked', true);
                        } else {
                            $('.main .shopn').eq(index).prop('checked', false);
                        }
                    });
                    if ($('.main .baby:checked').length == $('.main .baby').length && $('.main .baby').length > 0) {
                        $('#all').prop('checked', true);
                    } else {
                        $('#all').prop('checked', false);
                    }
                }

                $('.baby').click(() => {
                    bott();
                    opAll();
                });

                function changNum(th, num, pri) {
                    let kucun = $(th).parent().find('.jian').data('kc');
                    if (num <= 1) {
                        num = 1;
                        $(th).parent().find('.dis').attr('disabled', '');
                    } else {
                        $(th).parent().find('.dis').removeAttr('disabled');
                    }
                    if (num >= kucun) {
                        num = kucun;
                        $(th).parent().find('.add').attr('disabled', '');
                    } else {
                        $(th).parent().find('.add').removeAttr('disabled');
                    }
                    $(th).parent().find('.jian').val(num);
                    let tot = (pri * num).toFixed(2);
                    $(th).parent().parent().find('.zj').text(tot);
                    bott();
                    let goodId = $(th).parent().parent().data('gid');
                    iGid.forEach((item, index) => {
                        if (goodId == item) {
                            iGnum[index] = num;
                        }
                    });
                    localStorage.goodname = iGid.join('&');
                    localStorage.goodnum = iGnum.join('&');
                }


                //加减数量
                $('.num').on('click', '.add', function () {
                    let num = $(this).prev().val();
                    let pri = $(this).parent().parent().find('.dj').text();
                    // console.log(num);
                    num++;
                    changNum($(this), num, pri);
                });

                $('.num').on('click', '.dis', function () {
                    let num = $(this).next().val();
                    let pri = $(this).parent().parent().find('.dj').text();
                    // console.log(num);
                    num--;
                    changNum($(this), num, pri);
                });

                $('.num').on('input', '.jian', function () {
                    let num = $(this).val();
                    let pri = $(this).parent().parent().find('.dj').text();
                    changNum($(this), num, pri);
                });

                //删除节点
                $('.goods').on('click', '.del', function () {
                    let isdel = confirm('你的真不要我了啊？');
                    let goodId = $(this).parent().data('gid');
                    if (isdel) {
                        iGid.forEach((item, index) => {
                            if (goodId == item) {
                                iGid.splice(index, 1);
                                iGnum.splice(index, 1);
                            }
                        });
                        localStorage.goodname = iGid.join('&');
                        localStorage.goodnum = iGnum.join('&');
                        $(this).parent().remove();
                    }
                    $('.ashop').each((index, item) => {
                        if ($(item).find('.goods').length == 0) {
                            // console.log(666);
                            $(item).remove();
                        }
                    });
                    bott();
                    opAll();

                });

                //删除选中
                $('#delchc').click(function () {
                    let isdel = confirm('你的真不要我了啊？');
                    if (isdel) {
                        $('.baby:checked').each((index, item) => {
                            let goodId = $(item).parent().parent().data('gid');
                            iGid.forEach((item, index) => {
                                if (goodId == item) {
                                    iGid.splice(index, 1);
                                    iGnum.splice(index, 1);
                                }
                            });
                            localStorage.goodname = iGid.join('&');
                            localStorage.goodnum = iGnum.join('&');
                            $(item).parent().parent().remove();
                        });
                    }
                    $('.ashop').each((index, item) => {
                        if ($(item).find('.goods').length == 0) {
                            // console.log(666);
                            $(item).remove();
                        }
                    });
                    bott();
                    opAll();
                });

                //删除全部
                $('#delall').click(function () {
                    let isdel = confirm('你的真不要我们了吗？');
                    if (isdel) {
                        $('.baby').each((index, item) => {
                            $(item).parent().parent().remove();
                            localStorage.removeItem('goodname');
                            localStorage.removeItem('goodnum');
                        });
                    }
                    $('.ashop').each((index, item) => {
                        if ($(item).find('.goods').length == 0) {
                            // console.log(666);
                            $(item).remove();
                        }
                    });
                    bott();
                    opAll();
                });


            });
        }

        $('#tips .denglu').click(() => {
            $('#dlk .smark').css('display', 'block');
            $('#dlk .dlbox').css('display', 'block');
        });

        $('#dlk .smark').click(() => {
            $('#dlk .smark').css('display', 'none');
            $('#dlk .dlbox').css('display', 'none');
        });

        $('#dlk .cha').click(() => {
            $('#dlk .smark').css('display', 'none');
            $('#dlk .dlbox').css('display', 'none');
        });

        $('#pay').click(() => {
            if ($('.baby:checked').length > 0) {
                $('#dlk .smark').css('display', 'block');
                $('#dlk .dlbox').css('display', 'block');
            } else {
                alert('还未勾选商品哦~赶紧去添加商品吧！');
            }
        });

        $('#dlk .regbutt').click(() => {
            let n = parseInt(Math.random() * 100);
            localStorage.setItem('url', 'shoppingCar.html');
            location.href = 'reg.html?' + n;
        });

        $('#dlk .loginbutt').click(() => {
            let tex1 = $('#dlk .uname').val();
            let tex2 = $('#dlk .pass').val();
            if (tex1 && tex2) {
                $.ajax({
                    type: 'post',
                    data: {
                        username: tex1,
                        password: tex2
                    },
                    url: '../api/login.php',
                    success: str => {
                        if (str == '登录成功') {
                            fnnlist.cookieObj.setCookie('name', tex1, 7);
                            localStorage.goodname = iGid.join('&');
                            localStorage.goodnum = iGnum.join('&');
                            location.reload();
                        } else {
                            alert(str);
                        }
                    }
                })
            }
        });

    });
});