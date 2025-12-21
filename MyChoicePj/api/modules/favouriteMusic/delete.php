<?php
header("Content-Type: application/json");

require_once "controller.php";

$controller = new TodoController();
response($controller->delete($_GET["id"] ?? null));
