<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" Content="width=device-width, initial-scale=1.0" />
  <title> Projet Memory-Niveau Difficile </title>
  <link rel="stylesheet" type="text/css" href="../css/niveau_difficile.css"/>
</head>
<body>
    <section id="first">
        <div id="timer">02:00</div>
        <button id="start" data-diff="3"> Début </button>
        <p id="score"> Nombre de coup : 0 </p>
    </section>
    <section id="stade">
        <div class="terrain">

        </div>
    </section>
</body>
  <?php
    $host = "localhost";
    $dbname = "memory";
    $username = "root";
    $password = "";
        try {
            // Création d'une instance PDO
            $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

            // Configuration des options PDO
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Active les erreurs PDO
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); // Mode de récupération par défaut
        } catch (PDOException $e) {
            die("Erreur de connexion : " . $e->getMessage());
        }
        // Vérification que toutes les variables POST existent
        if (isset($_POST['pseudo'], $_POST['score_par'], $_POST['difficulte'], $_POST['victoire'], $_POST['temps'])) {
        // Nettoyage et conversion des valeurs
        $pseudo = trim($_POST['pseudo']);
        $score_par = intval($_POST['score_par']);
        $num_diff = intval($_POST['difficulte']);
        $victoire = intval($_POST['victoire']);
        $temps = trim($_POST['temps']);
            
        // Vérification que le pseudo n'est pas vide
        if (!empty($pseudo)) {
        // Préparation de la requête
        $sql = "INSERT INTO partie (num_dif, pseudo_par, score_par, temps_par, victoire_par) 
          VALUES (:num_dif, :pseudo, :score_par, :temps, :victoire)";
                
        $partie = $pdo->prepare($sql);
        $partie->bindParam(':num_dif', $num_diff, PDO::PARAM_INT);
        $partie->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);
        $partie->bindParam(':score_par', $score_par, PDO::PARAM_INT);
        $partie->bindParam(':temps', $temps, PDO::PARAM_STR);
        $partie->bindParam(':victoire', $victoire, PDO::PARAM_INT);

        // Exécution de la requête
        if ($partie->execute()) {
        header("Location: Jeu_memory.php");
        exit();
      } 
    }
  }
  ?>
<script src="../js/script.js"></script>
</html>