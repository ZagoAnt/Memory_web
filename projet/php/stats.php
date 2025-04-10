<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" Content="width=device-width, initial-scale=1.0" />
  <title> Projet Memory </title>
  <link rel="stylesheet" type="text/css" href="../css/classement.css"/>
</head>
<body>
<?php

?>
<h2>Tableau des Résultats</h2>
<form action="stats.php" method="POST"><input type="text" name="pseudo" value=""><input type="submit" value="Afficher statistique"></form>
<table>
    <tbody>
        <?php
        // Paramètres de connexion à la base de données
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
        if(isset($_POST['pseudo'])){
            $pseudo = trim($_POST['pseudo']);
            try {
                // On cherche l'historique du joueur entrer dans le formulaire
                $sql = "SELECT p.score_par, p.temps_par, p.date_par, p.victoire_par, d.libelle_dif FROM partie p JOIN difficulte d ON p.num_dif = d.num_dif WHERE p.pseudo_par = :pseudo ORDER BY p.date_par DESC";
                $requete = $pdo->prepare($sql);
                $requete->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);
                $requete->execute();
                $resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
                // On affiche sous forme de tableau les parties du joueur
                echo "<h2> Joueur : ".$pseudo."</h2>";
                echo "<thead>
                            <tr>
                                <th>Résultat</th>
                                <th>Score</th>
                                <th>Temps Restant</th>
                                <th>Difficulté</th>
                                <th>Date</th>
                            </tr>
                        </thead>";
                foreach ($resultats as $row) {
                    if($row['victoire_par']==1){
                        $victoire = "Victoire";
                    }else{
                        $victoire = "Défaite";
                    }
                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($victoire) . "</td>";
                    echo "<td>" . htmlspecialchars($row['score_par']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['temps_par']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['libelle']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['date_par']) . "</td>";
                    echo "</tr>";
                }
            } catch (PDOException $e) {
                echo "Erreur de requête : " . $e->getMessage();
            }
            // Fermer la connexion PDO
            $pdo = null;
        }
        if(!isset($_POST['pseudo'])){
            try {
                // On cherche l'historique du joueur entrer dans le formulaire
                $sql = "SELECT p.pseudo_par,p.score_par, p.temps_par, p.date_par, p.victoire_par, d.libelle_dif FROM partie p JOIN difficulte d ON p.num_dif = d.num_dif ORDER BY p.date_par DESC";
                $requete = $pdo->prepare($sql);
                $requete->execute();
                $resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
                // On affiche sous forme de tableau les parties du joueur
                echo "<thead>
                            <tr>
                                <th>Pseudo</th>
                                <th>Résultat</th>
                                <th>Score</th>
                                <th>Temps Restant</th>
                                <th>Difficulté</th>
                                <th>Date</th>
                            </tr>
                        </thead>";
                foreach ($resultats as $row) {
                    if($row['victoire_par']==1){
                        $victoire = "Victoire";
                    }else{
                        $victoire = "Défaite";
                    }
                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($row['pseudo_par']) . "</td>";
                    echo "<td>" . htmlspecialchars($victoire) . "</td>";
                    echo "<td>" . htmlspecialchars($row['score_par']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['temps_par']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['libelle_dif']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['date_par']) . "</td>";
                    echo "</tr>";
                }
            } catch (PDOException $e) {
                echo "Erreur de requête : " . $e->getMessage();
            }
            // Fermer la connexion PDO
            $pdo = null;
        }
        ?>
    </tbody>
</table>
<a href="Jeu_memory.php"><button>Menu</button></a>
</body>
</html>