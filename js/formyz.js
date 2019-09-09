function formcheck(opt) {

    let defaultobj = {

    }

    Object.assign(defaultobj, opt);

    //找节点
    let box = document.getElementById(defaultobj.ele);
    let arr1 = defaultobj.arr1;
    let arr2 = defaultobj.arr2;

    let html = '';
    arr1.forEach(item => {
        html += `<li><label for="">${item}</label><input type="text"><span></span></li>`;
    });
    html += `<li>
                <p class="enroll">注册</p>
                <p class="reset">重置</p>
             </li>`;
    box.innerHTML = html;


    let inps = box.getElementsByTagName('input');
    let labs = box.getElementsByTagName('label');
    let spas = box.getElementsByTagName('span');
    let enroll = box.getElementsByClassName('enroll')[0];
    let ret = box.getElementsByClassName('reset')[0];

    for (let i of labs) {
        // console.log(i.innerHTML);
        if (i.innerHTML == '确认密码') {
            i.nextElementSibling.className = 'surepass';
            i.nextElementSibling.type = 'password';
        } else if (i.innerHTML == '密码') {
            i.nextElementSibling.className = 'pass';
            i.nextElementSibling.type = 'password';
        }
        if (i.innerHTML == '用户名') {
            i.nextElementSibling.className = 'uname';
        }
    }
    let pass = box.getElementsByClassName('pass')[0];
    let surepass = box.getElementsByClassName('surepass')[0];
    let uname = box.getElementsByClassName('uname')[0];
    // let isok = false;//开关

    //验证输入的信息是否正确
    for (let i = 0; i < arr1.length; i++) {
        if (inps[i].className == 'uname') {
            //判断是否有这个用户名
            uname.onblur = () => {
                let tex = uname.value.trim();
                if (tex) {//非空
                    let reg = /^\w{3,16}$/;//3到16位数字、字母、下划线组合
                    if (reg.test(tex)) {
                        ajax({
                            type: 'get',
                            data: {
                                username: tex
                            },
                            url: '../api/checkuname.php',
                            success: str => {
                                // let arr = JSON.parse(str);
                                // console.log(str);
                                if (str.toLowerCase() == 'yes') {
                                    spas[i].innerHTML = '可以注册';
                                    spas[i].style.color = '#58bc58';
                                    inps[i].istrue = true;
                                } else if (str.toLowerCase() == 'no') {
                                    spas[i].innerHTML = '注册个锤子注册';
                                    spas[i].style.color = 'red';
                                    inps[i].istrue = false;
                                }
                            }
                        });
                    } else {
                        spas[i].innerHTML = '注册个锤子注册';
                        spas[i].style.color = 'red';
                        inps[i].istrue = false;
                    }
                }
            }
        } else if (inps[i].className == 'surepass') {
            surepass.onblur = function () {
                if (inps[i].value) {
                    if (inps[i].value == pass.value) {
                        spas[i].innerHTML = '密码一致';
                        spas[i].style.color = '#58bc58';
                        inps[i].istrue = true;
                    } else {
                        spas[i].innerHTML = '密码不一致';
                        spas[i].style.color = 'red';
                        inps[i].istrue = false;
                    }
                } else {
                    spas[i].innerHTML = '密码不能为空';
                    spas[i].style.color = 'red';
                    inps[i].istrue = false;
                }
            }
        } else {
            checkInp(inps[i], arr2[i], spas[i], arr1[i]);
        }
    }

    //点击sub验证，全部都验证通过才提交
    enroll.onclick = function () {
        var isok = true;
        for (var i = 0; i < inps.length; i++) {
            if (!inps[i].istrue) {
                isok = false;
                break;
            }
        }
        if (isok) {
            let tex1 = uname.value.trim();
            let tex2 = pass.value.trim();
            let n = parseInt(Math.random() * 100);
            if (isok) {
                if (tex1 && tex2) {
                    ajax({
                        type: 'post',
                        data: {
                            username: tex1,
                            password: tex2
                        },
                        url: '../api/enroll.php',
                        success: str => {
                            // console.log(str);
                            alert(str);
                            if (str == '注册成功') {
                                location.href = 'login.html?' + n;
                            }
                        }
                    });
                }
            }

        } else {
            alert('请先完成验证嗷');
        }
    }

    //点击ret，重置页面
    ret.onclick = function () {
        location.reload();
    }
}