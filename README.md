# testing_three

Premiers pas en WebGL avec [Three.js](http://threejs.org/) couplé à une architecture isomorphique basée sur un serveur node.js avec [Express](https://github.com/strongloop/express) et utilisant [ReactJS](https://github.com/facebook/react) et [react-three](https://github.com/Izzimach/react-three) gérer les composant Three.js comme des composant React, [Fluxible](https://github.com/yahoo/fluxible) pour l'isomorphisme, [Socket.io](https://github.com/socketio/socket.io/) pour les requêtes serveur.

L'application est un "mini jeu" permettant de cliquer sur un cube principal afin de faire apparaître des petits cubes à des positions aléatoires. Ces mini cubes ont également une couleur aléatoire et sont destructible en cliquant dessus. La particularité du jeu est que l'état est partagé entre tous les utilisateurs.

Le projet tourne sous node.js (0.12.7) mais contient également des scripts (DockerFile et dockerCMDBlog.sh) pour être lancé depuis Docker.

Pour mettre le serveur en route (sans Docker), run:

```
npm install
gulp
npm start
```

Ou (avec Docker):

```
cd script/
docker build -t my-node-three .
sh dockerCMDThree.sh
```

Puis ouvrir un navigateur supportant WebGL à l'adresse suivante : [http:localhost:3030/](http:localhost:3030/).

Et tester en ouvrant plusieurs navigateur pour observer la reactivité des websocket.

## Issues

Le projet dans son état actuel rencontre quelques problèmes liés à l'animation de la camera. En effet le browser rencontre des freezes au moment de changer de page ou de rafraichir la page. Il semble que le probleme vienne du `requestAnimationFrame()` qui crée une sorte de pile d'actions à dispatcher de plus en plus importance en fonction de la durée d'execution de l'animation. Cette pile d'action engendre un ralentissement du browser.

La resolution de ce problème est en têtes des tâches à effectuer pour ce projet. Mais la limite vient peut-être de l'utilisation de flux/fluxible qui ralentit l'éxécution de l'animation. À approfondir...
