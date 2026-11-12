<?php
$ac= getIndex("ac");
if ($ac=="sendmail")
{
?>
<fieldset>
<legend>Gửi email - PhpMailer</legend>
<form method="post" action="index.php?mod=user&ac=dosendmail">
<table><tr><td colspan="2">Nhập thông tin gửi email</td></tr>
<tr><td> Email nhận</td><td> <input name="email" id="email" type="text" /></td></tr>
<tr><td>Nội dung</td><td>  
	<textarea name="message" id="message" rows="15" cols="40"></textarea>
 	</td></tr>
<tr><td colspan="2" align="center">  <input type="submit" value="Submit" /></td></tr>
</table>
</form>
</fieldset>
<?php
}
if ($ac=="dosendmail")
{
		//sử dụng để load thư viện 
		include ROOT."/lib/PHPMailer/PHPMailerAutoload.php";
		
		$mail = new PHPMailer();
		$mail->IsSMTP(); // set mailer to use SMTP
		$mail->Host = "smtp.gmail.com"; // specify main and backup server
		$mail->Port = 465; // set the port to use
		$mail->SMTPAuth = true; // turn on SMTP authentication
		$mail->SMTPSecure = 'ssl';
		$mail->Username = "test.phpmailer.hungtv@gmail.com"; //Địa chỉ gmail sử dụng để gửi email
		$mail->Password = "123456"; // your SMTP password or your gmail password
		$from = "hung.seu@gmail.com"; // Khi người sử dụng bấm reply sẽ gửi đến email này
		$to=$_REQUEST["email"]; // Email người nhận (email thực)
		$name="Hi, Mr Obama"; // Tên người nhận
		$mail->From = $from;
		$mail->FromName = "Bookstore online"; // Tên người gửi 
		$mail->AddAddress($to,$name);
		$mail->AddReplyTo($from,"Phong cham soc khach hang");
		$mail->WordWrap = 50; // set word wrap
		$mail->IsHTML(true); // send as HTML
		$mail->Subject = "Tin khuyen mai!";
		$mail->Body = "Khuyen mai .". $_REQUEST["message"] ."<hr> Chi tiet xem tai: <a href='". BASE_URL."'>".BASE_URL."</a>";
		$mail->SMTPDebug = 2;//Hiện debug lỗi. Mặc định sẽ tắt lỗi này
		if(!$mail->Send())
		{
			echo "<h3>Err: " . $mail->ErrorInfo . '</h3>';
		}
		else
		{
			echo "<h3>Send mail thành công</h3>";
		}

}

if($ac=="finish")
{
 echo "Thong bao";	
}
?>
