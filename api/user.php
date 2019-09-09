<?php

    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    $conn = new mysqli('localhost','root','root','jdsx');

    $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid']: '';
    $uname = isset($_REQUEST['uname']) ? $_REQUEST['uname']: '';
    $upass = isset($_REQUEST['upass']) ? $_REQUEST['upass']: '';
    $type = isset($_REQUEST['type']) ? $_REQUEST['type']: '';
    
    if ($type == 'data') {
        //1、写sql语句
        $sql = "SELECT * FROM users";

        //2、执行sql语句
        $res = $conn->query($sql);

        //3、提取结果集
        $data = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    } else if ($type == 'change') {
        //1、写sql语句
        $sql1 = "SELECT username FROM users WHERE uid = $uid";
        $sql = "UPDATE users SET password = '$upass',username = '$uname' WHERE uid = $uid";
        
        //2、执行sql语句
        $res1 = $conn->query($sql1);
        $res = $conn->query($sql);

        //3、提取结果集
        $name = $res1->fetch_all(MYSQLI_ASSOC);
        $ming = $name[0]['username'];
        // echo json_encode($name,JSON_UNESCAPED_UNICODE);


        $sql2 = "UPDATE gwcar SET uname = '$uname' WHERE uname = '$ming'";
        $res2 = $conn->query($sql2);

        if ($res) {
            echo 'yes';
        } else {
            echo 'no';
        }
    } else if ($type == 'delete') {
        //1、写sql语句
        $sql = "DELETE FROM users WHERE uid = $uid";
        $sql1 = "DELETE FROM gwcar WHERE uname = $uname";

        //2、执行sql语句
        $res = $conn->query($sql);
        $res1 = $conn->query($sql1);

        if ($res) {
            echo 'yes';
        } else {
            echo 'no';
        }
    }

    //防止乱码
    $conn->set_charset('utf8');

    //最后一步，记得要关闭连接，防止资源浪费
    // $res->close();
    $conn->close();
?>