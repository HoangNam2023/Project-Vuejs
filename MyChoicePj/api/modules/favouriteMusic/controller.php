<?php
require_once __DIR__ . "/../../config/database.php";
// require_once __DIR__ . "/../../helpers/validator.php";
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

  // public function add(array $data)
  // {
  //   $errors = validate([
  //     "title" => ["required", "min:3"]
  //   ], $data);

  //   if ($errors) {
  //     response(["errors" => $errors], 422);
  //   }

  //   $stmt = $this->db->prepare("INSERT INTO todos(title) VALUES (?)");
  //   $stmt->execute([$data["title"]]);

  //   return ["success" => true];
  // }

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
