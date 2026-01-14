<?php
function validate(array $rules, array $data)
{
  $errors = [];
  $title_item_mapping = [
    "title"  => "Tên bài hát",
    "artist" => "Tên nhạc sĩ"
  ];

  foreach ($rules as $field => $ruleset) {
    foreach ($ruleset as $rule) {

      if ($rule === "required" && empty(trim($data[$field] ?? ""))) {
        $errors[] = "$title_item_mapping[$field] bắt buộc";
      }

      if (str_starts_with($rule, "min:")) {
        $min = explode(":", $rule)[1];
        if (mb_strlen($data[$field] ?? "") < $min) {
          $errors[] = "$title_item_mapping[$field] tối thiểu $min ký tự";
        }
      }
    }
  }

  return $errors;
}