<?php
// Kiểm tra xem hằng số ROOT đã được định nghĩa chưa
// Nếu chưa định nghĩa thì báo lỗi và thoát chương trình
if (!defined("ROOT"))
{
    echo "You don't have permission to access this page!"; 
    exit;   
}

// Đặt đường dẫn mặc định cho biến $path là trang chủ của module info
$path = ROOT."/module/info/trangchu.php"; // mặc định

// Lấy giá trị tham số 'mod' và 'ac' từ URL
// Nếu không có thì gán giá trị rỗng ""
$mod = isset($_GET["mod"]) ? $_GET["mod"] : "";
$ac  = isset($_GET["ac"]) ? $_GET["ac"] : "";

// Kiểm tra giá trị của $mod để quyết định include file tương ứng
if($mod=="info")
{
    // Nếu mod=info thì nạp file index.php của module info
    include ROOT."/module/info/index.php";
}
if ($mod=="product")
{
    // Nếu mod=product thì nạp file index.php của module product
    include ROOT."/module/product/index.php";
}
if ($mod=="news")
{
    // (viết code thêm)
}
if ($mod=="cart")
{
    // (viết code thêm)
}
if ($mod=="search")
{
    // Nếu mod=search thì thay đổi đường dẫn $path sang file search.php của module product
    $path = ROOT."/module/product/search.php";
}

// Cuối cùng, nạp file theo đường dẫn $path (mặc định hoặc đã thay đổi ở trên)
include $path;

?>
