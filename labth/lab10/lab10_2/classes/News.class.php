<?php
class News extends Db{
	
	
	public function delete($id)
	{
		
	}
	
	public function saveAddNew()
	{
		$title =Utils::postIndex("title", "");
		$short_content=Utils::postIndex("short_content", "");
		$content=Utils::postIndex("content", "");
		
		$sql="insert into news(title, short_content, content) values(:title, :short_content, :content) ";
		$arr = array(":title"=>$title, ":short_content"=>$short_content,":content"=>$content);
		return $this->exeNoneQuery($sql, $arr);
		
	}

}
?>