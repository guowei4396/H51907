<?php

    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    $conn = new mysqli('localhost','root','root','jdsx');

    $uname = isset($_REQUEST['uname']) ? $_REQUEST['uname']: '';
    $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid']: '';
    $type = isset($_REQUEST['type']) ? $_REQUEST['type']: '';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num']: '';
    $sta = isset($_REQUEST['sta']) ? $_REQUEST['sta']: '';

    if ($type == 'change') {
        //改变数量
        //1、写sql语句
        $sql1 = "UPDATE gwcar SET num = $num WHERE uname = '$uname' and gid = $gid";
        
        //2、执行sql语句
        $res1 = $conn->query($sql1);
    } else if ($type == 'del') {
        //1、写sql语句
        $sql1 = "DELETE FROM gwcar WHERE uname = '$uname' and gid = $gid";

        //2、执行sql语句
        $res1 = $conn->query($sql1);
    } else if ($type == 'status') {
        //1、写sql语句
        $sql1 = "UPDATE gwcar SET status = $sta WHERE uname = '$uname' and gid = $gid";

        //2、执行sql语句
        $res1 = $conn->query($sql1);
    }

    if ($res1) {
        echo 'success';
    } else {
        echo 'failure';
    }
    


?>