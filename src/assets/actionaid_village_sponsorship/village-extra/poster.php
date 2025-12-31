<?php  

					$pdf='images/ActionAid-Brochure.zip';
					header('Content-type: application/zip');
					header('Content-Disposition: attachment; filename="'.basename($pdf).'"');
					header('Content-Length: ' . filesize($pdf));
					readfile($pdf);
					?> 