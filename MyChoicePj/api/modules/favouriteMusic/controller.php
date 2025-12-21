<?php

require_once __DIR__ . "/../../config/database.php";
// require_once __DIR__ . "/../../helpers/validator.php";
require_once __DIR__ . "/../../helpers/response.php";

class FavouriteMusicController
{
  private $db;

  public function __construct()
  {
    global $pdo;
    $this->db = $pdo;
  }

  public function index()
  {
    return $this->db
      ->query("SELECT * FROM songs")
      ->fetchAll(PDO::FETCH_ASSOC);
  }

  // public function store(array $data)
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

  // public function delete($id)
  // {
  //   if (!is_numeric($id)) {
  //     response(["error" => "ID không hợp lệ"], 400);
  //   }

  //   $stmt = $this->db->prepare("DELETE FROM todos WHERE id = ?");
  //   $stmt->execute([$id]);

  //   return ["success" => true];
  // }
}
