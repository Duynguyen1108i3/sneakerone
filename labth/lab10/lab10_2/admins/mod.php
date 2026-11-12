<?php
$mod = getIndex("mod","home");
			
if ($mod=="book")
	include "module/book/index.php";
if ($mod=="news")
	include "module/news/index.php";

?>