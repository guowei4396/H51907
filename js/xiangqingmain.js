require.config({
    'paths': {//设置短路径(方便后期使用):如果是以require所在文件夹为基础路径，后面的js文件不需要后缀，推荐这样写
        'jq': '../lib/jquery-1.10.1.min',//一般放在js文件夹外的js文件才需要配置短路径
        'wei': '../lib/weicommon'
    },
    'shim': {//设置依赖关系，idx就依赖于common
        'largeglass': ['wei']
    }
});
require(['jq', 'wei', 'largeglass'], function () {
    require(['myquery'], function (fnnlist) {

        let str = location.search.slice(1);//获得传过来的参数，但是有个?，需要去掉
        let url = strToObj(str);

        $('#head1').load('head_oth.html', () => {
            let username = cookieObj.getCookie('name');
            if (username) {//登录咯
                let htmll = `<span>${username}</span>
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
            } else {
                let htmll = `<span class="gotologin">hello,请先登录</span><span class="gotoreg">免费注册</span>`;
                let n = parseInt(Math.random() * 100);
                $('.nav1 .userbox').html(htmll);
                $('#head1 .gotologin').click(() => {
                    localStorage.setItem('url', 'xiangqing.html?' + str);
                    localStorage.gid = url.gid;
                    location.href = 'login.html?' + n;
                });
                $('#head1 .gotoreg').click(() => {
                    localStorage.setItem('url', 'xiangqing.html?' + str);
                    localStorage.gid = url.gid;
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
        });

        let prom = new Promise(resolve => {
            $.ajax({
                type: 'get',
                url: '../api/xq.php',
                data: {
                    id: url.gid
                },
                success: str => {
                    let arr = JSON.parse(str);
                    resolve(arr);
                    //把数据扔到外面再渲染
                }
            });
        });

        //promise渲染
        prom.then(function (arr) {
            let arrI = [arr[0].imgurl, '../img_list/3a32fe4bd7733a80.jpg', '../img_list/4be9ecaa43c8c324.jpg', '../img_list/5a5575feNce602680.jpg', '../img_list/9b10db1b372adfc6.jpg'];
            let html1 = `<div class="img">
                                <img src="${arrI[0]}" alt="">
                                <div class="shade"></div>
                                <div class="bigger">
                                    <div>
                                        <img src="${arrI[0]}" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="leftbot">
                                <input type="button" value="&lt;" class="prev">
                                <ul class='smallPic'>
                                </ul>
                                <input type="button" value="&gt;" class="next">
                            </div>`;
            $('#fdj').html(html1);
            let html2 = `<h2><i>京东超市</i>${arr[0].nnnnn}</h2>
                            <ul class="money">
                                <li>
                                    <span>京东价</span>
                                    <span>￥<i class="price">${arr[0].price}</i></span>
                                    <span><i>降价通知</i></span>
                                    <span><i>累计评价</i><i>${arr[0].review.slice(0, -3)}</i></span>
                                </li>
                                <li>
                                    <span>促销</span>
                                    <span>换购</span>
                                    <span>购买1件可优惠换购热销商品</span>
                                    <span>立即换购 >></span>
                                </li>
                            </ul>
                            <p>
                                <b>店铺名</b>
                                <span>${arr[0].shopname}</span>
                            </p>
                            <p>
                                <b>重量</b>
                                <span>2.85kg</span>
                            </p>
                            <p>
                                <b>服务支持</b>
                                <span></span>
                                <span>优先赔</span>
                            </p>
                            <p>
                                <span>自提</span>
                                <span>生鲜99元免基础运费（20kg内）</span>
                            </p>
                            <div class="jiacar">
                                <div class="goodnum">
                                    <input type="text" class="quant" value="1">
                                    <div class="mdzz">
                                        <input type="button" value="-" class="disquan nobtn">
                                        <input type="button" value="+" class="addquan">
                                    </div>
                                </div>
                                <a href="###" class="tocar">加入购物车</a>
                                <span class="totsp">总价：￥<i class="total">${arr[0].price}</i></span>
                            </div>
                            <p>
                                <span>温馨提示</span>
                                <span>· 不支持7天无理由退货</span>
                            </p>`;
            $('#main .good_con').html(html2);
            let html3 = `<p>
                            <span>商品名称：</span><span>${arr[0].nnnnn}</span>
                        </p>
                        <img src="../img_list/11111.jpg" alt="">
                        <img src="../img_list/22222.jpg" alt="">
                        <img src="../img_list/33333.jpg" alt="">
                        <img src="../img_list/44444.jpg" alt="">
                        <img src="../img_list/55555.jpg" alt="">
                        <img src="../img_list/66666.jpg" alt="">`;
            $('#goodcard .con li:first').html(html3);

            belarge({
                ele: 'fdj',
                imgsrc: arrI
            });

            //+ - 改变数量
            $('#main .disquan').click(function () {
                let num1 = $('#main .quant').val();
                let pri = $('#main .price').html();
                num1--;
                funlist.changquan(num1, pri);
            });

            $('#main .addquan').click(function () {
                let num1 = $('#main .quant').val();
                let pri = $('#main .price').html();
                num1++;
                funlist.changquan(num1, pri);
            });

            $('#main .quant').on('input', function () {
                let num1 = $('#main .quant').val();
                // console.log(isNaN(num1));
                let timer = null;
                if (isNaN(num1)) {
                    //输入的不是数字
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        num1 = 1;
                        let pri = $('#main .price').html();
                        funlist.changquan(num1, pri);
                    }, 1000);
                } else {
                    let pri = $('#main .price').html();
                    funlist.changquan(num1, pri);
                }
            });

            $('#main .tocar').click(() => {//加入购物车
                let uname = cookieObj.getCookie('name');
                console.log(uname);
                let quant = $('#main .quant').val();
                let obj = {
                    gid: url.gid,
                    num: quant,
                    uname: uname
                }
                if (uname) {
                    //已经登录
                    funlist.toCar(obj);
                } else {
                    funlist.toCarTour(obj);
                }
                location.href = 'shoppingCar.html';
            });

            $('#goodcard .tocar2').click(() => {//加入购物车
                let uname = cookieObj.getCookie('name');
                let quant = $('#main .quant').val();
                let obj = {
                    gid: url.gid,
                    num: quant,
                    uname: uname
                }
                if (uname) {
                    //已经登录
                    funlist.toCar(obj);
                } else {
                    funlist.toCarTour(obj);
                }
                location.href = 'shoppingCar.html';
            });
        });

        //面向对象
        let funlist = {
            setzuji: function () {
                let username = cookieObj.getCookie('name');
                let str = localStorage.gid;
                if (str) {
                    let arr = str.split('&').reverse();
                    // console.log(arr);
                    $(arr).each((index, item) => {
                        let inse = new Promise(resolve => {
                            $.ajax({
                                type: 'get',
                                url: '../api/zuji.php',
                                data: {
                                    type: 'set',
                                    num: item,
                                    name: username
                                },
                                success: str => {
                                    resolve(str);
                                }
                            });
                        });
                        inse.then(function (str) {
                            if (str != 'yes') {
                                alert('插入失败');
                            } else {
                                localStorage.removeItem('gid');
                                funlist.xuanzuji();
                            }
                        });
                    });
                } else {
                    funlist.xuanzuji();
                }
            },
            xuanzuji: function () {
                let username = cookieObj.getCookie('name');
                let use = new Promise(resolve => {
                    $.ajax({
                        type: 'get',
                        url: '../api/zuji.php',
                        data: {
                            type: 'get',
                            name: username
                        },
                        success: str1 => {
                            let arr1 = JSON.parse(str1);
                            arr1 = arr1.reverse();
                            resolve(arr1);
                        }
                    });
                });
                use.then(function (arr1) {
                    if (arr1.length > 8) {
                        arr1 = arr1.slice(0, 8);
                    }
                    let html = '<dt><b></b>足迹<b></b></dt>';
                    html += arr1.map((item, index) => {
                        return `<dd data-gid = ${item.gid}>
                                    <img src="${item.img}" alt="">
                                    <p>${item.name}</p>
                                    <p>￥${item.price}</p>
                                </dd>`;
                    }).join('');
                    $('#main .zuji').html(html);
                });
            },
            changquan: function (num1, pri) {
                if (num1 < 1) {
                    num1 = 1;
                    $('#main .disquan').css('cursor', 'not-allowed');
                    $('#main .disquan').addClass('nobtn');
                } else {
                    $('#main .disquan').css('cursor', 'pointer');
                    $('#main .disquan').removeClass('nobtn');
                }
                if (num1 > 200) {
                    num1 = 200;
                    $('#main .addquan').css('cursor', 'not-allowed');
                    $('#main .addquan').addClass('nobtn');
                } else {
                    $('#main .addquan').css('cursor', 'pointer');
                    $('#main .addquan').removeClass('nobtn');
                }
                $('#main .quant').val(num1);
                let enmon = (num1 * pri).toFixed(2);
                $('#main .total').html(enmon);
            },
            toCar: function (obj) {//加入购物车
                $.ajax({
                    type: 'post',
                    data: {
                        gid: obj.gid,
                        num: obj.num,
                        uname: obj.uname
                    },
                    url: '../api/tocar.php',
                    success: str => {
                        console.log(str);
                    }
                });
            },
            toCarTour: function (obj) {//未登录时的加入购物车
                let goodname = localStorage.goodname;
                let goodnum = localStorage.goodnum;
                let str1 = '';
                let str2 = '';
                let many = obj.num * 1;
                if (goodname) {
                    //已有一件以上的商品了
                    let arr1 = goodname.split('&');
                    let arr2 = goodnum.split('&');
                    arr1.forEach((item, index) => {
                        if (item == obj.gid) {
                            arr1.splice(index, 1);
                            many += arr2[index] * 1;
                            arr2.splice(index, 1);
                        }
                    });
                    arr1.push(obj.gid);
                    arr2.push(many);
                    str1 = arr1.join('&');
                    str2 = arr2.join('&');
                } else {
                    //没有商品
                    str1 = obj.gid;
                    str2 = many;
                }
                localStorage.goodname = str1;
                localStorage.goodnum = str2;
            }
        };

        funlist.setzuji();
        $('#main .zuji').on('click', 'dd', function () {
            let id = $(this).data('gid');
            console.log(id);
            window.open('xiangqing.html?gid=' + id);
            localStorage.gid = id;
            funlist.setzuji();
        });

        //吸顶
        window.onscroll = () => {
            let tall = window.scrollY;
            let lTop = $('#goodcard')[0].offsetTop;
            let lihe = $('#goodcard .list').css('height');
            if (tall >= lTop) {
                $('#goodcard .list').addClass('pos');
                $('#goodcard').css('paddingTop', lihe);
            } else {
                $('#goodcard .list').removeClass('pos');
                $('#goodcard').css('paddingTop', 0);
            }
        }

        //选项卡
        $('#goodcard .list').on('click', 'li:first', function () {
            $(this).addClass('active').siblings().removeClass('active');
            let index = $(this).index();
            $('#goodcard .con li').eq(index).css('display', 'block').siblings().css('display', 'none');
        }).on('click', 'li:nth-child(2)', function () {
            $(this).addClass('active').siblings().removeClass('active');
            let index = $(this).index();
            $('#goodcard .con li').eq(index).css('display', 'block').siblings().css('display', 'none');
        });

        let ih = window.innerHeight;
        $('#side .side_con').css('height', ih);
        let isok = true;
        $('#side').on('click', '.sidebox i', function () {
            if (isok) {
                $('#side').animate({ right: 0 }, 1000);
            } else {
                $('#side').animate({ right: -210 }, 1000);
            }
            isok = !isok;
        });
        $('#shut').click(() => {
            $('#side').animate({ right: -210 }, 1000);
            isok = true;
        });

        //改变小小购物车的小红点
        function redpot() {
            let jian = 0;
            $('.shopcar_sp .gpn').map((index, item) => {
                console.log($(item).text());
                return jian += $(item).text().split('x')[1] - 0;
            });
            $('.shopcar .gjian').html(jian);
            let totnum = 0;
            let totpri = 0;
            $('#head2 .gpn').each((index, item) => {
                // console.log(item);
                let goodArr = $(item).text().split('x');
                // console.log(goodArr);
                let goodmoney = goodArr[0].slice(1) - 0;
                let goodquantity = goodArr[1] * 1;
                totnum += goodquantity;
                totpri += goodquantity * goodmoney;
            });
            $('#head2 .fsl').html(totnum);
            $('#head2 .cjf').html(totpri.toFixed(2));
        }

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

        //小小购物车
        function sCar() {
            let uname = cookieObj.getCookie('name');
            if (uname) {
                let prom2 = new Promise(resolved => {
                    $.ajax({
                        type: 'get',
                        url: '../api/gwc.php',
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
                    arr.reverse();
                    console.log(arr);
                    let html = arr.map(item => {
                        return `<li data-gid="${item.gid}">
                                    <img src="${item.imgsrc}" alt="">
                                    <p>${item.gname}</p>
                                    <p>
                                        <span class="gpn">￥${item.price} x ${item.num}</span>
                                        <a href="###" class="delete">删除</a>
                                    </p>
                                </li>`;
                    }).join('');
                    $('#head2 .shopcar_sp').html(html);
                    redpot();
                    $('#head2 .shopcar_sp li img').css({
                        'height': 40,
                        'width': 40
                    });
                    $('#head2 .shopcar_sp').on('click', '.delete', function () {
                        let isdel = confirm('你的真不要我了啊？');
                        if (isdel) {
                            let goodId = $(this).parent().parent().data('gid');
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
                            $(this).parent().parent().remove();
                            redpot();
                        }
                    });
                });
            } else {
                var porm1 = new Promise(resolved => {
                    var arrr = [];
                    iGid.forEach(item => {
                        $.ajax({
                            type: 'get',
                            url: '../api/xq.php',
                            data: {
                                id: item
                            },
                            async: false,
                            success: str => {
                                let arrrr = JSON.parse(str);
                                arrr.push(arrrr[0]);
                                if (arrr.length == iGid.length) {
                                    resolved(arrr);
                                }
                            }
                        });
                    });
                });
                porm1.then(arr => {
                    arr.reverse();
                    console.log(arr);
                    let html = arr.map((item, index) => {
                        let goodnumber = iTeam.map(item2 => {
                            console.log(item2[0]);
                            if (item2[0] == item.idd) {
                                return item2[1];
                            }
                        }).join('');
                        return `<li data-gid="${item.idd}">
                                    <img src="${item.imgurl}" alt="">
                                    <p>${item.nnnnn}</p>
                                    <p>
                                        <span class="gpn">￥${item.price} x ${goodnumber}</span>
                                        <a href="###" class="delete">删除</a>
                                    </p>
                                </li>`;
                    }).join('');
                    $('#head2 .shopcar_sp').html(html);
                    redpot();
                    $('#head2 .shopcar_sp li img').css({
                        'height': 40,
                        'width': 40
                    });
                    $('#head2 .shopcar_sp').on('click', '.delete', function () {
                        let isdel = confirm('你的真不要我了啊？');
                        if (isdel) {
                            let goodId = $(this).parent().parent().data('gid');
                            iGid.forEach((item, index) => {
                                console.log(111)
                                if (goodId == item) {
                                    iGid.splice(index, 1);
                                    iGnum.splice(index, 1);
                                }
                            });
                            localStorage.goodname = iGid.join('&');
                            localStorage.goodnum = iGnum.join('&');
                            $(this).parent().parent().remove();
                            redpot();
                        }
                    });
                });
            }
        }
        sCar();
        $('#gogocar').click(() => {
            window.open('shoppingCar.html');
        });

        //改变侧栏购物车的总价和总数量
        function changsta() {
            let totnum = 0;
            let totpri = 0;
            $('#side .gpn').each((index, item) => {
                // console.log(item);
                let goodArr = $(item).text().split('x');
                // console.log(goodArr);
                let goodmoney = goodArr[0].slice(1) - 0;
                let goodquantity = goodArr[1] * 1;
                totnum += goodquantity;
                totpri += goodquantity * goodmoney;
            });
            $('#side .totnum').html(totnum);
            $('#side .totpri').html('￥' + totpri.toFixed(2));
        }

        //侧栏购物车
        function bCar() {
            let uname = cookieObj.getCookie('name');
            if (uname) {
                let prom2 = new Promise(resolved => {
                    $.ajax({
                        type: 'get',
                        url: '../api/gwc.php',
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
                    arr.reverse();
                    console.log(arr);
                    let html = `<p>
                                <span><b class="iconfont icon-gouwuchekong"></b>购物车</span>
                                <span id="shut">x</span>
                            </p>
                            <div class="side_foot">
                                <p>
                                    <span><b class="totnum">0</b>件商品</span>
                                    <span>共计:<br><b class="totpri">￥ 0.00</b></span>
                                </p>
                                <a href="###" class="gogocar">去购物车结算</a>
                            </div>
                            <ul>`;
                    html += arr.map(item => {
                        return `<li data-gid="${item.gid}">
                            <img src="${item.imgsrc}" alt="">
                            <section>
                                <p>${item.gname}</p>
                                <p>
                                    <span class="gpn">￥${item.price} x ${item.num}</span>
                                    <a href="###" class="delete">删除</a>
                                </p>
                            </section>
                        </li>`;
                    }).join('');
                    html += '</ul>';
                    $('#side .side_con').html(html);
                    changsta();
                    $('#side .side_con img').css({
                        'height': 40,
                        'width': 40
                    });
                    $('#shut').click(() => {
                        $('#side').animate({ right: -210 }, 1000);
                        isok = true;
                    });
                    $('#side .side_con').on('click', '.delete', function () {
                        let isdel = confirm('你的真不要我了啊？');
                        if (isdel) {
                            let goodId = $(this).parent().parent().parent().data('gid');
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
                            $(this).parent().parent().parent().remove();
                            changsta();
                        }
                    });
                    $('#side .gogocar').click(() => {
                        window.open('shoppingCar.html');
                        // location.reload();
                    });
                });
            } else {
                var porm1 = new Promise(resolved => {
                    var arrr = [];
                    iGid.forEach((item, index) => {
                        $.ajax({
                            type: 'get',
                            url: '../api/xq.php',
                            async: false,
                            data: {
                                id: item
                            },
                            success: str => {
                                let arrrr = JSON.parse(str);
                                arrr.push(arrrr[0]);
                                if (arrr.length == iGid.length) {
                                    resolved(arrr);
                                }
                            }
                        });
                    });
                });
                porm1.then(arr => {
                    arr.reverse();
                    console.log(arr);
                    let html = `<p>
                                <span><b class="iconfont icon-gouwuchekong"></b>购物车</span>
                                <span id="shut">x</span>
                            </p>
                            <div class="side_foot">
                                <p>
                                    <span><b class="totnum">0</b>件商品</span>
                                    <span>共计:<br><b class="totpri">￥ 0.00</b></span>
                                </p>
                                <a href="###" class="gogocar">去购物车结算</a>
                            </div>
                            <ul>`;
                    html += arr.map((item, index) => {
                        let goodnumber = iTeam.map(item2 => {
                            if (item2[0] == item.idd) {
                                return item2[1];
                            }
                        }).join('');
                        return `<li data-gid="${item.idd}">
                            <img src="${item.imgurl}" alt="">
                            <section>
                                <p>${item.nnnnn}</p>
                                <p>
                                    <span class="gpn">￥${item.price} x ${goodnumber}</span>
                                    <a href="###" class="delete">删除</a>
                                </p>
                            </section>
                        </li>`;
                    }).join('');
                    html += '</ul>';
                    $('#side .side_con').html(html);
                    changsta();
                    $('#side .side_con img').css({
                        'height': 40,
                        'width': 40
                    });
                    $('#shut').click(() => {
                        $('#side').animate({ right: -210 }, 1000);
                        isok = true;
                    });
                    $('#side .side_con').on('click', '.delete', function () {
                        let isdel = confirm('你的真不要我了啊？');
                        if (isdel) {
                            let goodId = $(this).parent().parent().parent().data('gid');
                            iGid.forEach((item, index) => {
                                console.log(111)
                                if (goodId == item) {
                                    iGid.splice(index, 1);
                                    iGnum.splice(index, 1);
                                }
                            });
                            localStorage.goodname = iGid.join('&');
                            localStorage.goodnum = iGnum.join('&');
                            $(this).parent().parent().parent().remove();
                            changsta();
                        }
                    });
                    $('#side .gogocar').click(() => {
                        window.open('shoppingCar.html');
                        // location.reload();
                    });
                });
            }
        }
        bCar();


    });
});