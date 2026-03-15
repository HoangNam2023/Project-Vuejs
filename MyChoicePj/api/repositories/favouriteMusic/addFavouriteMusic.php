<?php
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../validates/favouriteMusic.php";
require_once __DIR__ . "/../../helpers/response.php";

// Repository xử lý thêm FavouriteMusic.
class AddFavouriteMusic
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
     * Thêm mới thông tin FavouriteMusic
     * @param {array} $data
     */
    public function add(array $data)
    {
        $now = date("Y-m-d H:i:s");
        $title = $data['title'] ?? '';
        $artist = $data['artist'] ?? '';
        $album = $data['album'] ?? '';
        $release_at = $data['release_at'] ?? null;
        $created_at = $now;
        $updated_at = $now;
        $errors = [];
        $errors = validateAddFavouriteMusic($data);
        if (!empty($errors)) {
            responseError($errors);
        }
        $sql = "INSERT INTO songs 
                (title, artist, album, release_at, created_at, updated_at)
                VALUES (:title, :artist, :album, :release_at, :created_at, :updated_at)";
        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':title'      => $title,
                ':artist'     => $artist,
                ':album'      => $album,
                ':release_at' => $release_at,
                ':created_at' => $created_at,
                ':updated_at' => $updated_at
            ]);
            responseSuccess("Thêm mới bài hát thành công");
        } catch (PDOException $e) {
            responseError($e->getMessage());
        }
    }
}
