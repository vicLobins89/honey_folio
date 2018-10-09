<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Honey - Creative Business Consultants</title>
<link href="css/style.css" rel="stylesheet" type="text/css">
<link href="slick/slick.css" rel="stylesheet" type="text/css">
<script src="js/jquery.min.js"></script>
</head>
	
<body class="home" id="top">
	
<header><div class="header cf">
	<a href="#" class="back-btn">Back</a>
	<a href="/portfolio" class="logo"><img src="images/honey-logo.png" alt="Honey Logo"></a>
	<nav class="main"></nav>
</div></header>

<div class="wrapper">
	
	<div class="content">
		
		<ul class="client-list cf">
		<?php
		$dir = '';
		foreach( glob( $dir.'*', GLOB_ONLYDIR ) as $folder ) :

		if( ($folder != '*') && ($folder != '_notes') && ($folder != 'css') && ($folder != 'fonts') && ($folder != 'images') && ($folder != 'js') && ($folder != 'pdfjs') && ($folder != 'scss') && ($folder != '*portfolio_21082018') && ($folder != 'slick') && ($folder != 'us') ) :
			
			if( ($folder === 'serco') || ($folder === 'perrigo') ) :
		?>
			<li class="col-3 combined <?php echo $folder; ?>">
				<?php 
				echo '<img src="images/'.$folder.'/'.$folder.'-logo.png" alt="'.$folder.'">
				<div class="sub">';
					foreach( glob( $dir.$folder.'/*', GLOB_ONLYDIR ) as $subFolder ) {
						echo '<a class="sub-item" href="'.$subFolder.'">'.file_get_contents( "$subFolder/name.txt" ).'</a>';
					}
				echo '</div>'
				?>
			</li> 
		
		<?php else : ?>
			<li class="col-3 <?php echo $folder; ?>">
				<a href="<?php echo $dir.$folder;?>"><?php echo '<img src="images/'.$folder.'/'.$folder.'-logo.png" alt="'.$folder.'">';?></a>
			</li> 
		<?php
			endif;
		endif;
		endforeach;
		?>
		</ul>
		
	</div>
	
</div>

<script src="slick/slick.min.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>