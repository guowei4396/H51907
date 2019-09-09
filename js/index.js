$(function () {
    $('#head1').load('html/head.html', () => {
        let username = cookieObj.getCookie('name');
        if (username) {//登录咯
            let htmll = `<span>${username}</span>
                        <b class="vip"></b>
                        <i class="iconfont icon-iconfontplatformentrance-copy-copy
                            "></i>
                        <div class="nav1_con">
                            <div class="con_t">
                                <img src="img/no-img_mid_.jpg" alt="">
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
                localStorage.setItem('url', '../index.html');
                location.href = 'html/login.html?' + n;
            });
            $('#head1 .gotoreg').click(() => {
                localStorage.setItem('url', '../index.html');
                location.href = 'html/reg.html?' + n;
            });
        }

        $('#gohoutai').css('color', 'red');
        $('#gohoutai').parent().css('width', '120');
        $('#gohoutai').click(() => {
            location.href = 'html/manlogin.html';
        })
    });

    let arr = [
        [
            ['热销水果', '苹果', '葡萄/提子', '奇异果/猕猴桃', '橙子', '梨', '蓝莓', '柠檬', '百香果', '山楂', '人参果', '雪莲果', '更多', '西柚', '水果礼盒'],
            ['时令水果', '柚子', '冬枣', '车厘子/樱桃', '水蜜桃', '杏', '李子', '香瓜', '哈密瓜', '西瓜', '枇杷', '杨梅', '草莓', '橘柑', '石榴', '无花果', '柿子', '甘蔗', '金桔', '鲜槟榔'],
            ['热带鲜果', '芒果', '菠萝/凤梨', '榴莲', '香蕉', '百香果', '山竹', '木瓜', '释迦', '龙眼', '牛油果', '菠萝蜜', '椰子', '火龙果', '莲雾', '番石榴/芭乐', '龙宫果', '火参果', '杨桃', '红毛丹'],
            ['知名品牌', '佳沛', '都乐', '佳农', '怡颗莓', '宏辉果蔬', '新奇士', '爱奇果', '珍享', '展卉'],
            ['地标水果', '山东网纹瓜', '百色芒果', '洛川苹果', '新疆哈密瓜', '阿克苏苹果', '烟台红富士', '蒙自石榴', '沾化冬枣', '西峡猕猴桃', '美国车厘子', '台湾凤梨', '进口水果', '东北姑娘果', '琯溪蜜柚', '四川丑橘', '赣南脐橙'],
            ['新奇特', '红心猕猴桃', '丑苹果', '黄心西瓜', '蛇皮果', '鲜核桃', '软籽石榴', '秋月梨', '有机水果', '鲜果礼盒']
        ],
        [
            ['鱼类', '三文鱼', '鳕鱼', '带鱼', '黄鱼/黄花鱼', '金枪鱼', '巴沙鱼', '鲳鱼', '鲈鱼', '鳗鱼', '鲽鱼', '胖头鱼', '更多'],
            ['虾类', '红虾', '白虾', '虾仁', '北极甜虾', '黑虎虾', '大龙虾', '小龙虾', '竹节虾', '皮皮虾', '基围虾', '更多'],
            ['蟹类', '大闸蟹', '帝王蟹', '梭子蟹', '面包蟹/黄金蟹', '青蟹', '雪蟹', '珍宝蟹', '红毛蟹', '醉蟹', '香辣蟹', '更多'],
            ['贝类', '生蚝', '鲍鱼', '扇贝', '蛤/蚬子', '螺', '蛏子', '北极贝', '蚌', '贝柱', '更多'],
            ['海参', '即食海参', '淡干海参', '速发海参', '冻干海参', '蒸食海参', '盐渍海参', '调味海参', '辽参', '特级海参', '更多'],
            ['海产干货', '干贝', '墨鱼干', '鱿鱼干', '虾皮', '海带', '海蛎干', '花胶', '银鱼干', '蛤蜊干', '海参', '更多'],
            ['知名品牌', '大洋世家', '獐子岛', '禧美', '三都港', '晓芹', '海晏堂'],
            ['地标产品', '阿根廷红虾', '厄瓜多尔白虾', '舟山带鱼', '查干湖鱼', '丹东蚬子', '福建鲍鱼', '宁波醉泥螺', '阳澄湖大闸蟹'],
            ['特色海产', '海外直采', '活鲜', '鱿鱼', '墨鱼', '甲鱼', '章鱼', '笔管鱼', '鳄鱼肉', '娃娃鱼', '海鲜方便菜', '麻辣海鲜', '八爪鱼']
        ],
        [
            ['猪肉', '肋排', '猪蹄', '五花肉', '汤骨/棒骨', '猪肘', '梅花肉片', '猪排/猪扒', '里脊', '猪腿肉', '猪肉馅', '脊骨', '更多'],
            ['牛肉', '牛排', '牛腩', '牛腱子', '牛里脊', '牛肉片/卷', '牛尾', '牛肋条', '牛蹄筋', '牛肉串', '牛骨', '筋头巴脑', '更多'],
            ['羊肉', '羊肋排', '羊肉片/卷', '羊腿', '羊蝎子', '羊肉块', '羊肉串', '整羊', '羊杂', '西式羊排', '羊肉馅', '更多'],
            ['鸡肉', '鸡翅', '整鸡', '鸡胸肉', '鸡腿', '鸡爪', '鸡肉块', '鸡胗/鸡肫', '鸡柳', '鸡排', '柴鸡', '老母鸡', '大公鸡', '更多'],
            ['鸭肉', '鸭腿', '鸭胸', '鸭胗/鸭肫', '鸭掌', '鸭脖', '鸭舌', '鸭翅', '老鸭', '更多'],
            ['地标产品', '内蒙古牛羊肉', '宁夏羊肉', '北京油鸡', '台湾烤肠', '宣威火腿', '哈尔滨红肠'],
            ['知名品牌', '双汇', '泰森', '科尔沁', '蒙都', '精气神', '百年栗园', '恒都', '蒙羊'],
            ['安心工艺', '原切肉', '调理肉', '冷鲜肉', '冷藏熟食', '有机肉'],
            ['新奇特', '鹅肉', '鸽肉', '知了', '猴蚕', '蛹', '鹿肉', '火鸡', '年肉礼盒', '野鸡'],
            ['内脏类', '肝', '肺', '肠', '肚', '心', '腰子', '鞭宝', '更多']
        ],
        [
            ['面点', '手抓饼', '水饺', '云吞', '汤圆/元宵', '包子', '面条', '馒头', '年糕', '月饼', '烧麦', '肠粉', '更多'],
            ['方便速食', '方便菜', '方便主食', '即食卤味', '培根', '火腿', '薯条', '鸡米花', '鸡肉块', '鸡柳', '更多'],
            ['饮品甜品', '冰激凌', '饮料', '果汁', '酸奶', '鲜奶', '乳酸菌', '蛋糕', '更多'],
            ['火锅丸料', '牛肉丸', '鱼豆腐', '鱼丸', '火锅肠', '墨鱼丸', '火锅饺', '包心丸', '方便火锅', '低温火锅料', '更多'],
            ['烘焙食材', '奶酪', '黄油', '芝士', '淡奶油', '蛋挞', '披萨', '早餐面包'],
            ['知名品牌', '船歌渔水饺', '正大食品', '湾仔码头', '思念', '三全', '广州酒家利口福', '天福号', '哈根达斯'],
            ['烧烤季', '羊肉', '牛肉', '鸡肉', '猪肉', '鸽肉/蚕蛹', '海鲜', '蔬菜', '主食'],
            ['舌尖美食', '船歌鱼水饺', '东北酸菜', '串串香', '松茸', '石屏豆腐', '冬笋'],
            ['方便菜单', '鱼香肉丝', '宫保鸡丁', '佛跳墙', '红烧肉', '小南国', '湘鄂情', '新雅大厨', '福成鲜到家'],

        ],
        [
            ['叶菜类', '生菜', '菜心', '西兰花', '菠菜', '上海青/油菜', '芥蓝', '白菜甘蓝/卷心菜', '芹菜', '韭菜', '茼蒿', '香菜', '茴香', '芝麻菜', '更多'],
            ['根茎类', '山药', '萝卜', '地瓜/红薯', '土豆/洋芋', '芋头', '莲藕', '百合', '芦笋', '更多'],
            ['鲜菌菇', '香菇', '松茸', '鸡枞菌', '牛肝菌', '杏鲍菇', '木耳/银耳', '黑松露', '菌平菇', '更多'],
            ['茄果瓜类', '玉米', '黄瓜', '西红柿', '南瓜', '茄子', '四季豆', '苦瓜', '豇豆', '更多'],
            ['葱姜蒜椒', '葱', '姜', '蒜', '椒', '香料'],
            ['半加工菜', '泡菜', '豆制品', '沙拉菜', '酸菜', '方便火锅'],
            ['蛋类', '鸡蛋', '鸭蛋', '鸽子蛋', '鹅蛋', '鹌鹑蛋', '松花蛋/皮蛋', '喜蛋', '咸蛋', '咸蛋黄', '更多'],
            ['地标产品', '建水烧豆腐', '温县铁棍山药', '桥头地瓜板栗', '红薯六鳌红薯', '高邮咸鸭蛋', '白洋淀咸鸭蛋', '辛集烤鸭蛋', '霍山鲜百合', '兰州百合'],
            ['新奇特', '水培蔬菜', '富硒地瓜', '乌鸡蛋', '野鸡蛋', '鸡胚蛋', '香椿芽荠菜', '薄荷紫苏', '冰草山野菜', '有机蔬菜']
        ]
    ];

    $('#fegg').css('display', 'none');
    $('#cegg').click(() => {
        $('#fegg').fadeIn(111);
    });
    $('#fegg').click(() => {
        $('#fegg').fadeOut(111);
    });

    $('#banner .menu1').mouseover(function () {
        $('#banner .menu2').css('display', 'block');
    }).on('mouseover', 'li', function () {
        let index = $(this).index();
        // console.log(index);
        let html1 = arr[index].map(item1 => {
            let html2 = item1.map(item2 => {
                return `| <i>${item2}</i> `;
            }).join('');
            return `<dd>
                        <p>${item1[0]} ></p>
                        <p> ${html2} </p>
                    </dd>`;
        }).join('');
        // console.log(html1);
        $('#banner .menu2').html(html1);
    }).mouseout(() => {
        $('#banner .menu2').css('display', 'none');
    });

    lunbo3({
        ele: 'lunbo1',
        aImg: ["img/ban1.jpg", "img/ban2.jpg", "img/ban3.jpg", "img/ban4.jpg", "img/ban5.jpg"],
        iw: 800,
        ih: 400,
        time: 2
    });

    let arr2 = [
        {
            1: '精选礼盒',
            2: '送礼送健康，精选生鲜礼盒',
            3: 'img/jxlh.png'
        },
        {
            1: '火锅诱惑',
            2: '不出门吃火锅。叫上几个好友，加上好吃的食物，热热闹闹涮起来。',
            3: 'img/hgyh.png'
        },
        {
            1: '深夜食堂',
            2: '食物无时限，想吃就吃。大排档吃夜宵，侃大山，夜晚不再孤独。',
            3: 'img/syst.png'
        },
        {
            1: '进口美食',
            2: '足不出户吃遍全球美味，尽享品质生活 ',
            3: 'img/jkms.png'
        }
    ];
    let arr3 = [
        [
            {
                'img': 'img/exm1.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm2.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm3.png',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm4.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm5.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm6.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm7.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm8.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            }
        ],
        [
            {
                'img': 'img/exm2_1.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm2_2.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm2_3.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm2_4.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm2_5.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm2_6.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm2_7.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm2_8.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            }
        ],
        [
            {
                'img': 'img/exm3_1.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm3_2.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm3_3.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm3_4.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm3_5.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm3_6.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm3_7.png',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm3_8.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            }
        ],
        [
            {
                'img': 'img/exm4_1.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm4_2.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm4_3.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm4_4.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm4_5.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm4_6.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm4_7.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            },
            {
                'img': 'img/exm4_8.jpg',
                'name': '【8罐礼盒装】周公子麻辣小海鲜组合新鲜蛤蜊鲍',
                'pri': '¥238.00',
                'good': '好评率95%'
            }
        ]
    ];

    $('.main1_xxk .xxk_t').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        let index = $(this).index();
        let html1 = `<h3>${arr2[index][1]}</h3>
                     <i></i>
                     <p>${arr2[index][2]}</p>
                     <i></i>`;
        $('.xxk_con_left').html(html1);
        $('.xxk_con_left i:last').css('background-image', `url(${arr2[index][3]}`);
        let html2 = arr3[index].map(item => {
            return `<li>
                        <div>
                            <img src="${item.img}" alt="">
                            <p>${item.name}</p>
                        </div>
                        <p><span>${item.pri}</span><span>${item.good}</span></p>
                    </li>`;
        }).join('');
        $('.sma_lunbo').html(html2);
        let newli1 = $('.xxk_con_right .sma_lunbo li').eq(0).clone(true);
        let newli2 = $('.xxk_con_right .sma_lunbo li').eq(1).clone(true);
        let newli3 = $('.xxk_con_right .sma_lunbo li').eq(2).clone(true);
        let newli4 = $('.xxk_con_right .sma_lunbo li').eq(3).clone(true);
        // console.log(newli1);
        $('.xxk_con_right .sma_lunbo').append(newli1).append(newli2).append(newli3).append(newli4);
    });

    let num = 0;
    let iw = $('.xxk_con_right .sma_lunbo li').outerWidth();
    // console.log(iw);
    let newli1 = $('.xxk_con_right .sma_lunbo li').eq(0).clone(true);
    let newli2 = $('.xxk_con_right .sma_lunbo li').eq(1).clone(true);
    let newli3 = $('.xxk_con_right .sma_lunbo li').eq(2).clone(true);
    let newli4 = $('.xxk_con_right .sma_lunbo li').eq(3).clone(true);
    // console.log(newli1);
    $('.xxk_con_right .sma_lunbo').append(newli1).append(newli2).append(newli3).append(newli4);



    $('.xxk_con_right .next').click(() => {
        num += 4;
        if (num > $('.xxk_con_right .sma_lunbo li').length - 4) {
            num = 4;
            $('.xxk_con_right .sma_lunbo').css('left', 0);
        }
        $('.xxk_con_right .sma_lunbo').stop().animate({ 'left': -num * iw }, 1000, 'linear');
    })
    $('.xxk_con_right .prev').click(() => {
        num -= 4;
        if (num < 0) {
            let speeed = -iw * ($('.xxk_con_right .sma_lunbo li').length - 4);
            $('.xxk_con_right .sma_lunbo').css('left', speeed);
            num = $('.xxk_con_right .sma_lunbo li').length - 8;
        }
        $('.xxk_con_right .sma_lunbo').stop().animate({ 'left': -num * iw }, 1000, 'linear');
    })

    let num1 = 0;
    let bw = $('#lunbo2 .lunbo2_con li').outerWidth();
    let bm = $('#lunbo2 .lunbo2_con li').css('margin-right');
    let nli1 = $('#lunbo2 .lunbo2_con li').eq(0).clone(true);
    let nli2 = $('#lunbo2 .lunbo2_con li').eq(1).clone(true);
    let nli3 = $('#lunbo2 .lunbo2_con li').eq(2).clone(true);
    let speed = bm.slice(0, -2) * 1 + bw;
    $('#lunbo2 .lunbo2_con').append(nli1).append(nli2).append(nli3);


    function tab() {
        // console.log(num1);
        if (num1 == 3) {
            act = 1;
        } else if (num1 == 6) {
            act = 2;
        } else if (num1 == 9) {
            act = 0;
        }
        $('.canlook .dot dd').eq(act).addClass('active').siblings().removeClass('active');
    }


    $('#lunbo2 .next').click(() => {
        num1 += 3;
        if (num1 > $('.lunbo2_con  li').length - 3) {
            num1 = 3;
            $('.lunbo2_con').css('left', 0);
        }
        $('.lunbo2_con').stop().animate({ 'left': -num1 * speed }, 400);
        tab();
    });

    $('#lunbo2 .prev').click(() => {
        num1 -= 3;
        if (num1 < 0) {
            let n = -speed * ($('.lunbo2_con li').length - 3);
            $('.lunbo2_con').css('left', n);
            num1 = $('.lunbo2_con li').length - 6;
        }
        $('.lunbo2_con').stop().animate({ 'left': -num1 * speed }, 400);
        tab();
    });

    let timer = setInterval(() => {
        num1 += 3;
        if (num1 > $('.lunbo2_con  li').length - 3) {
            num1 = 3;
            $('.lunbo2_con').css('left', 0);
        }
        $('.lunbo2_con').stop().animate({ 'left': -num1 * speed }, 400);
        tab();
    }, 2000);

    $('#lunbo2').hover(() => {
        clearInterval(timer);
    }, () => {
        clearInterval(timer);
        timer = setInterval(() => {
            num1 += 3;
            if (num1 > $('.lunbo2_con  li').length - 3) {
                num1 = 3;
                $('.lunbo2_con').css('left', 0);
            }
            $('.lunbo2_con').stop().animate({ 'left': -num1 * speed }, 400);
            tab();
        }, 2000);
    });

    $('.canlook').on('click', '.dot dd', function () {
        let index = $(this).index();
        index *= 3;
        // console.log(index);
        $(this).addClass('active').siblings().removeClass('active');
        $('.lunbo2_con').stop().animate({ 'left': -index * speed }, 400);
        num1 = index;
    });

    $('#jump').css('display', 'none');

    $('#head2 .head2_foot').on('click', 'a', function () {
        let n = parseInt(Math.random() * 100);
        window.open('html/list.html?' + n);
    });

    $('#banner .menu1').on('click', 'i', function () {
        let n = parseInt(Math.random() * 100);
        window.open('html/list.html?' + n);
    });

    $('#banner .menu2').on('click', 'p', function () {
        let n = parseInt(Math.random() * 100);
        window.open('html/list.html?' + n);
    });

    window.onscroll = function () {
        let tall = window.scrollY;
        if (tall >= 800) {
            $('#jump').fadeIn(1000);
        } else {
            $('#jump').fadeOut(1000);
        }
        if (tall >= 1500 && tall <= 4530) {
            $('#jump li').eq(1).addClass('active').siblings().removeClass('active');
        } else if (tall <= 1500 && tall >= 830) {
            $('#jump li').eq(0).addClass('active').siblings().removeClass('active');
        } else if (tall >= 4540) {
            $('#jump li').eq(2).addClass('active').siblings().removeClass('active');
        }
    }


    let timer2 = null;
    $('#jump li').eq(0).click(() => {
        clearInterval(timer2);
        let tall = window.scrollY;
        let speed = 0;
        timer2 = setInterval(() => {
            speed += 30;
            let dis = tall - speed;
            window.scrollTo(0, dis);
            if (dis <= 840) {
                clearInterval(timer2);
            }
        }, 1);
    });
    $('#jump li').eq(1).click(() => {
        clearInterval(timer2);
        let tall = window.scrollY;
        let speed = 0;
        if (tall > 1520) {
            timer2 = setInterval(() => {
                speed += 30;
                let dis = tall - speed;
                window.scrollTo(0, dis);
                if (dis <= 1520) {
                    clearInterval(timer2);
                }
            }, 1);
        } else if (tall < 1520) {
            timer2 = setInterval(() => {
                speed += 30;
                let add = tall + speed;
                window.scrollTo(0, add);
                if (add >= 1520) {
                    clearInterval(timer2);
                }
            }, 1);
        }
    });
    $('#jump li').eq(2).click(() => {
        clearInterval(timer2);
        let tall = window.scrollY;
        let speed = 0;
        timer2 = setInterval(() => {
            speed += 30;
            let add = tall + speed;
            window.scrollTo(0, add);
            if (add >= 4540) {
                clearInterval(timer2);
            }
        }, 1);
    });

    $('#jump li').eq(5).click(() => {
        let speed = 800;
        let top = window.scrollY;
        let timer1 = setInterval(function () {
            speed -= 40;
            if (speed <= 0) {
                speed = 300;
            }
        }, 30);

        let timer2 = setInterval(function () {
            top -= speed;
            if (top <= 0) {
                clearInterval(timer1);
                clearInterval(timer2);
            }
            window.scrollTo(0, top);
        }, 30);
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
                    url: 'api/gwc.php',
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
                            <img src="${item.imgsrc.slice(1)}" alt="">
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
                            url: 'api/changcar.php',
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
                iGid.forEach((item, index) => {
                    $.ajax({
                        type: 'get',
                        url: 'api/xq.php',
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
                            <img src="${item.imgurl.slice(1)}" alt="">
                            <p>${item.nnnnn}</p>
                            <p>
                                <span class="gpn">￥${item.price} x ${goodnumber}</span>
                                <a href="###" class="delete">删除</a>
                            </p>
                        </li>`;
                }).join('');
                $('#head2 .shopcar_sp').html(html);
                iGnum.reverse();
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
        window.open('html/shoppingCar.html');
    });

});