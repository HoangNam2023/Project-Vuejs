<?php
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../validates/favouriteMusic.php";
require_once __DIR__ . "/../../helpers/response.php";

class FavouriteMusicController
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
   * Thu thập thông tin FavouriteMusic
   */
  public function index()
  {
    return $this->db
      ->query("SELECT * FROM songs")
      ->fetchAll(PDO::FETCH_ASSOC);
  }

public function add(array $data)
{
    $title        = $data['title'] ?? '';
    $artist       = $data['artist'] ?? '';
    $album        = $data['album'] ?? '';
    $release_year = $data['release_year'] ?? null;
    $created_at   = $data['created_at'] ?? date("Y-m-d H:i:s");
    $updated_at   = $data['updated_at'] ?? date("Y-m-d H:i:s");
    $errors = [];
    $errors = validateAddFavouriteMusic($data);
    if (!empty($errors)) {
         responseError($errors);
    }

    // if (empty($title)) {
    //     echo json_encode(['status' => false, 'message' => 'Title không được để trống']);
    //     exit;
    // }

    $sql = "INSERT INTO songs 
            (title, artist, album, release_year, created_at, updated_at)
            VALUES (:title, :artist, :album, :release_year, :created_at, :updated_at)";

    try {
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':title' => $title,
            ':artist' => $artist,
            ':album' => $album,
            ':release_year' => $release_year,
            ':created_at' => $created_at,
            ':updated_at' => $updated_at
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Thêm mới bài hát thành công',
        ]);
        exit; // quan trọng: kết thúc script
    } catch (PDOException $e) {
        echo json_encode([
            'status' => false,
            'message' => 'Lỗi DB: ' . $e->getMessage()
        ]);
        exit;
    }
}

public function update(array $data)
{
    $title        = $data['title'] ?? '';
    $artist       = $data['artist'] ?? '';
    $album        = $data['album'] ?? '';
    $release_year = $data['release_year'] ?? null;
    $created_at   = $data['created_at'] ?? date("Y-m-d H:i:s");
    $updated_at   = $data['updated_at'] ?? date("Y-m-d H:i:s");
    $id        = $data['id'] ?? '';
    $errors = [];
    $errors = validateUpdateFavouriteMusic($data);
    if (!empty($errors)) {
         responseError($errors);
    }

    $sql = "Update songs set title = :title , artist = :artist
, album = :album , release_year = :release_year , created_at = :created_at , updated_at = :updated_at
where id = :id";

    try {
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':title' => $title,
            ':artist' => $artist,
            ':album' => $album,
            ':release_year' => $release_year,
            ':created_at' => $created_at,
            ':updated_at' => $updated_at,
            ':id' =>$id
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Cập nhật bài hát thành công',
        ]);
        exit; // quan trọng: kết thúc script
    } catch (PDOException $e) {
        echo json_encode([
            'status' => false,
            'message' => 'Lỗi DB: ' . $e->getMessage()
        ]);
        exit;
    }
}



  /**
   * Xóa thông tin FavouriteMusic
   * @param {int} $id
   */
  public function delete($id)
  {
    if (!is_numeric($id)) {
      responseError("Xóa bài hát không thành công");
    }
    $stmt = $this->db->prepare("DELETE FROM songs WHERE id = ?");
    $stmt->execute([$id]);
    responseSuccess("Xóa bài hát thành công");
  }
}
