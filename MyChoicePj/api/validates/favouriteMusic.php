<?php
require_once __DIR__ . "/base.php";
/**
 * validate thêm mới FavouriteMusic
 * @param array $data
 */
function validateAddFavouriteMusic(array $data): array
{
    $rules = [
        "title"  => ["required", "min:3"],
        "artist" => ["required", "min:3"]
    ];

    $title_item_mapping = [
        "title"  => "Tên bài hát",
        "artist" => "Tên nhạc sĩ"
    ];

    return validate($rules, $data, $title_item_mapping);
}

/**
 * validate update FavouriteMusic
 * @param array $data
 */
function validateUpdateFavouriteMusic(array $data): array
{
    $rules = [
        "title"  => ["required", "min:3"],
        "artist" => ["required", "min:3"]
    ];

    $title_item_mapping = [
        "title"  => "Tên bài hát",
        "artist" => "Tên nhạc sĩ"
    ];

    return validate($rules, $data, $title_item_mapping);
}
?>