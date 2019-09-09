<?php
    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    //导入conn.php文件
    include 'conn.php';

    $uname = isset($_POST['username']) ? $_POST['username']:'';
    $pasw = isset($_POST['password']) ? $_POST['password']:'';

    
    //1、写sql语句
    $sql2 = "INSERT INTO users (username,password) VALUES ('$uname','$pasw')";

    //2、执行sql语句
    $res2 = $conn->query($sql2);

    //3、给前端发回结果
    if ($res2) {
        echo '注册成功';
    } else {
        echo '注册失败';
    }
    

?>