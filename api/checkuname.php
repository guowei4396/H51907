<?php
    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    //导入conn.php文件
    include 'conn.php';

    $uname = isset($_REQUEST['username']) ? $_REQUEST['username']:'';

    //1、写查询语句
    $sql = "SELECT username FROM users where username = '$uname'";

    //2、执行语句
    $res = $conn->query($sql);

    //3、提取数据(在这里不需要了，因为单单是看结果有无找到)
    // $data = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组，而且是这种形式[{},{},{}]
    // var_dump($data);

    // $arr = array();
    // for ($i = 0; $i < count($data); $i++) {
    //     $arr[] = $data[$i]['username'];
    // }
    // var_dump($arr);
    
    if($res->num_rows) {
        //存在：不给注册
        echo 'no';
    }else {
        echo 'yes';
    }


?>