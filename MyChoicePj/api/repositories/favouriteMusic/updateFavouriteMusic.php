<?php
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../validates/favouriteMusic.php";
require_once __DIR__ . "/../../helpers/response.php";

// Repository xử lý cập nhật thông tin FavouriteMusic.
class UpdateFavouriteMusic
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
     * Cập nhật thông tin FavouriteMusic
     * @param {array} $data
     */
    public function update(array $data)
    {
        $now = date("Y-m-d H:i:s");
        $title = $data['title'] ?? '';
        $artist = $data['artist'] ?? '';
        $album = $data['album'] ?? '';
        $release_at = $data['release_at'] ?? null;
        $id = $data['id'] ?? '';
        $updated_at = $now;
        $errors = [];
        $errors = validateUpdateFavouriteMusic($data);
        if (!empty($errors)) {
            responseError($errors);
        }
        $sql = "Update songs set title = :title , artist = :artist
                , album = :album , release_at = :release_at, updated_at = :updated_at
                where id = :id";
        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':title'      => $title,
                ':artist'     => $artist,
                ':album'      => $album,
                ':release_at' => $release_at,
                ':updated_at' => $updated_at,
                ':id'         => $id
            ]);
            responseSuccess("Cập nhật bài hát thành công");
        } catch (PDOException $e) {
            responseError($e->getMessage());
        }
    }
}
