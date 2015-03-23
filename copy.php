<?php
$dir = 'backstore';
$files_total = scandir($dir);
$weeds = array('.', '..', '.DS_Store');
$files = array_diff($files_total, $weeds);
$l = count($files);
$num = 5;
// print_r($files);
for($i=0; $i<$num; $i++)
{
	$r = rand(count($weeds), $l-1);
	copy($dir."/".$files[$r], "temp".($i+1).".jpg");
	// echo $dir."/".$files[$r]."\n";
	// echo "/temp".($i+1).".jpg"."\n";
}
?>
