<?php
function responseSuccess($data, int $status = 200)
{
  http_response_code($status);
  echo json_encode([
    'success' => true,
    'data' => $data
  ]);
  exit;
}

function responseError($error_msg, int $status = 200)
{
  http_response_code($status);
  echo json_encode([
    'error' => false,
    "message" => $error_msg
  ]);
  exit;
}