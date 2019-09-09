function lunbo3(opt) {

    /*
        1）设置ul宽度，达到水平排列的效果
        2）水平轮播效果
        3）移入移出，清除轮播效果
        4）添加分页效果
            * 点击分页切换
        5）无缝滚动
            * 把第一张复制到最后
            * 当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1

        6）添加前后按钮，实现上一张、下一张的效果


        公式：left = index*banner.clientWidth
    */
    let defaultobj = {
        iw: 810,
        ih: 320,
        time: 2
    }

    Object.assign(defaultobj, opt);//用的话事用defaultobj（默认参数）

    //找节点
    let ban = getid(defaultobj.ele);
    let html = '<ul>';
    for (let i = 0; i < defaultobj.aImg.length; i++) {
        html += `<li><img src="${defaultobj.aImg[i]}"></li>`;
    }
    html += '</ul>';
    ban.innerHTML = html;
    let newP = ban.children[0].children[0].cloneNode(true);
    ban.children[0].appendChild(newP);

    //创建小焦点
    let newD = document.createElement('div');
    newD.className = 'page';
    for (let i = 0; i < defaultobj.aImg.length; i++) {
        let newS = document.createElement('span');
        newS.innerHTML = i + 1;
        newD.appendChild(newS);
    }
    ban.appendChild(newD);
    let page = ban.getElementsByClassName('page')[0];
    let pSpan = page.getElementsByTagName('span');
    pSpan[0].className = 'active';

    //创建上下张按钮
    let btnPrev = document.createElement('span');
    let btnNext = document.createElement('span');
    btnPrev.className = 'btn-prev';
    btnPrev.innerHTML = '&lt;';
    btnNext.className = 'btn-next';
    btnNext.innerHTML = '&gt;';
    ban.appendChild(btnPrev);
    ban.appendChild(btnNext);

    let prev = ban.getElementsByClassName('btn-prev')[0];
    let next = ban.getElementsByClassName('btn-next')[0];

    //鼠标滑入让按钮出现
    ban.onmouseover = () => {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
    }
    ban.onmouseout = () => {
        prev.style.display = 'none';
        next.style.display = 'none';
        clearInterval(timer);
        timer = setInterval(nextP, time);
    }

    //轮播函数(核心代码)
    let time = defaultobj.time * 1000;
    let num = 0;
    let ci = 0;
    let ul = ban.getElementsByTagName('ul')[0];
    //改变宽度
    ban.style = `width:${defaultobj.iw}px;height:${defaultobj.ih}px;`;
    for (let i = 0; i < ul.children.length; i++) {
        ul.children[i].style = `width:${defaultobj.iw}px;height:${defaultobj.ih}px;`;
    }
    let iw = ul.children[0].offsetWidth;
    ul.style.width = ul.children.length * iw + 'px';//ul的宽度
    // console.log(iw);
    function tab() {
        if (num > ul.children.length - 1) {
            num = 1;
            ul.style.left = 0;
        }
        if (num < 0) {
            num = ul.children.length - 2;
            ul.style.left = -iw * (ul.children.length - 1) + 'px';
        }
        startMove(ul, { 'left': -(iw * num) });
        //让焦点跟着高亮
        ci = num;
        if (ci > ul.children.length - 2) {
            ci = 0;
        }
        delAll(pSpan);
        pSpan[ci].className = 'active';
    }
    //下一张
    function nextP() {
        num++;
        tab();
    }
    //上一张
    function prevP() {
        num--;
        tab();
    }
    let timer = setInterval(nextP, time);

    prev.onclick = () => {
        prevP();
    }

    next.onclick = () => {
        nextP();
    }

    //点击焦点切换大图
    for (let i = 0; i < pSpan.length; i++) {
        pSpan[i].onclick = () => {
            num = i;
            tab();
        }
    }
}