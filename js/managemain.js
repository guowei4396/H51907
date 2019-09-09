require.config({
    'paths': {//设置短路径(方便后期使用):如果是以require所在文件夹为基础路径，后面的js文件不需要后缀，推荐这样写
        'jq': '../lib/jquery-1.10.1.min',//一般放在js文件夹外的js文件才需要配置短路径
        'wei': '../lib/weicommon'
    },
    'shim': {//设置依赖关系，idx就依赖于common
    }
});

require(['jq', 'wei'], function () {
    require(['myquery'], function (fnlist) {
        let admin = fnlist.cookieObj.getCookie('admin');
        $('#head .mname').html(admin);
        $('#side .subst').data('isok', true);
        $('#side').on('click', '.subst h2', function () {
            let hei = $(this).parent().find('dl dd').length * $('#side .subst dl dd').outerHeight(true);
            if ($(this).parent().data('isok') == true) {
                $(this).parent().data('isok', false).find('dl').animate({ 'height': hei }, 600);
                $(this).parent().siblings().data('isok', true).find('dl').animate({ 'height': 0 }, 600);
            } else {
                $(this).parent().data('isok', true).find('dl').animate({ 'height': 0 }, 600);
            }
        });

        $('#side .subst dl').on('click', 'dd', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().parent().siblings().find('dd').removeClass('active');
            if ($(this).text() == '修改用户信息') {
                $('#content').load('userinf.html', () => {
                    let prom = new Promise(resolved => {
                        $.ajax({
                            type: 'get',
                            url: '../api/user.php',
                            data: {
                                type: 'data'
                            },
                            success: str => {
                                let arr = JSON.parse(str);
                                resolved(arr);
                            }
                        });
                    });

                    prom.then(arr => {
                        // console.log(arr);
                        let html = arr.map(item => {
                            return `<tr>
                                        <td>${item.uid}</td>
                                        <td class="cont">${item.username}</td>
                                        <td class="cont">${item.password}</td>
                                        <td>
                                            <a href="###" class="del">删除</a>
                                            <a href="###" class="chan" data-istrue=true>修改</a>
                                        </td>
                                    </tr>`;
                        }).join('');
                        $('.userinf tbody').html(html);
                        $('.userinf tbody').on('click', '.chan', function () {
                            let istrue = $(this).data('istrue');
                            if (istrue) {
                                $('.userinf .cont').attr('contenteditable', true);
                            } else {
                                $('.userinf .cont').attr('contenteditable', false);
                                let uid = this.parentNode.parentNode.children[0].innerHTML;
                                let uname = this.parentNode.parentNode.children[1].innerHTML;
                                let upass = this.parentNode.parentNode.children[2].innerHTML;
                                // console.log(uid, uname, upass);
                                $.ajax({
                                    type: 'get',
                                    url: '../api/user.php',
                                    data: {
                                        type: 'change',
                                        uid: uid,
                                        uname: uname,
                                        upass: upass
                                    },
                                    success: str => {
                                        // console.log(str);
                                        if (str == 'yes') {
                                            alert('修改成功~');
                                        } else {
                                            alert('修改失败~');
                                        }
                                    }
                                });
                            }
                            $(this).data('istrue', !istrue);
                        });
                        $('.userinf tbody').on('click', '.del', function () {
                            let uid = this.parentNode.parentNode.children[0].innerHTML;
                            let uname = this.parentNode.parentNode.children[1].innerHTML;
                            $.ajax({
                                type: 'get',
                                url: '../api/user.php',
                                data: {
                                    type: 'delete',
                                    uid: uid,
                                    uname: uname
                                },
                                success: str => {
                                    // console.log(str);
                                    if (str == 'yes') {
                                        alert('删除成功~');
                                        $(this).parent().parent().remove();
                                    } else {
                                        alert('删除失败~');
                                    }
                                }
                            });
                        });
                    });
                });
            } else if ($(this).text() == '添加新用户') {
                $('#content').load('newuser.html', () => {
                    $('#uname').on('blur', function () {
                        let tex = $('#uname').val().trim();
                        if (tex) {//非空
                            let reg = /^\w{3,16}$/;//3到16位数字、字母、下划线组合
                            if (reg.test(tex)) {
                                $.ajax({
                                    type: 'get',
                                    data: {
                                        username: tex
                                    },
                                    url: '../api/checkuname.php',
                                    success: str => {
                                        // let arr = JSON.parse(str);
                                        // console.log(str);
                                        if (str.toLowerCase() == 'yes') {
                                            $('#uname').next().html('可以注册');
                                            $('#uname').next().css('color', '#58bc58');
                                            $('#uname').data('istrue', true);
                                        } else if (str.toLowerCase() == 'no') {
                                            $('#uname').next().html('注册个锤子注册');
                                            $('#uname').next().css('color', 'red');
                                            $('#uname').data('istrue', false);
                                        }
                                    }
                                });
                            } else {
                                $('#uname').next().html('注册个锤子注册');
                                $('#uname').next().css('color', 'red');
                                $('#uname').data('istrue', false);
                            }
                        } else {
                            $('#uname').next().html('请不要输入空格');
                            $('#uname').next().css('color', 'red');
                            $('#uname').data('istrue', false);
                        }
                    });
                    $('#upass').on('blur', function () {
                        let tex = $('#upass').val().trim();
                        if (tex) {//非空
                            let reg = /^\w{3,16}$/;//3到16位数字、字母、下划线组合
                            if (reg.test(tex)) {
                                $('#upass').next().html('符合要求');
                                $('#upass').next().css('color', '#58bc58');
                                $('#upass').data('istrue', true);
                            } else {
                                $('#upass').next().html('密码不合法');
                                $('#upass').next().css('color', 'red');
                                $('#upass').data('istrue', false);
                            }
                        } else {
                            $('#upass').next().html('请不要输入空格');
                            $('#upass').next().css('color', 'red');
                            $('#upass').data('istrue', false);
                        }
                    });
                    $('#new').click(() => {
                        let uname = $('#uname').val().trim();
                        let password = $('#upass').val().trim();
                        if ($('#uname').data('istrue')) {
                            $.ajax({
                                type: 'post',
                                data: {
                                    username: uname,
                                    password: password
                                },
                                url: '../api/enroll.php',
                                success: str => {
                                    // console.log(str);
                                    if (str == '注册成功') {
                                        alert('添加用户成功');
                                        // location.href = 'login.html?' + n;
                                    }
                                }
                            });
                        }
                    });
                });
            } else if ($(this).text() == '修改商品信息') {
                $('#content').load('goodinf.html', () => {
                    let page = 1;
                    function getgood(page) {
                        let prom = new Promise(resolved => {
                            $.ajax({
                                type: 'get',
                                url: '../api/goods.php',
                                async: false,
                                data: {
                                    type: 'data',
                                    n: 8,
                                    page: page
                                },
                                success: str => {
                                    let arr = JSON.parse(str);
                                    resolved(arr);
                                }
                            });
                        });

                        prom.then(arr => {
                            console.log(arr);
                            let html = arr.data.map(item => {
                                return `<tr>
                                            <td>${item.idd}</td>
                                            <td class="cont">${item.nnnnn}</td>
                                            <td class="cont">${item.shopname}</td>
                                            <td class="cont">${item.price}</td>
                                            <td class="cont">${item.comment}</td>
                                            <td>
                                                <a href="###" class="del">删除</a>
                                                <a href="###" class="chan" data-istrue=true>修改</a>
                                            </td>
                                        </tr>`;
                            }).join('');
                            // console.log(html);
                            $('.goodinf tbody').html(html);

                            let totPage = Math.ceil(arr.tot / arr.num);
                            if (totPage <= 1) {
                                let ye = `<li>1</li>`;
                                $('.goodinf .pages').html(ye);
                            } else {
                                let ye = '<p class="prev">上一页</p>';
                                if (arr.page < 5) {
                                    for (let i = 1; i <= 5; i++) {
                                        ye += `<li>${i}</li>`;
                                    }
                                    ye += `<i>...</i>
                                           <li>${totPage}</li>`;
                                } else if ((totPage - arr.page) >= 5) {
                                    for (let i = arr.page - 2; i <= arr.page * 1 + 2; i++) {
                                        ye += `<li>${i}</li>`;
                                    }
                                    ye += `<i>...</i>
                                           <li>${totPage}</li>`;
                                } else if ((totPage - arr.page) <= 5) {
                                    for (let i = totPage - 5; i <= totPage; i++) {
                                        ye += `<li>${i}</li>`;
                                    }
                                }
                                ye += '<p class="next">下一页</p>';
                                $('.goodinf .pages').html(ye);
                            }



                            $('.goodinf .pages li').each((index, item) => {
                                if (page == $(item).text()) {
                                    $(item).addClass('active').siblings().removeClass('active');
                                }
                            })
                        });
                    }
                    getgood(page);

                    $('.goodinf .pages').on('click', 'li', function () {
                        page = $(this).text() * 1;
                        getgood(page);
                    });

                    $('.goodinf .pages').on('click', '.prev', function () {
                        page--;
                        if (page < 1) {
                            page = 1;
                        }
                        getgood(page);
                    });

                    $('.goodinf .pages').on('click', '.next', function () {
                        page++;
                        console.log($('.goodinf .pages li:last').text());
                        if (page > $('.goodinf .pages li:last').text()) {
                            page = $('.goodinf .pages li:last').text();
                        }
                        getgood(page);
                    });

                    //修改商品信息
                    $('.goodinf tbody').on('click', '.chan', function () {
                        let istrue = $(this).data('istrue');
                        if (istrue) {
                            $('.goodinf .cont').attr('contenteditable', true);
                        } else {
                            $('.goodinf .cont').attr('contenteditable', false);
                            let gid = this.parentNode.parentNode.children[0].innerHTML;
                            let gname = this.parentNode.parentNode.children[1].innerHTML;
                            let shop = this.parentNode.parentNode.children[2].innerHTML;
                            let price = this.parentNode.parentNode.children[3].innerHTML;
                            let com = this.parentNode.parentNode.children[4].innerHTML;
                            let rev = '';
                            if ((com / 10000) < 1) {
                                rev = com + '条评价';
                            } else if ((com / 10000) >= 1) {
                                rev = Math.floor((com / 10000)) + '万+条评价';
                            }
                            // console.log(gid, gname, shop, price, com, rev);
                            $.ajax({
                                type: 'get',
                                url: '../api/goods.php',
                                data: {
                                    type: 'change',
                                    gid: gid,
                                    gname: gname,
                                    shop: shop,
                                    price: price,
                                    com: com,
                                    rev: rev
                                },
                                success: str => {
                                    // console.log(str);
                                    if (str == 'yes') {
                                        alert('修改成功~');
                                    } else {
                                        alert('修改失败~');
                                    }
                                }
                            });
                        }
                        $(this).data('istrue', !istrue);
                    });

                    //删除商品
                    $('.goodinf tbody').on('click', '.del', function () {
                        let gid = this.parentNode.parentNode.children[0].innerHTML;
                        $.ajax({
                            type: 'get',
                            url: '../api/goods.php',
                            data: {
                                type: 'delete',
                                gid: gid
                            },
                            success: str => {
                                // console.log(str);
                                if (str == 'yes') {
                                    alert('删除成功~');
                                    $(this).parent().parent().remove();
                                } else {
                                    alert('删除失败~');
                                }
                            }
                        });
                    });
                });
            }
        });

        $('#quit').click(() => {
            fnlist.cookieObj.removeCookie('admin');
            location.href = 'manlogin.html';
        });
    });
});