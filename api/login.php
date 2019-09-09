<?php
    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    //导入conn.php文件
    include 'conn.php';

    $uname = isset($_POST['username']) ? $_POST['username']:'';
    $pasw = isset($_POST['password']) ? $_POST['password']:'';

    //1、写sql语句
    $sql = "SELECT * FROM users where username = '$uname' and password = '$pasw'";

    //2、执行sql语句
    $res = $conn->query($sql);

    if ($res->num_rows) {
        echo '登录成功';
    } else {
        //1、写sql语句
        $sql2 = "SELECT * FROM users where username = '$uname'";

        //2、执行sql语句
        $res2 = $conn->query($sql2);

        if ($res2) {
            //有用户名，但是登录失败，说明密码错了
            echo "密码错啦!";
        } else {
            echo "用户不存在!";
        }
    }

    //3、提取数据(只要看res的num_rows是否大于等于1就好了)
    // $data = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组，而且是这种形式[{},{},{}]
    // var_dump($data);

    // $arr = array();//用户名数组
    // for ($i = 0; $i < count($data); $i++) {
    //     $arr[] = $data[$i]['username'];
    //     if ($uname == $data[$i]['username']) {
    //         if ($pasw == $data[$i]['password']) {
    //             echo '登录成功';
    //         } else {
    //             echo '密码错误';
    //         }
    //     } 
    // }
    // // var_dump($arr);


    // if (!in_array($uname,$arr)) {
    //     echo '用户不存在';
    // } 


?>