<?php

defined('_JEXEC') or die;

$app             = JFactory::getApplication();
$doc             = JFactory::getDocument();
$user            = JFactory::getUser();
$this->language  = $doc->language;
$this->direction = $doc->direction;

// Output as HTML5
$doc->setHtml5(true);

// Getting params from template
$params = $app->getTemplate(true)->params;

// Detecting Active Variables
$option   = $app->input->getCmd('option', '');
$view     = $app->input->getCmd('view', '');
$layout   = $app->input->getCmd('layout', '');
$task     = $app->input->getCmd('task', '');
$itemid   = $app->input->getCmd('Itemid', '');
$sitename = $app->get('sitename');

if($task == "edit" || $layout == "form" )
{
	$fullWidth = 1;
}
else
{
	$fullWidth = 0;
}

// Add JavaScript Frameworks
JHtml::_('bootstrap.framework');

$doc->addScriptVersion($this->baseurl . '/templates/' . $this->template . '/js/script.js');

// Add Stylesheets
//$doc->addStyleSheetVersion($this->baseurl . '/templates/' . $this->template . '/css/template.css');
$doc->addStyleSheetVersion($this->baseurl . '/templates/' . $this->template . '/css/main.css');

// Use of Google Font
if ($this->params->get('googleFont'))
{
	$doc->addStyleSheet('//fonts.googleapis.com/css?family=' . $this->params->get('googleFontName'));
	$doc->addStyleDeclaration("
	h1, h2, h3, h4, h5, h6, .site-title {
		font-family: '" . str_replace('+', ' ', $this->params->get('googleFontName')) . "', sans-serif;
	}");
}

// Check for a custom CSS file
$userCss = JPATH_SITE . '/templates/' . $this->template . '/css/user.css';

if (file_exists($userCss) && filesize($userCss) > 0)
{
	$this->addStyleSheetVersion($this->baseurl . '/templates/' . $this->template . '/css/user.css');
}

?>

	<!DOCTYPE html>
	<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">

	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<jdoc:include type="head" />
		<!--[if lt IE 9]><script src="<?php echo JUri::root(true); ?>/media/jui/js/html5.js"></script><![endif]-->
	</head>

	<body>
	<div class="site wrapper">
		
			<!-- Mobile sidebar -->
			<div class='mobile-sidebar-left'>
					<jdoc:include type="modules" name="mobile_sidebar_left" />
			</div>

			<div class='cover' onclick='onClickCover()'></div>

			<!-- Mobile Menu Button -->
			<div class='mobile-menu-bar'>
				<div class='mobile-menu-button' onclick='onClickMenu();'><span>&#9776;</span></div>
			</div>
			<div id="mask" onClick="desktop_reset()"></div>


			<!-- Body -->
			<div class="body">
						<span id="top_of_site"></span>
				<div class="container">

					<!-- Header -->
					<header class="header" role="banner">
						<div class="header-inner clearfix">
							<a class="brand pull-left" href="<?php echo $this->baseurl; ?>/">
								<!--			<?php echo $logo; ?>
						<?php if ($this->params->get('sitedescription')) : ?>
							<?php echo '<div class="site-description">' . htmlspecialchars($this->params->get('sitedescription'), ENT_COMPAT, 'UTF-8') . '</div>'; ?>
						<?php endif; ?>-->
							</a>
							<div class="header-search top-logo">
								<jdoc:include type="modules" name="top_logo" style="xhtml" />
							</div>
						</div>
					</header>
					<!--			<?php if ($this->countModules('above_hero')) : ?>-->

					<nav class="navigation" role="navigation">
						<div class="main-menu ">
							<jdoc:include type="modules" name="main_menu" style="xhtml" />
				
						</div>
							</nav>
						
						<div>
							<jdoc:include type="modules" name="above_hero" style="xhtml" />
						</div>
				


					<!--			<?php endif; ?>-->
		
					<jdoc:include type="modules" name="hero" style="xhtml" />


					<div id="main_block">


						<!-- Begin Sidebar -->
						<div id="sidebar">
							<div class="sidebar_nav">
								<jdoc:include type="modules" name="sidebar" style="xhtml" />
							</div>
						</div>
						<!-- End Sidebar -->


						<main id="content" role="main">
							<!-- Begin Content -->
							<jdoc:include type="modules" name="above_main" style="xhtml" />


							<jdoc:include type="message" />

							<jdoc:include type="component" />
							<jdoc:include type="modules" name="under_main" style="xhtml" />

							<!-- End Content -->
						</main>



						<div id="aside" class="right-sidebar">
							<!-- Begin RightSidebar -->

							<jdoc:include type="modules" name="right_sidebar" style="well" />
							<!-- End Right Sidebar -->
						</div>



					</div>
				</div>
			</div>
			<!-- Footer -->
			<footer class="footer" role="contentinfo">
				<div class="container">
					<hr />
					<jdoc:include type="modules" name="footer" style="xhtml" />


					<p>
						<a href="#" id="back-top">
							<!--<?php echo JText::_('TPL_PROTOSTAR_BACKTOTOP'); ?> -->
						</a>
					</p>
					<p>
						<!--&copy; <?php echo date('Y'); ?> <?php echo $sitename; ?>-->
					</p>
				</div>
			</footer>
			
			<section id="about" class="jumbotron text-xs-center">
				<div class="navbar-collapse collapse inverse" id="navbar-header">

					<jdoc:include type="modules" name="about" style="xhtml" />
		
				
						Natus quo beatae nesciunt unde, quas quae sunt aliquam magni rerum earum praesentium ea esse error facere. Inventore quas sed placeat nulla.
						Cupiditate, laborum veniam dolorum quos odit labore obcaecati dolores optio in delectus consectetur consequatur praesentium quisquam. Magni reprehenderit maiores aspernatur odio cumque!
					</div>
			
			<div class="navbar navbar-static-top navbar-dark bg-inverse">
				<div class="container-fluid">
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header" aria-expanded="false" aria-label="Toggle navigation"></button>
					<a href="#" class="navbar-brand">Album</a>
				</div>
			</div>
			</section>

			<section id="jumbotron" class="jumbotron text-xs-center">
				<div class="container">
					<h1 class="jumbotron-heading">Albwrtcwtum example</h1>
					<p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
					<p>
						<a href="#" class="btn btn-primary">Main call to action</a>
						<a href="#" class="btn btn-secondary">Secondary action</a>
					</p>
				</div>
			</section>

			<footer class="text-muted">
				<div class="container">
					<p class="float-xs-right">
						<a href="#">Back to top</a>
					</p>
					<p>Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
					<p>New to Bootstrap? <a href="../../">Visit the homepage</a> or read our <a href="../../getting-started/">getting started guide</a>.</p>
				</div>
			</footer>


			<div class="container">

				<input type="text" class="btn btn-default float_left" value="frog">
				<input type="text" class="btn btn-warning float_center" value="frog">
				<input type="text" class="btn btn-danger float_right" value="frog">
				<section id="gulp_test">
					<h1 id="title">Simon started with gulp... </h1> Gulp is a command line task runner utilizing Node.js platform. It runs custom defined repetitious tasks and manages process automation. The goal of this tutorial is to introduce main concepts of Gulp and see it in action. We will make this run a bit faster

					<h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque modi dolorem, dolore est dolores nesciunt quae natus ducimus laboriosam nisi aut iure, fuga corporis voluptate architecto ut hic blanditiis placeat.</h2>
					<div class="holder">
						<div class="item1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sequi cumque dignissimos maiores possimus neque perferendis tempore, a facilis id cum magni excepturi illo debitis nihil libero soluta non quasi.</div>
						<div class="item2">Placeat earum, soluta accusantium totam labore ex saepe quisquam nemo perferendis atque, eum debitis sint laborum harum fugiat? Ab nostrum molestias laboriosam eius, suscipit ipsam atque provident amet quam maiores!</div>
						<div class="item3">Optio voluptatem nisi saepe maxime, perspiciatis quia! Vitae aliquam expedita ex temporibus cumque optio sequi neque velit qui aperiam quidem, corporis, non eaque! Quia reprehenderit, accusamus veritatis ipsa quod architecto!</div>
					</div>
					<div class="frog">demonstrate some of the most often tasks you'll encounter. By the end of the tutorial you will be able to apply Gulp to your own project, customize it and be much more efficient.</div>
				</section>
			</div>

							<jdoc:include type="modules" name="susy_demo" style="xhtml" />

			
			<div class="container">
				<div class="item1 "> item1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sequi cumque dignissimos maiores possimus neque perferendis tempore, a facilis id cum magni excepturi illo debitis nihil libero soluta non quasi.</div>
				<div class=" item2"> item2 Placeat earum, soluta accusantium totam labore ex saepe quisquam nemo perferendis atque, eum debitis sint laborum harum fugiat? Ab nostrum molestias laboriosam eius, suscipit ipsam atque provident amet quam maiores!</div>
				<div class=" item3">item 3 Optio voluptatem nisi saepe maxime, perspiciatis quia! Vitae aliquam expedita ex temporibus cumque optio sequi neque velit qui aperiam quidem, corporis, non eaque! Quia reprehenderit, accusamus veritatis ipsa quod architecto!</div>





				<nav class="navbar navbar-static-top navbar-light bg-faded">
					<a href="#" class="navbar-brand">Carousel</a>
					<ul class="nav navbar-nav">
						<li class="nav-item active">
							<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Features</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Pricing</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">About</a>
						</li>
					</ul>
				</nav>

				<section id="carousel">
					<!-- Carousel
    ================================================== -->
					<div id="myCarousel" class="container carousel slide" data-ride="carousel">
						<!-- Indicators -->
						<ol class="carousel-indicators">
							<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
							<li data-target="#myCarousel" data-slide-to="1"></li>
							<li data-target="#myCarousel" data-slide-to="2"></li>
						</ol>
						<div class="carousel-inner" role="listbox">
							<div class="item active">
								<img class="first-slide" src="images/slides/slide-1" alt="First slide">
								<div class="container">
									<div class="carousel-caption text-xs-left">
										<h1>Example headline.</h1>
										<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
										<p><a class="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>
									</div>
								</div>
							</div>
							<div class="item">
								<img class="second-slide" src="images/slides/slide-2" alt="Second slide">
								<div class="container">
									<div class="carousel-caption">
										<h1>Another example headline.</h1>
										<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
										<p><a class="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
									</div>
								</div>
							</div>
							<div class="item">
								<img class="third-slide" src="images/slides/slide-3" alt="Third slide">
								<div class="container">
									<div class="carousel-caption text-xs-right">
										<h1>One more for good measure.</h1>
										<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
										<p><a class="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a></p>
									</div>
								</div>
							</div>
						</div>
						<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
							<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a>
						<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
							<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>
					</div>
					<!-- /.carousel -->
				</section>

				<!-- Marketing messaging and featurettes
    ================================================== -->
				<!-- Wrap the rest of the page in another container to center all the content. -->
				<div class="container">
					<section class="marketing">


						<!-- Three columns of text below the carousel -->

						<div>
							<img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
							<h2>Heading</h2>
							<p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
							<p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div>
							<img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
							<h2>Heading</h2>
							<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
							<p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div>
							<img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
							<h2>Heading</h2>
							<p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
							<p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
						</div>

					</section>
				</div>


				<!-- START THE FEATURETTES -->
				<div class="container">
					<section class="featurette ">
						<hr class="featurette-divider">

						<div class="featurette container">
							<div>
								<h2 class="featurette-heading">First featurette heading. <span class="text-muted">It'll blow your mind.</span></h2>
								<p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
							</div>
							<div>
								<img class="featurette-image img-fluid mx-auto" data-src="" alt="Generic placeholder image">
							</div>
						</div>

						<hr class="featurette-divider">

						<div class="featurette container">
							<div>
								<h2 class="featurette-heading">Oh yeah, it's that good. <span class="text-muted">See for yourself.</span></h2>
								<p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
							</div>
							<div>
								<img class="featurette-image img-fluid mx-auto" data-src="" alt="Generic placeholder image">
							</div>
						</div>

						<hr class="featurette-divider">

						<div class="featurette container">
							<div>
								<h2 class="featurette-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
								<p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
							</div>
							<div>
								<img class="featurette-image img-fluid mx-auto" data-src="" alt="Generic placeholder image">
							</div>
						</div>

						<hr class="featurette-divider">

						<!-- /END THE FEATURETTES -->
					</section>
				</div>

				<!-- FOOTER -->
				<footer>
					<p><a href="#">Back to top</a></p>
					<p>&copy; 2014 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
				</footer>


			</div>
			<!-- /container -->


			<jdoc:include type="modules" name="debug" style="none" />
			<!-- JavaScript: placed at the end of the document so the pages load faster -->
			<!-- jQuery library -->
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js" integrity="sha384-THPy051/pYDQGanwU6poAc/hOdQxjnOEXzbT+OuUAFqNqFjL+4IGLBgCJC3ZOShY" crossorigin="anonymous"></script>

			<!-- Tether -->
			<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js" integrity="sha384-Plbmg8JY28KFelvJVai01l8WyZzrYWG825m+cZ0eDDS1f7d/js6ikvy1+X+guPIB" crossorigin="anonymous"></script>

			<!-- Latest compiled JavaScript -->
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/js/bootstrap.min.js" integrity="sha384-ux8v3A6CPtOTqOzMKiuo3d/DomGaaClxFYdCu2HPMBEkf6x2xiDyJ7gkXU0MWwaD" crossorigin="anonymous"></script>
			<jdoc:include type="modules" name="livereload" style="none" />
		</div>

	</body>

	</html>