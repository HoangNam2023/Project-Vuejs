<?php
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../validates/favouriteMusic.php";
require_once __DIR__ . "/../../helpers/response.php";

// Repository xử lý hiển thị danh sách FavouriteMusic
class IndexFavouriteMusic
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
     * Hiển thị danh sách FavouriteMusic
     */
    public function index()
    {
        $songs = $this->db
            ->query("SELECT * FROM songs order by id desc")
            ->fetchAll(PDO::FETCH_ASSOC);
        if (!$songs) {
            responseError('Không có dữ liệu bài hát');
        }
        return responseDataSuccess($songs);
    }
}
