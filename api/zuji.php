<?php
    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    //导入conn.php文件
    include 'conn.php';

    $type = isset($_REQUEST['type']) ? $_REQUEST['type']:'';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num']:'';
    $name = isset($_REQUEST['name']) ? $_REQUEST['name']:'test';

    if ($type == 'set') {//判断是存还是取
        //存
        //1、写查询语句
        $sql1 = "DELETE FROM zuji WHERE gid = $num and uname = '$name'";
        $sql2 = "INSERT INTO zuji (gid,uname) VALUES ($num,'$name')";

        //2、执行语句
        $res1 = $conn->query($sql1);
        $res2 = $conn->query($sql2);

        if ($res1 && $res2) {
            echo 'yes';
        }

    } else if ($type == 'get') {
        //取
        //1、写查询语句
        $sql1 = "SELECT gid FROM zuji WHERE uname = '$name'";

        //2、执行语句
        $res1 = $conn->query($sql1);

        //3、提取数据
        $data = $res1->fetch_all(MYSQLI_ASSOC);//得到一个数组，而且是这种形式[{},{},{}]
        // var_dump($data[0]['gid']);

        
        //1、写查询语句
        $data3 = array();
        for ($i = 0; $i < count($data); $i++) {
            $str = $data[$i]['gid'];

            $sql2 = "SELECT * FROM data WHERE idd = $str";

            //2、执行语句
            $res2 = $conn->query($sql2);

            //3、提取数据
            $data2 = $res2->fetch_all(MYSQLI_ASSOC);//得到一个数组，而且是这种形式[{},{},{}]
            // var_dump($data2);
            

            $data4 = array(
                'gid'=> $str,
                'name'=> $data2[0]['nnnnn'],
                'price'=> $data2[0]['price'],
                'img'=> $data2[0]['imgurl']
            );
            $data3[] = $data4;
             
        }
        //4、把数据转成字符串后发给前端
        echo json_encode($data3,JSON_UNESCAPED_UNICODE);//把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义
    }


    
    //防止乱码
    $conn->set_charset('utf8');

?>