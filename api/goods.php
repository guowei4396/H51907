<?php

    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    $conn = new mysqli('localhost','root','root','jdsx');

    $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid']: '';
    $gname = isset($_REQUEST['gname']) ? $_REQUEST['gname']: '';
    $shop = isset($_REQUEST['shop']) ? $_REQUEST['shop']: '';
    $price = isset($_REQUEST['price']) ? $_REQUEST['price']: '';
    $com = isset($_REQUEST['com']) ? $_REQUEST['com']: '';
    $rev = isset($_REQUEST['rev']) ? $_REQUEST['rev']: '';
    $type = isset($_REQUEST['type']) ? $_REQUEST['type']: '';
    $page = isset($_GET['page']) ? $_GET['page']:'';
    $n = isset($_GET['n']) ? $_GET['n']:'';
    $index = ($page - 1) * $n;

    
    if ($type == 'data') {
        //1、写sql语句
        $sql = "SELECT * FROM data limit $index,$n";
        $sql1 = "SELECT * FROM data";

        //2、执行sql语句
        $res = $conn->query($sql);
        $res1 = $conn->query($sql1);

        //3、提取结果集
        $arr = $res->fetch_all(MYSQLI_ASSOC);
        $data = array(
            'tot' => $res1->num_rows,
            'data' => $arr,
            'page' => $page,
            'num' => $n
        );    
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    } else if ($type == 'change') {
        //1、写sql语句
        $sql = "UPDATE data SET shopname = '$shop',nnnnn = '$gname',comment = $com,review = '$rev',price = $price WHERE idd = $gid";
        
        //2、执行sql语句
        $res = $conn->query($sql);

        $sql2 = "UPDATE gwcar SET shop = '$shop',gname = '$gname',price = $price WHERE gid = '$gid'";
        $res2 = $conn->query($sql2);

        if ($res) {
            echo 'yes';
        } else {
            echo 'no';
        }
    } else if ($type == 'delete') {
        //1、写sql语句
        $sql = "DELETE FROM data WHERE idd = $gid";
        $sql1 = "DELETE FROM gwcar WHERE gid = $gid";

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