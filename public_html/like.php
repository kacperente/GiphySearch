<?php
header('Content-Type: application/json');
require_once './config.php';
require_once 'DB.php';
DB::init();
$gif_id=($_POST['gif_id']);

$res=DB::query('INSERT INTO gifs (gif_id, likes,dislikes) VALUES (?,1,0)
ON DUPLICATE KEY UPDATE likes = likes + 1;',array($gif_id));

$res=DB::select('SELECT likes FROM gifs WHERE gif_id=?',array($gif_id));

echo json_encode($res);

