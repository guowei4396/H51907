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
        $('#loginbtn').click(function () {
            let name = $('.uname').val().trim();
            let pass = $('.pass').val().trim();
            let aname = ['鑫鑫', '狗涛', '琳姐'];
            let apass = ['123456', '123456', '123456'];
            if (aname.indexOf(name) == -1) {
                alert('没有这个管理员!');
            } else {
                for (let i = 0; i < aname.length; i++) {
                    if (aname[i] == name) {
                        if (pass == apass[i]) {
                            fnlist.cookieObj.setCookie('admin', name, 7);
                            location.href = "management.html";
                            break;
                        } else {
                            alert('密码错误嗷！');
                            break;
                        }
                    }
                }
            }
        });
    });
});