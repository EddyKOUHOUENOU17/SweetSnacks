# SweetSnacks

Site vitrine pour la boutique de pâtisseries "The Sweet Snacks".

## Gestion des horaires (ouverture / fermeture)

Le site utilise une double logique :

1. Un contrôle d'heure fixe (07h00–19h00) implémenté en JavaScript.
2. Un fichier `status.txt` au format texte, placé à la racine du projet, contenant soit
   `open` soit `closed`.

Au chargement de la page, le front-end récupère ce fichier (`fetch('status.txt')`) et affiche
l'overlay de fermeture si :

* le contenu est `closed`, **ou**
* la date locale n'est pas dans l'intervalle 07h–19h.

### Pour un administrateur non-développeur

1. Ouvrir le site dans un navigateur.
2. Descendre en bas de page et cliquer sur le lien **🛠️ Admin : ouvrir/fermer le site**.
   Il ouvrira l'éditeur GitHub sur le fichier `status.txt` (vous devez être connecté à GitHub).
3. Écrire `open` pour ouvrir ou `closed` pour fermer, puis cliquer sur **Commit changes**.
   Aucune connaissance en développement n'est requise, GitHub s'occupe du reste.

Si le site est hébergé ailleurs (Netlify, Vercel, etc.), le fichier `status.txt` peut aussi être
modifié via le gestionnaire de fichiers fourni par l'hébergeur. Le principe reste le même :
changer le contenu et sauver.

Le fichier `status.txt` est versionné dans ce dépôt ; la modification par l'admin entraîne un
nouveau commit, mais cela n'a pas à être géré manuellement par l'utilisateur.

---

Le reste du README (layout, développement, etc.) est volontairement réduit pour se concentrer
sur l'utilisation simple par une personne sans expérience technique.
