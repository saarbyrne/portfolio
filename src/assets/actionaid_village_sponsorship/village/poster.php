<?php  

					$pdf='images/actionaidsweepstakekit.zip';
					header('Content-type: application/zip');
					header('Content-Disposition: attachment; filename="'.basename($pdf).'"');
					header('Content-Length: ' . filesize($pdf));
					readfile($pdf);
					?> 