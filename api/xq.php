<?php
    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    //导入conn.php文件
    include 'conn.php';

    $id = isset($_GET['id']) ? $_GET['id']:'';

    //1、写查询语句
    $sql = 'SELECT * FROM data WHERE idd = '. $id;

    //2、执行语句
    $res = $conn->query($sql);

    //3、提取数据
    $data = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组，而且是这种形式[{},{},{}]
    // var_dump($data);

    //4、把数据转成字符串后发给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义

    //防止乱码
    $conn->set_charset('utf8');

    //最后一步，记得要关闭连接，防止资源浪费
    $res->close();
    $conn->close();
?>