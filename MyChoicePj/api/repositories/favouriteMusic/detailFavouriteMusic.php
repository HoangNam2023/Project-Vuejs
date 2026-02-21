<?php
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../validates/favouriteMusic.php";
require_once __DIR__ . "/../../helpers/response.php";

// Repository xử lý thu thập chi tiết danh sách yêu thích.
class DetailFavouriteMusic
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
     * Thu thập chi tiết thông tin FavouriteMusic
     * @param {array} $data
     */
    public function detail()
    {
        $id = isset($_GET['id']) ? $_GET['id'] : "";
        $sql = "SELECT * FROM songs WHERE id = ?";
        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$id]);
            $song = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$song) {
                responseError('Không tìm thấy bái hát');
            } else {
                responseDataSuccess($song);
            }
        } catch (PDOException $e) {
            responseError($e->getMessage());
        }
    }
}