<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/login/logout.php';

// Xử lý logout
$logout_action = new Logout();
$logout_action->logout();
