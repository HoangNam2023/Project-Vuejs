<?php
session_start();
session_destroy();
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../helpers/response.php";

// Repository xử lý logout
class Logout
{
    private $db;

    /**
     * Constructor
     * Khởi tạo đối tượng và gán kết nối CSDL PDO
     */
    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    /**
     * logout admin
     */
    public function logout()
    {
        echo json_encode([
            "success" => true
        ]);
    }
}
