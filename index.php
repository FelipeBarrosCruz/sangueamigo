<html lang="pt-br" data-ng-app="sangue-amigo">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>Sangue Amigo - Doe vida</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="assets/css/bootstrap.css" type="text/css" media="screen, projection" />
  <!-- Main CSS -->
  <link rel="stylesheet" href="assets/css/main.css" type="text/css" media="screen, projection" />
  <!-- FONT CSS -->
  
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
  
  <!-- TABLE CSS -->
  <link rel="stylesheet" href="assets/css/ng-table.css">
</head>
<body>
<div id="top">
  <div class="container">
    <div id="navbar" class="navbar navbar-static">
      <div class="navbar-transparent">
        <div class="container">
          <a class="brand" href="/">
            <h1>Sangue Amigo</h1>
          </a>
          <ul class="nav pull-right">
            <li id="fat-menu" class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                Menu <b class="caret"></b>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<!--/#top-->

<!-- CONTENT -->
  <ng-view></ng-view>
<!-- END CONTENT -->
<div id="footer">
  <div class="container">
    <div class="row">
      <p>
          <a href="#">Sobre a organização</a>
        | <a href="#">Politica Pública</a>
        | <a href="#">Termos de uso</a>
        | <a href="#">Contato</a>
      </p>
    </div>
  </div>
</div>
<!--/#footer-->

    <script src="assets/js/libs/jquery-2.1.1.min.js"></script>
    <script src="assets/js/libs/bootstrap.min.js"></script>
    <script src="assets/js/libs/angular.min.js"></script>
    <script src="assets/js/libs/angular-route.min.js"></script>
    <script src="assets/js/libs/ng-table.js"></script>
    <script src="assets/js/libs/ui-bootstrap-tpls-0.11.0.min.js"></script>
    <script src="assets/js/app.js"></script>
</body>
</html>