<?php
class Book extends Db{
	public function getBookRand($n)
	{
		$sql="select book_id, book_name, img from book order by rand() limit 0, $n ";
		return $this->exeQuery($sql);	
	}
	
	public function getBookByPubliser($manhaxb)
	{
		$sql="select book_id, book_name, img from book order by rand() limit 0, $n ";
		return $this->select($sql);	
	}
	public function delBook($book_id)
	{
		$sql="delete from book where book_id=@book_id ";
		$arr =  Array("@book_id"=>$book_id);
		return $this->exeNoneQuery($sql, $arr);	
	}
	
	public function getDetailBook($book_id)
	{
		$sql="select book.*, pub_name, cat_name 
			from book, publisher, category
			where book.cat_id = category_cat_id
				and book.pub_id = publisher.pub_name
				and book_id=@book_id ";
		$arr = array("@book_id"=>$book_id);
		$data = $this->exeQuery($sql, $arr);
		if (Count($data)>0) return $data[0];
		else return array();
					
		
	}

}
?>