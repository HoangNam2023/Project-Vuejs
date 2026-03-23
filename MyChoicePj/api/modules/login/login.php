<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/login/login.php';

// Xử lý login
$login_action = new Login();
$data = json_decode(file_get_contents("php://input"), true);
$login_action->login($data);
