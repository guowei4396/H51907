<?php

    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    $conn = new mysqli('localhost','root','root','jdsx');

    $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid']: '';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num']: '';
    $uname = isset($_REQUEST['uname']) ? $_REQUEST['uname']: '';

    //1、写sql语句
    $sql1 = "SELECT * FROM data WHERE idd = $gid";

    //2、执行sql语句
    $res1 = $conn->query($sql1);

    //3、提取结果集
    $data = $res1->fetch_all(MYSQLI_ASSOC);
    // echo json_encode($data,JSON_UNESCAPED_UNICODE);

    // 1、写sql语句
    $sql2 = "SELECT * FROM gwcar WHERE gid = $gid and uname = '$uname'";

    //2、执行sql语句
    $res2 = $conn->query($sql2);

    //3、提取结果集
    $ids = $res2->fetch_all(MYSQLI_ASSOC);
    // echo json_encode($ids,JSON_UNESCAPED_UNICODE);

    if ($res2->num_rows) {
        //购物车中已有
        //1、写sql语句
        $n = $ids[0]["num"] + $num;
        if ($n > 200) {
            $n = 200;
        }
        $sql3 = "UPDATE gwcar SET num = $n WHERE gid = $gid and uname = '$uname'";

        //2、执行sql语句
        $res3 = $conn->query($sql3);

        if ($res3) {
            echo 'yse';
        } else {
            echo 'no';
        }
        
    } else {
        //购物车中没有该商品
        $name = $data[0]["nnnnn"];
        $price = $data[0]["price"];
        $shop = $data[0]["shopname"];
        $imgsrc = $data[0]["imgurl"];
        $sql4 = "INSERT INTO gwcar (gid,gname,price,shop,num,uname,imgsrc) VALUES ($gid,'$name',$price,'$shop',$num,'$uname','$imgsrc')";

        //2、执行sql语句
        $res4 = $conn->query($sql4);

        if ($res4) {
            echo 'yse';
        } else {
            echo 'no';
        }


    }




?>