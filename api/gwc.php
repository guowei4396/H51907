<?php

    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    $conn = new mysqli('localhost','root','root','jdsx');

    $uname = isset($_REQUEST['uname']) ? $_REQUEST['uname']: '';
    
    //1、写sql语句
    $sql6 = "SELECT * FROM gwcar WHERE uname = '$uname'";

    //2、执行sql语句
    $res6 = $conn->query($sql6);

    //3、提取结果集
    $zdata = $res6->fetch_all(MYSQLI_ASSOC);
    echo json_encode($zdata,JSON_UNESCAPED_UNICODE);

?>