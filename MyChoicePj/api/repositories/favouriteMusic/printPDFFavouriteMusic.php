<?php
require_once __DIR__ . "/../../config/database.php";
require_once __DIR__ . "/../../helpers/tcpdf/tcpdf.php";

// Repository xử lý in PDF danh sách FavouriteMusic
class PrintPDFFavouriteMusic
{
    private $db;

    /**
     * Constructor
     * Khởi tạo đối tượng và gán kết nối CSDL PDO
     */
    public function __construct()
    {
        global $pdo;
        $this->db = $pdo;
    }

    /**
     * In PDF danh sách FavouriteMusic
     */
    public function printPDF()
    {
        $title  = isset($_GET['title']) ? $_GET['title'] : "";
        $artist = isset($_GET['artist']) ? $_GET['artist'] : "";
        $album  = isset($_GET['album']) ? $_GET['album'] : "";
        $params = [];
        $sql = "SELECT * FROM songs WHERE 1=1";
        if ($title !== "") {
            $sql .= " AND title LIKE ?";
            $params[] = "%$title%";
        }
        if ($artist !== "") {
            $sql .= " AND artist LIKE ?";
            $params[] = "%$artist%";
        }
        if ($album !== "") {
            $sql .= " AND album LIKE ?";
            $params[] = "%$album%";
        }
        $sql .= " ORDER BY id desc";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $songs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Tạo PDF
        $pdf = new TCPDF();
        $pdf->AddPage();
        $pdf->SetFont('dejavusans', '', 12);

        $pdf->Cell(0, 10, 'Danh sách bài hát', 0, 1, 'C');
        $pdf->Ln(5);

        foreach ($songs as $song) {
            if ($pdf->GetY() > 260) {
                $pdf->AddPage();
            }
            $pdf->Cell(50, 10, 'Tiêu đề:', 0);
            $pdf->Cell(0, 10, $song['title'], 0, 1);

            $pdf->Cell(50, 10, 'Ca sĩ:', 0);
            $pdf->Cell(0, 10, $song['artist'], 0, 1);

            $pdf->Cell(50, 10, 'Album:', 0);
            $pdf->Cell(0, 10, $song['album'], 0, 1);

            $pdf->Cell(50, 10, 'Ngày phát hành:', 0);
            if (empty($song['release_at']) || $song['release_at'] == '0000-00-00 00:00:00') {

                $pdf->Cell(0, 10, 'Không có', 0, 1);
            } else {

                $date = new DateTime($song['release_at']);

                $pdf->Cell(
                    0,
                    10,
                    'Ngày ' . $date->format('d') . ' tháng ' .
                        $date->format('m') . ' năm ' .
                        $date->format('Y') . ' - ' .
                        $date->format('H') . ' giờ ' .
                        $date->format('i') . ' phút ' .
                        $date->format('s') . ' giây',
                    0,
                    1
                );
            }
            $pdf->Ln(5);
        }

        $pdf->Output("songs.pdf", "I");
    }
}
