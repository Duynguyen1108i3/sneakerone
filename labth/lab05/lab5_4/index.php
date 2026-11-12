<?php
// Định nghĩa hằng số ROOT là đường dẫn thư mục chứa file index.php
define('ROOT', dirname(__FILE__)); // Thư mục chứa file index

// Nạp file function.php trong thư mục include để sử dụng các hàm hỗ trợ
include "include/function.php";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ...>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <link href="css/style.css" rel="stylesheet" type="text/css" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Trang chủ....</title>
</head>

<body>
  <table width="100%" border="1" cellspacing="0">
    <tr>
      <td colspan="3">
        <p>&nbsp;</p>
        <?php
        // Nạp file header.php để hiển thị phần đầu trang
        include "include/header.php";
        ?>
      </td>
    </tr>
    <tr>
      <!-- Cột trái: menu bên trái -->
      <td width="15%" valign="top">
        <?php
        // Nạp file left.php để hiển thị menu bên trái
        include "include/left.php";
        ?>
      </td>

      <!-- Cột giữa: nội dung chính -->
      <td width="74%" valign="top">
        <?php
        // Nạp file mod.php để xử lý module động (nội dung chính thay đổi theo tham số mod)
        include "mod.php";
        ?>
      </td>

      <!-- Cột phải: giỏ hàng, tìm kiếm, liên hệ -->
      <td width="11%" valign="top">
        <div class="rightBox">
          Giỏ hàng của bạn
        </div>

        <div class="rightBox">
          <!-- Form tìm kiếm sản phẩm -->
          <form action="index.php">
            <!-- Ẩn tham số mod=search để khi submit sẽ gọi module search -->
            <input type="hidden" name="mod" value="search" />
            <!-- Ô nhập tên sách, khi focus sẽ xóa giá trị mặc định -->
            <input type="text" name="proname" value="Nhập tên sách"
              onfocus="if (this.value=='Nhập tên sách') this.value=''; " />
            <br />
            <input type="submit" />
          </form>
        </div>

        <div class="rightBox">
          <a href="ymsgr:sendim?hungtranvan" mce_href="ymsgr:sendim?hungtranvan" border="0">
            <img src="http://opi.yahoo.com/online?u=hungtranvan&t=2"
              mce_src="http://opi.yahoo.com/online?u=hungtranvan&t=2">
          </a><br />
          Phone:0909090909
        </div>
      </td>
    </tr>

    <!-- Hàng cuối: footer -->
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
  </table>
</body>

</html>