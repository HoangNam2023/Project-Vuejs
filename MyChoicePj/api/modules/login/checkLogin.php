<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/login/checkLogin.php';

// Xử lý login
$check_login_action = new CheckLogin();
$check_login_action->check_login();
