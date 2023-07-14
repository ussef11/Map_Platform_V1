const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Interface =db.interface





// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//    initial();
//    initial2();
// });

function initial2(){
  Interface.bulkCreate([
    {
      id: 1,
      name: 'TEMPS REEL',
      parent: null,
      type: 'interface',
      icon: 'fa-sharp fa-solid fa-eye',
    },
    {
      id: 2,
      name: 'HISTORIQUE',
      parent: null,
      type: 'interface',
      icon: 'fa-sharp fa-solid fa-clock-rotate-left',
    },
    {
      id: 3,
      name: 'DIAGNOSTIQUE',
      parent: null,
      type: 'interface',
      icon: 'fa-solid fa-bug',
    },
    {
      id: 4,
      name: 'IDENTIFICATION RFID',
      parent: null,
      type: 'interface',
      icon: 'fa-sharp fa-solid fa-barcode',
    },
    {
      id: 5,
      name: 'TAUX DE REMPLISSAGE',
      parent: null,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 6,
      name: 'ANALYSE THEMATIQUE',
      parent: null,
      type: 'interface',
      icon: 'fa-solid fa-bars',
    },
    {
      id: 7,
      name: 'PLANIFICATION',
      parent: null,
      type: 'interface',
      icon: 'fa-solid fa-calendar-days',
    },
    {
      id: 8,
      name: 'Affectation des Ressources',
      parent: 7,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 9,
      name: 'Planning',
      parent: 7,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 10,
      name: 'Modification du Plannig',
      parent: 7,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 11,
      name: 'Circuit',
      parent: 7,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 12,
      name: 'ALERTES ET NOTIFICATIONS',
      parent: null,
      type: 'interface',
      icon: 'fa-solid fa-bell',
    },
    {
      id: 13,
      name: 'Zones',
      parent: 12,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 14,
      name: 'ETATS',
      parent: null,
      type: 'interface',
      icon: 'fa fa-sitemap',
    },
    {
      id: 15,
      name: 'Etats',
      parent: 14,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 16,
      name: 'Anomalies',
      parent: 14,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 17,
      name: 'PARAMETRAGE',
      parent: null,
      type: 'interface',
      icon: 'fa-solid fa-wrench',
    },
    {
      id: 18,
      name: 'Gestion des utilisateurs',
      parent: 17,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 19,
      name: 'Valeurs par défaut',
      parent: 17,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 20,
      name: 'Ressources Matériels',
      parent: 17,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 21,
      name: 'Ressources Humaines',
      parent: 17,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 22,
      name: 'Groupes secteurs',
      parent: 17,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 23,
      name: 'Contenerisation',
      parent: 17,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 24,
      name: 'Reporting',
      parent: 17,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 25,
      name: 'Tools',
      parent: 17,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 29,
      name: 'Tableau de Bord',
      parent: 14,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 30,
      name: 'Notification',
      parent: 12,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 31,
      name: 'Accés vidéo',
      parent: null,
      type: 'interface',
      icon: 'fa-solid fa-video',
    },
    {
      id: 32,
      name: 'Accidents de Travail',
      parent: 14,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    {
      id: 33,
      name: 'Cartographie des anomalies',
      parent: 12,
      type: 'interface',
      icon: 'fa-solid fa-hand-point-right',
    },
    // Add more interface objects here
  ])
    .then(() => {
      console.log('Interfaces created successfully');
    })
    .catch((error) => {
      console.error('Failed to create interfaces:', error);
    });
}





function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ussef11 application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});