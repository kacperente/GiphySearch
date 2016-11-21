<?php
    header('Content-Type: application/json');
    require_once './config.php';
    require_once 'DB.php';

    DB::init();
    $gif_id=(isset($_POST['gif_id']))?$_POST['gif_id']:null;
    $res=DB::select('SELECT likes,dislikes FROM gifs WHERE gif_id=?',array($gif_id));
    echo json_encode($res);

