<?php
    //第一步，设置参数（4个参数），建立连接
    $servername = 'localhost';
    $username = 'root';
    $password = 'root';
    $dbname = 'jdsx';

    //第二步，建立连接
    $conn = new mysqli($servername,$username,$password,$dbname);

    //第三步，判断是否成功
    //js调取属性和方法： arr.lenght  arr.push()
    //php调取属性和方法：$conn->属性名   $conn->方法名()
    if ($conn->connect_error) {
        //不为空，说明失败了
        die('连接失败' . $conn->connect_error);
    }
    
    // $conn->set_charset('utf8');

?>