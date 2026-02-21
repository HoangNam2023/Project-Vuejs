<?php
function validate(array $rules, array $data, array $title_item_mapping)
{
  $errors = [];

  foreach ($rules as $field => $ruleset) {
    $label = $title_item_mapping[$field] ?? $field;
    foreach ($ruleset as $rule) {
      if ($rule === "required" && empty(trim($data[$field] ?? ""))) {
        $errors[] = "$label bắt buộc";
      }
      if (str_starts_with($rule, "min:")) {
        $min = explode(":", $rule)[1];
        if (mb_strlen($data[$field] ?? "") < $min) {
          $errors[] = "$label tối thiểu $min ký tự";
        }
      }
      if ($rule === "year" && !empty(trim($data[$field] ?? ""))) {
          $currentYear = date('Y');
          if (!preg_match('/^\d{4}$/', $data[$field]) ||$data[$field] < 1900 || $data[$field] > $currentYear) {
              $errors[] = "$label phải là năm hợp lệ";
          }
      }
    }
  }

  return $errors;
}
