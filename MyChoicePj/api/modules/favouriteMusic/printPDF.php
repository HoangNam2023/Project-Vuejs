<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../repositories/favouriteMusic/printPDFFavouriteMusic.php';

// Xử lý in PDF thông tin FavouriteMusic
$printPDF_action = new PrintPDFFavouriteMusic();
$printPDF_action->printPDF();
