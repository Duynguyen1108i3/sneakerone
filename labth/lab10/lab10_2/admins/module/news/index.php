Trang tin  tức<hr />
<script language="javascript" src="ckeditor/ckeditor.js" type="text/javascript"></script>
<?php
$news =new News();
$ac= Utils::getIndex("ac", "");
if ($ac=="") {
	echo "Danh sách tin tức";
	}

if ($ac=="Add")
{
	echo "Load form thêm mới!";	

?>
<form action="index.php?mod=news&ac=saveAdd" method="post">
<fieldset>
	<legend>Thêm tin mới</legend>
<table width="60%" border="1" cellspacing="3">
  <tr>
    <td>Tiêu đề</td>
    <td><input type="text" name="title" /></td>
  </tr>
  <tr>
    <td>Hình đại diện</td>
    <td><input type="file" name="img" /></td>
  </tr>
  <tr>
    <td>Tóm tắt (nội dung ngắn)</td>
    <td><input type="text" name="short_content" /></td>
  </tr>
  <tr>
    <td>Nội dung tin</td>
    <td><textarea id="content" name=content>Nội dung test...</textarea>
<script type="text/javascript">CKEDITOR.replace( 'content'); </script></td>
  </tr>
  <tr>
    <td colspan="2" >
    	<input type="reset" value="Reset" />
        <input type="submit" name="sm" value="Save" />
    </td>
  </tr>
</table>



</fieldset>
</form>
<?php

}

if ($ac=="saveAdd")
{
	$n = $news->saveAddNew();
	echo "Da them $n tin ";
}
$data = $news->exeQuery("select * from news ");
foreach($data as $r)
{
	?>
    <div><?php echo $r["title"];?><p>
    <?php echo stripslashes( $r["content"]);?>
    </p></div><hr />
    <?php	
}