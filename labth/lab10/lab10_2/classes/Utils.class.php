<?php
class Utils
{
	static function getIndex($index, $val=null)
	{
		if (isset($_GET[$index]))
			return $_GET[$index];
		else return $val;	
	}	
	
	
	static function postIndex($index)
	{	
		if (isset($_POST[$index]))
			{$s= trim($_POST[$index]);
			  $s= addslashes($s);
			}
	
		else $s="";	
		return $s;	
	}	
	
	static function isEmail($s)
	{
		
	}
	
	static function isWebsite($s)
	{
		
	}
	static function isStrongPassword($s)
	{
		
	}
}

?>