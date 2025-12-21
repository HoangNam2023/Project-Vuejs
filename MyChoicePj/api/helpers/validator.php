<?php
function validate(array $rules, array $data)
{
  $errors = [];

  foreach ($rules as $field => $ruleset) {
    foreach ($ruleset as $rule) {

      if ($rule === "required" && empty(trim($data[$field] ?? ""))) {
        $errors[$field][] = "Bắt buộc";
      }

      if (str_starts_with($rule, "min:")) {
        $min = explode(":", $rule)[1];
        if (mb_strlen($data[$field] ?? "") < $min) {
          $errors[$field][] = "Tối thiểu $min ký tự";
        }
      }
    }
  }

  return $errors;
}