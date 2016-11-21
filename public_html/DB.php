<?php
class DB
{
    private static $DBH;
    public static function init()
    {
        try {
            self::$DBH = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
        }
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function query($statement,$data)
    {
        $STH = self::$DBH->prepare($statement);
        $STH->execute($data);
    }

    public static function select($statement,$data)
    {
        $STH = self::$DBH->prepare($statement);
        $STH->execute($data);
        $STH->setFetchMode(PDO::FETCH_ASSOC);
        return $STH->fetchAll();
    }

    public static function destroy()
    {
        self::$DBH = null;
    }
}