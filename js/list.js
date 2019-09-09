$(function () {
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
                localStorage.setItem('url', 'list.html');
                location.href = 'login.html?' + n;
            });
            $('#head1 .gotoreg').click(() => {
                localStorage.setItem('url', 'list.html');
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

    $('#selectbox').load('selectbox.html', () => {
        selectbox();
    });

    let arr1 = [
        {
            img: "../img_list/gg1.jpg",
            price: '￥288.00',
            name: '四川红心猕猴桃红心奇异果蒲江猕猴桃 新鲜水果',
            comment: '6万+'
        },
        {
            img: "../img_list/gg2.png",
            price: '￥188.00',
            name: '鼎端 洛川苹果陕西红富士20个 新鲜水果',
            comment: '0'
        },
        {
            img: "../img_list/gg3.jpg",
            price: '￥88.00',
            name: '【买5斤送5斤】栗品优宜昌伦晚脐橙夏橙带箱10斤装 23个左右 非血橙生鲜青皮桔子橙子',
            comment: '8888'
        },
        {
            img: "../img_list/gg4.jpg",
            price: '￥8.00',
            name: '星优选 沂蒙山黄金水蜜桃 黄桃黄毛桃新鲜水果',
            comment: '8000万+'
        }
    ];


    $('#main .list').on('click', '.search .btn', function () {
        page = 1;
        $(this).addClass('active').siblings().removeClass('active').parent().find('.btn1').removeClass('active1').removeClass('active2').parent().find('.btn2').removeClass('active3');
        changpage();
    });

    let n = 0;
    $('#main .list').on('click', '.search .btn1', function () {
        n++;
        page = 1;
        if (n % 2) {
            $(this).addClass('active1').removeClass('active2').parent().find('.btn').removeClass('active').parent().find('.btn2').removeClass('active3');
        } else {
            $(this).addClass('active2').removeClass('active1').parent().find('.btn').removeClass('active').parent().find('.btn2').removeClass('active3');
        }
        changpage();
    });

    $('#main .list').on('click', '.search .btn2', function () {
        $(this).addClass('active3').parent().find('.btn1').removeClass('active1').removeClass('active2').parent().find('.btn').removeClass('active');
        init();
    });

    $('.search .clearNum').click(() => {
        $('.search .min').val('');
        $('.search .max').val('');
    });

    let page = 1;
    function init() {//初始化
        page = 1;
        let min = $('.search .min').val();
        let max = $('.search .max').val();
        let mhu = $('.search .keyword').val();
        $.ajax({
            type: 'get',
            data: {
                min: min,
                max: max,
                mh: mhu,
                page: page,
                n: 44
            },
            url: '../api/ord.php',
            success: str => {
                let arr = JSON.parse(str);
                console.log(arr);
                //开始拼接数据进去html
                xuan(arr);
            }
        });
    }
    init();

    function xuan(arr) {//渲染数据哒
        let html2 = arr.data.map(function (item) {
            return `<li data-gid="${item.idd}">
                        <img src="${item.imgurl}" alt="">
                        <p class="price">￥${(item.price - 0).toFixed(2)}</p>
                        <div class="gname">${item.nnnnn}</div>
                        <p class="comment"><i>${item.review.slice(0, -3)}</i>条评论</p>
                        <div class="sname">
                            <span>${item.shopname}</span>
                            <i title="联系客服"></i>
                        </div>
                        <div class="sb">
                            <span class="fxg">放心购</span>
                            <span class="mj">满199-100</span>
                            <span class="bx">险</span>
                        </div>
                        <div>
                            <p class="gz">
                                <i></i>
                                <span>关注</span>
                            </p>
                            <p class="tocar">
                                <i></i>
                                <span>加入购物车</span>
                            </p>
                        </div>
                    </li>`;
        }).join('');
        //开始渲染，把html渲染到对应的节点里面
        $('#main .goods').html(html2);
        $('#main .gtot').html(arr.tot);
        $('#main .pag').html(arr.page);
        let totPage = Math.ceil(arr.tot / arr.num);
        $('#main .tot').html(totPage);
        if (arr.page <= 1) {
            $('.search .prev_pag').addClass('nopag');
        } else {
            $('.search .prev_pag').removeClass('nopag');
        }
        if (arr.page == totPage) {
            $('.search .next_pag').addClass('nopag');
        } else {
            $('.search .next_pag').removeClass('nopag');
        }
        let j = 0;
        if (arr.tot > arr.data.length) {
            j = Math.floor(arr.data.length / 8);
        } else {
            j = Math.floor(arr.tot / 8);
        }
        if (j < 1) {
            j = 1;
        }
        let html = '<dt><span>商品精选</span><span>广告</span></dt>';
        for (let i = 0; i < j; i++) {
            html += arr1.map(item => {
                return `<dd>
                            <img src="${item.img}" alt="">
                            <p>${item.price}</p>
                            <p>${item.price}</p>
                            <p>已有<i>${item.comment}</i>人评论</p>
                        </dd>`;
            }).join('');
        }
        html += `<img src="../img_list/gg5.jpg" alt=""></img>`;
        $('#main .guanggao').html(html);

        //跳转页面
        $('#main .goods').on('click', 'img', function () {
            let str = $(this).parent().data('gid');
            // console.log(str);
            window.open('xiangqing.html?gid=' + str);
            let zuji = localStorage.gid;
            if (zuji) {//已有足迹
                if (zuji.indexOf(str) == -1) {//没有重复的时候
                    localStorage.gid = zuji + '&' + str;
                } else {//有重复的时候要去重
                    let arr4 = zuji.split('&');
                    arr4.forEach((item, index) => {
                        if (item == str) {
                            arr4.splice(index, 1);
                        }
                    });
                    arr4.push(str);
                    localStorage.gid = arr4.join('&');
                }
            } else {//没有足迹
                localStorage.gid = str;
            }
        });

        $('#main .goods').on('click', '.gname', function () {
            let str = $(this).parent().data('gid');
            // console.log(str);
            window.open('xiangqing.html?gid=' + str);
            let zuji = localStorage.gid;
            if (zuji) {//已有足迹
                if (zuji.indexOf(str) == -1) {//没有重复的时候
                    localStorage.gid = zuji + '&' + str;
                } else {//有重复的时候要去重
                    let arr4 = zuji.split('&');
                    arr4.forEach((item, index) => {
                        if (item == str) {
                            arr4.splice(index, 1);
                        }
                    });
                    arr4.push(str);
                    localStorage.gid = arr4.join('&');
                }
            } else {//没有足迹
                localStorage.gid = str;
            }
        });

        //分页
        let ye = '';
        for (let i = 1; i <= totPage; i++) {
            ye += `<a href="###">${i}</a>`;
        }
        $('#pages').html(ye);
        $('#pages a').eq(page - 1).addClass('aactive').siblings().removeClass('aactive');

        //加入购物车按钮
        $('#main .goods').on('click', '.tocar', function () {
            let uname = cookieObj.getCookie('name');
            let ggid = $(this).parent().parent().data('gid');
            // console.log(uname, ggid);
            if (uname) {//登陆了
                $.ajax({
                    type: 'get',
                    url: '../api/tocar.php',
                    data: {
                        gid: ggid,
                        num: 1,
                        uname: uname
                    },
                    success: str => {
                        console.log(str);
                        // location.reload();
                    }
                });
            } else {//未登录
                let goodname = localStorage.goodname;
                let goodnum = localStorage.goodnum;
                let str1 = '';
                let str2 = '';
                var many = 1;
                if (goodname) {
                    //已有一件以上的商品了
                    let arr8 = goodname.split('&');
                    let arr9 = goodnum.split('&');
                    arr8.forEach((item, index) => {
                        if (item == ggid) {
                            arr8.splice(index, 1);
                            many += arr9[index] * 1;
                            arr9.splice(index, 1);
                        } else {
                            many = 1;
                        }
                    });
                    arr8.push(ggid);
                    arr9.push(many);
                    str1 = arr8.join('&');
                    str2 = arr9.join('&');
                } else {
                    //没有商品
                    str1 = ggid;
                    str2 = many;
                }
                localStorage.goodname = str1;
                localStorage.goodnum = str2;
                // location.reload();
            }

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
                        // $('#head2 .shopcar_sp').on('click', '.delete', function () {
                        //     let isdel = confirm('你的真不要我了啊？');
                        //     if (isdel) {
                        //         let goodId = $(this).parent().parent().data('gid');
                        //         $.ajax({
                        //             type: 'post',
                        //             url: '../api/changcar.php',
                        //             data: {
                        //                 uname: uname,
                        //                 type: 'del',
                        //                 gid: goodId
                        //             },
                        //             success: str => {
                        //                 console.log(str);
                        //             }
                        //         });
                        //         $(this).parent().parent().remove();
                        //         redpot();
                        //     }
                        // });
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
                        // $('#head2 .shopcar_sp').on('click', '.delete', function () {
                        //     var isdel = confirm('你的真不要我了啊？');
                        //     if (isdel) {
                        //         let goodId = $(this).parent().parent().data('gid');
                        //         iGid.forEach((item, index) => {
                        //             if (goodId == item) {
                        //                 iGid.splice(index, 1);
                        //                 iGnum.splice(index, 1);
                        //             }
                        //         });
                        //         localStorage.goodname = iGid.join('&');
                        //         localStorage.goodnum = iGnum.join('&');
                        //         $(this).parent().parent().remove();
                        //         redpot();
                        //     }
                        // });
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
                        // $('#side .side_con').on('click', '.delete', function () {
                        //     var isdel = confirm('你的真不要我了啊？');
                        //     if (isdel) {
                        //         let goodId = $(this).parent().parent().parent().data('gid');
                        //         $.ajax({
                        //             type: 'post',
                        //             url: '../api/changcar.php',
                        //             data: {
                        //                 uname: uname,
                        //                 type: 'del',
                        //                 gid: goodId
                        //             },
                        //             success: str => {
                        //                 console.log(str);
                        //             }
                        //         });
                        //         $(this).parent().parent().parent().remove();
                        //         changsta();
                        //     }
                        // });
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
                        $('#side').on('click', '#shut', function () {
                            $('#side').animate({ right: -210 }, 1000);
                            isok = true;
                        });
                        // $('#side .side_con').on('click', '.delete', function () {
                        //     var isdel = confirm('你的真不要我了啊？');
                        //     if (isdel) {
                        //         let goodId = $(this).parent().parent().parent().data('gid');
                        //         iGid.forEach((item, index) => {
                        //             console.log(111)
                        //             if (goodId == item) {
                        //                 iGid.splice(index, 1);
                        //                 iGnum.splice(index, 1);
                        //             }
                        //         });
                        //         localStorage.goodname = iGid.join('&');
                        //         localStorage.goodnum = iGnum.join('&');
                        //         $(this).parent().parent().parent().remove();
                        //         changsta();
                        //     }
                        // });
                        $('#side .gogocar').click(() => {
                            window.open('shoppingCar.html');
                            // location.reload();
                        });
                    });
                }
            }
            bCar();
        });

    }

    $('#pages').on('click', 'a', function () {
        page = $(this).html();
        changpage();
        $(this).addClass('aactive').siblings().removeClass('aactive');
        window.scrollTo(0, 186);
    });


    function changpage() {
        let ord = '';
        if (n % 2) {
            ord = 'asc';
        } else {
            ord = 'desc';
        }
        let min = $('.search .min').val() - 0;
        let max = $('.search .max').val() - 0;
        let mhu = $('.search .keyword').val();
        if (min && max) {
            if (min > max) {
                let num = min;
                min = max;
                max = num;
            }
        }
        if ($('.search .active').length > 0) {
            $.ajax({
                type: 'get',
                data: {
                    comm: 'comment',
                    min: min,
                    max: max,
                    mh: mhu,
                    page: page,
                    n: 44
                },
                url: '../api/ord.php',
                success: str => {
                    let arr = JSON.parse(str);
                    console.log(arr);
                    //开始拼接数据进去html
                    xuan(arr);
                }
            });
        } else if ($('.search .active1').length > 0 || $('.search .active2').length > 0) {
            $.ajax({
                type: 'get',
                data: {
                    ord: ord,
                    min: min,
                    max: max,
                    mh: mhu,
                    page: page,
                    n: 44
                },
                url: '../api/ord.php',
                success: str => {
                    let arr = JSON.parse(str);
                    console.log(arr);
                    //开始拼接数据进去html
                    xuan(arr);
                }
            });
        } else if ($('.search .active3').length > 0) {
            $.ajax({
                type: 'get',
                data: {
                    min: min,
                    max: max,
                    mh: mhu,
                    page: page,
                    n: 44
                },
                url: '../api/ord.php',
                success: str => {
                    let arr = JSON.parse(str);
                    console.log(arr);
                    //开始拼接数据进去html
                    xuan(arr);
                }
            });
        }

    }

    $('.search .prev_pag').click(() => {
        page--;
        if (page >= 1) {
            changpage();
        } else {
            page = 1;
        }
    });

    $('.search .next_pag').click(() => {
        page++;
        let total = $('#main .tot').html();
        if (page <= total) {
            changpage();
        } else {
            page = total;
        }
    });

    $('.search .search_btn').click(() => {
        changpage();
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
    $('#side').on('click', '#shut', function () {
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
                    var isdel = confirm('你的真不要我了啊？');
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
                    var isdel = confirm('你的真不要我了啊？');
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
                $('#side').on('click', '#shut', function () {
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