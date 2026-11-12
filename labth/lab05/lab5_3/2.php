<?php
// Hàm lấy dữ liệu từ form POST
function postIndex($index, $value = "")
{
	if (!isset($_POST[$index])) return $value; // Nếu biến $_POST[$index] chưa tồn tại thì trả về giá trị mặc định $value
	return $_POST[$index]; // Nếu có thì trả về dữ liệu người dùng nhập
}

// Lấy dữ liệu từ form
$sm     = postIndex("submit"); // Nút submit
$ten    = postIndex("ten");    // Tên người dùng
$gt     = postIndex("gt");     // Giới tính
// Mảng chứa các loại file hình hợp lệ
$arrImg = array("image/png", "image/jpeg", "image/bmp");

// Nếu chưa nhấn submit thì quay về trang 1.php
if ($sm == "") {
	header("location:1.php");
	exit; // chuyển hướng về 1.php và dừng chương trình
}

// Biến chứa thông báo lỗi
$err = "";
// Kiểm tra tên có nhập chưa
if ($ten == "") $err .= "Phải nhập tên <br>";
// Kiểm tra giới tính có chọn chưa
if ($gt == "") $err .= "Phải chọn giới tính <br>";

// Kiểm tra lỗi khi upload file
$errFile = $_FILES["hinh"]["error"];
if ($errFile > 0)
	$err .= "Lỗi file hình <br>";
else {
	$type = $_FILES["hinh"]["type"]; // Lấy kiểu file upload
	// Nếu kiểu file không nằm trong danh sách hợp lệ
	if (!in_array($type, $arrImg))
		$err .= "Không phải file hình <br>";
	else {
		// Đường dẫn tạm của file upload
		$temp = $_FILES["hinh"]["tmp_name"];
		// Tên file gốc
		$name = $_FILES["hinh"]["name"];
		// Di chuyển file từ thư mục tạm sang thư mục image/
		if (!move_uploaded_file($temp, "image/" . $name))
			$err .= "Không thể lưu file<br>";
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ...>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Lab5_3/2</title>
</head>

<body>
	<?php
	// Nếu có lỗi thì in ra lỗi
	if ($err != "")
		echo $err;
	else {
		// Nếu giới tính là 1 thì chào Anh, ngược lại chào Chị
		if ($gt == "1") echo "Chào Anh: $ten ";
		else echo "Chào Chị $ten ";
	?>
		<hr>
		<!-- Hiển thị hình ảnh đã upload -->
		<img src="image/<?php echo $name; ?>">
	<?php
	}
	?>
	<p>
		<!-- Link quay về trang 1.php -->
		<a href="1.php">Tiếp tục</a>
	</p>
</body>

</html>