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

        // Requête SQL pour sélectionner toutes les données de la table 'partie'
        $sqlf = "SELECT p.pseudo_par,p.score_par,p.temps_par,p.date_par,d.libelle_dif FROM partie p JOIN difficulte d ON p.num_dif = d.num_dif WHERE victoire_par = 1 AND p.num_dif = 1 ORDER BY score_par LIMIT 10;";
        $sqlm = "SELECT p.pseudo_par,p.score_par,p.temps_par,p.date_par,d.libelle_dif FROM partie p JOIN difficulte d ON p.num_dif = d.num_dif WHERE victoire_par = 1 AND p.num_dif = 2 ORDER BY score_par LIMIT 10;";
        $sqld = "SELECT p.pseudo_par,p.score_par,p.temps_par,p.date_par,d.libelle_dif FROM partie p JOIN difficulte d ON p.num_dif = d.num_dif WHERE victoire_par = 1 AND p.num_dif = 3 ORDER BY score_par LIMIT 10;";

        try {
            // Exécution de la requête
            $requetef = $pdo->query($sqlf);
            $requetem = $pdo->query($sqlm);
            $requeted = $pdo->query($sqld);

            // Récupération des résultats sous forme de tableau associatif
            $resultatf = $requetef->fetchAll();
            $resultatm = $requetem->fetchAll();
            $resultatd = $requeted->fetchAll();
        } catch (PDOException $e) {
            echo "Erreur de requête : " . $e->getMessage();
        }
        echo "<h2>Tableau des Résultats</h2>
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Pseudo</th>
                    <th>Score</th>
                    <th>Temps Restant</th>
                    <th>Difficulté</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>";
        // Parcours des résultats et affichage dans le tableau HTML
        $position = 1;
        foreach ($resultatf as $row) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($position++) . "</td>";
            echo "<td>" . htmlspecialchars($row['pseudo_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['score_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['temps_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['libelle_dif']) . "</td>";
            echo "<td>" . htmlspecialchars($row['date_par']) . "</td>";
            echo "</tr>";
        }
        echo"<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        $position = 1;
        foreach ($resultatm as $row) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($position++) . "</td>";
            echo "<td>" . htmlspecialchars($row['pseudo_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['score_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['temps_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['libelle_dif']) . "</td>";
            echo "<td>" . htmlspecialchars($row['date_par']) . "</td>";
            echo "</tr>";
        }
        echo"<tr><td></td><td></td><td><td></td></td><td></td><td></td></tr>";
        $position = 1;
        foreach ($resultatd as $row) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($position++) . "</td>";
            echo "<td>" . htmlspecialchars($row['pseudo_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['score_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['temps_par']) . "</td>";
            echo "<td>" . htmlspecialchars($row['libelle_dif']) . "</td>";
            echo "<td>" . htmlspecialchars($row['date_par']) . "</td>";
            echo "</tr>";
        }
        echo "</tbody>
            </table>";
        ?>
    <a href="Jeu_memory.php"><button>Menu</button></a>
</body>
</html>