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
        $('#bod .login').click(() => {
            let tex1 = $('#bod .uname').val();
            let tex2 = $('#bod .pass').val();
            let oldN = fnlist.cookieObj.getCookie('name');
            let n = parseInt(Math.random() * 100);
            if (oldN) {
                //已登录
                alert('你登录过咯哦');
            }
            else {
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
                                fnlist.cookieObj.setCookie('name', tex1, 7);
                                let url = localStorage.getItem('url');
                                if (url) {
                                    //跳回到上一页
                                    location.href = url;
                                } else {
                                    location.href = '../index.html?' + n;
                                }
                            } else {
                                alert(str);
                            }
                        }
                    })
                }
            }
        });
    });
});