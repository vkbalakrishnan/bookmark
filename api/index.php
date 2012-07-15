<?php
	require ('Slim/Slim.php');
	
	$app = new Slim();
	$app->get('/',function(){
		echo "its working alright";
	});
	$app->get('/bookmark', function(){
		
		$sql = "select * from sites";
		try {
		
			$db = getConnection();
			$stmt = $db->query($sql);
			$sites = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			echo  json_encode($sites) ;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}	
	}
	);
	$app->get('/bookmark/:tag', function($tag){
		$sql = "SELECT * FROM sites WHERE tag like 	:tag";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$tag = "%".$tag."%";
			$stmt->bindParam("tag", $tag);
			$stmt->execute();
			$book = $stmt->fetchAll(PDO::FETCH_OBJ);		
			$db = null;
			echo json_encode($book);
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}	
	}
	);
	$app->post('/bookmark', function(){
		
		$request = Slim::getInstance()->request();
		$book = json_decode($request->getBody());
		$sql = "INSERT INTO sites (website, tag) VALUES (:website, :tag)";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam(':website', $book->website);
			$stmt->bindParam(':tag', $book->tag);
			$stmt->execute();
			$book->id = $db->lastInsertId();
			$db = null;
			echo json_encode($book);
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
//	$app->put('/bookmark/:id', 'updateBookmark');
//	$app->delete('/bookmark/:id', 'deleteBookmark');
	$app->get('/hello/:name', function ($name) {
		echo "Hello, $name!";
	});
	
	$app->run();
	
	// function addBookmark(){
		// $request = Slim::getInstance()->request();
		// $book = json_decode($request->getBody());
		// $sql = "INSERT INTO sites (website, tag) VALUES (:website, :tag)";
		// try {
			// $db = getConnection();
			// $stmt = $db->prepare($sql);
			// $stmt->bindParam(':website', $book->website);
			// $stmt->bindParam(':tag', $book->tag);
			// $stmt->execute();
			// $book->id = $db->lastInsertId();
			// $db = null;
			// echo json_encode($book);
		// } catch(PDOException $e) {
			// echo '{"error":{"text":'. $e->getMessage() .'}}';
		// }
	// }

	function getConnection() {
		// $dbhost="mysql1.000webhost.com";
		// $dbname="a4418749_bookmar";
		// $dbpass="kannan88";
		// $dbuser="a4418749_admin";
		$dbhost="localhost";
		$dbuser="root";
		$dbpass="";
		$dbname="bookmark";
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}
?>