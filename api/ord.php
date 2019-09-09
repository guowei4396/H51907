<?php
    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    //导入conn.php文件
    include 'conn.php';

    $ord = isset($_GET['ord']) ? $_GET['ord']:'';
    $min = isset($_GET['min']) ? $_GET['min']:'';
    $max = isset($_GET['max']) ? $_GET['max']:'';
    $mh = isset($_GET['mh']) ? $_GET['mh']:'';
    $comm = isset($_GET['comm']) ? $_GET['comm']:'';
    $page = isset($_GET['page']) ? $_GET['page']:'';
    $n = isset($_GET['n']) ? $_GET['n']:'';
    $index = ($page - 1) * $n;

    //1、写查询语句
    if ($ord) {
        if ($ord && $min && $max && $mh) {
            $sql = "SELECT * FROM data WHERE price BETWEEN $min AND $max and nnnnn LIKE '%$mh%' ORDER BY price $ord LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN $min AND $max and nnnnn LIKE '%$mh%' ORDER BY price $ord";
        }else if ($ord && $min && $mh) {
            $sql = "SELECT * FROM data WHERE price > $min and nnnnn LIKE '%$mh%' ORDER BY price $ord LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price > $min and nnnnn LIKE '%$mh%' ORDER BY price $ord";
        }else if ($ord && $max && $mh) {
            $sql = "SELECT * FROM data WHERE price BETWEEN 0 AND $max and nnnnn LIKE '%$mh%' ORDER BY price $ord LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN 0 AND $max and nnnnn LIKE '%$mh%' ORDER BY price $ord";
        }else if ($ord && $min && $max) {
            $sql = "SELECT * FROM data WHERE price BETWEEN $min AND $max ORDER BY price $ord LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN $min AND $max ORDER BY price $ord";
        }else if ($ord && $min) { 
            $sql = "SELECT * FROM data WHERE price > $min ORDER BY price $ord LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price > $min ORDER BY price $ord";
        }else if ($ord && $max) { 
            $sql = "SELECT * FROM data WHERE price BETWEEN 0 AND $max ORDER BY price $ord LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN 0 AND $max ORDER BY price $ord";
        }else if ($ord && $mh) { 
            $sql = "SELECT * FROM data WHERE nnnnn LIKE '%$mh%' ORDER BY price $ord LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE nnnnn LIKE '%$mh%' ORDER BY price $ord";
        }else {
            $sql = "SELECT * FROM data ORDER BY price $ord LIMIT $index,$n";
            $sql2 = "SELECT * FROM data ORDER BY price $ord";
        }
    } else if ($comm) {
        if ($comm && $min && $max && $mh) {
            $sql = "SELECT * FROM data WHERE price BETWEEN $min AND $max and nnnnn LIKE '%$mh%' ORDER BY $comm desc LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN $min AND $max and nnnnn LIKE '%$mh%' ORDER BY $comm desc";
        }else if ($comm && $min && $mh) {
            $sql = "SELECT * FROM data WHERE price > $min and nnnnn LIKE '%$mh%' ORDER BY $comm desc LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price > $min and nnnnn LIKE '%$mh%' ORDER BY $comm desc";
        }else if ($comm && $max && $mh) {
            $sql = "SELECT * FROM data WHERE price BETWEEN 0 AND $max and nnnnn LIKE '%$mh%' ORDER BY $comm desc LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN 0 AND $max and nnnnn LIKE '%$mh%' ORDER BY $comm desc";
        }else if ($comm && $min && $max) {
            $sql = "SELECT * FROM data WHERE price BETWEEN $min AND $max ORDER BY $comm desc LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN $min AND $max ORDER BY $comm desc";
        }else if ($comm && $min) { 
            $sql = "SELECT * FROM data WHERE price > $min ORDER BY $comm desc LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price > $min ORDER BY $comm desc";
        }else if ($comm && $max) { 
            $sql = "SELECT * FROM data WHERE price BETWEEN 0 AND $max ORDER BY $comm desc LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN 0 AND $max ORDER BY $comm desc";
        }else if ($comm && $mh) { 
            $sql = "SELECT * FROM data WHERE nnnnn LIKE '%$mh%' ORDER BY $comm desc LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE nnnnn LIKE '%$mh%' ORDER BY $comm desc";
        }else {
            $sql = "SELECT * FROM data ORDER BY $comm desc LIMIT $index,$n";
            $sql2 = "SELECT * FROM data ORDER BY $comm desc";
        }
    }else {
        if ($min && $max && $mh) { 
            $sql = "SELECT * FROM data WHERE price BETWEEN $min AND $max and nnnnn LIKE '%$mh%' LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN $min AND $max and nnnnn LIKE '%$mh%'";
        }else if ($min && $max) { 
            $sql = "SELECT * FROM data WHERE price BETWEEN $min AND $max LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN $min AND $max";
        }else if ($min && $mh) { 
            $sql = "SELECT * FROM data WHERE price > $min and nnnnn LIKE '%$mh%' LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price > $min and nnnnn LIKE '%$mh%'";
        }else if ($max && $mh) { 
            $sql = "SELECT * FROM data WHERE price BETWEEN 0 AND $max and nnnnn LIKE '%$mh%' LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN 0 AND $max and nnnnn LIKE '%$mh%'";
        }else if ($min) { 
            $sql = "SELECT * FROM data WHERE price > $min LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price > $min";
        }else if ($max) { 
            $sql = "SELECT * FROM data WHERE price BETWEEN 0 AND $max LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE price BETWEEN 0 AND $max";
        }else if ($mh) { 
            $sql = "SELECT * FROM data WHERE nnnnn LIKE '%$mh%' LIMIT $index,$n";
            $sql2 = "SELECT * FROM data WHERE nnnnn LIKE '%$mh%'";
        }else {
            $sql = "SELECT * FROM data LIMIT $index,$n";
            $sql2 = "SELECT * FROM data";
        }
    }


    //2、执行语句
    $res = $conn->query($sql);
    $res2 = $conn->query($sql2);

    //3、提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组，而且是这种形式[{},{},{}]
    // var_dump($data);

    $data = array(
        'tot' => $res2->num_rows,
        'data' => $arr,
        'page' => $page,
        'num' => $n
    );

    //4、把数据转成字符串后发给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义

    //防止乱码
    $conn->set_charset('utf8');

    //最后一步，记得要关闭连接，防止资源浪费
    $res->close();
    $res2->close();
    $conn->close();
?>