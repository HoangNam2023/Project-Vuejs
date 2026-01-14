<?php
/**
 * Phản hồi Data thành công
 * @param $data
 * @param $status
 */
function responseDataSuccess($data, int $status = 200)
{
  http_response_code($status);
  echo json_encode([
    'success' => true,
    'data'    => $data
  ]);
  exit;
}

/**
 * Phản hồi thành công
 * @param $data
 * @param $status
 */
function responseSuccess($success_msg, int $status = 200)
{
  http_response_code($status);
  echo json_encode([
    'success' => true,
    'message' => $success_msg
  ]);
  exit;
}

/**
 * Phản hồi lỗi
 * @param $error_msg
 * @param $status
 */
function responseError($error_msg, int $status = 400)
{
  http_response_code($status);
  echo json_encode([
    'success' => false,
    "message" => $error_msg
  ]);
  exit;
}