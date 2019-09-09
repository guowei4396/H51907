require.config({
    'paths': {//设置短路径(方便后期使用):如果是以require所在文件夹为基础路径，后面的js文件不需要后缀，推荐这样写
        'jq': '../lib/jquery-1.10.1.min',//一般放在js文件夹外的js文件才需要配置短路径
        'wei': '../lib/weicommon'
    },
    'shim': {//设置依赖关系，idx就依赖于common
        'formyz': ['wei']
    }
});

require(['jq', 'wei', 'formyz'], function () {
    require(['myquery'], function (fnlist) {
        formcheck({
            ele: 'con',
            arr1: ['邮箱', '手机', '用户名', '密码', '确认密码'],
            arr2: ['email', 'tel', 'username', 'password', 'surepass']
        });

        $('#head .login').click(() => {
            location.href = 'login.html';
        });
    });
});