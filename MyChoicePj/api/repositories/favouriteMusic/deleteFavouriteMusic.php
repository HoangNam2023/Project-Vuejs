<?php
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../validates/favouriteMusic.php";
require_once __DIR__ . "/../../helpers/response.php";

// Repository xóa thông tin FavouriteMusic
class DeleteFavouriteMusic
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
     * Xóa thông tin FavouriteMusic
     */
    public function delete()
    {
        try {
            $id = isset($_GET['id']) ? $_GET['id'] : "";
            if (!is_numeric($id)) {
                responseError("Mã id bài hát không hợp lệ");
            }
            $sql = "DELETE FROM songs WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$id]);
            if ($stmt->rowCount() == 0) {
                responseError("Bài hát không tồn tại");
            }
            responseSuccess("Xóa bài hát thành công");
        } catch (PDOException $e) {
            responseError($e->getMessage());
        }
    }
}
