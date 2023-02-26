import readline from "readline";
import keypress from "keypress";
import chalk from "chalk";
import { exec } from "child_process";
import { nodeQuizz } from "./data.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const logo = chalk.blue(`
        *******************************************
        *******************************************
        ******    ╭━━━┳╮╱╭┳━━┳━━━━┳━━━━╮     ******
        ******    ┃╭━╮┃┃╱┃┣┫┣┻━━╮━┣━━╮━┃     ******
        ******    ┃┃╱┃┃┃╱┃┃┃┃╱╱╭╯╭╯╱╭╯╭╯     ******
        ******    ┃┃╱┃┃┃╱┃┃┃┃╱╭╯╭╯╱╭╯╭╯      ******
        ******    ┃╰━╯┃╰━╯┣┫┣┳╯━╰━┳╯━╰━╮     ******
        ******    ╰━━╮┣━━━┻━━┻━━━━┻━━━━╯     ******
        ******       ╰╯                      ******
        *******************************************
        *******************************************
  `);

// Définition des options du menu
const options = [
  { name: "Testez vos connaissances sur NodeJS !", quizz_array: nodeQuizz },
  { name: "Promise It Won't Hurt", action: "" },
  { name: "How to NPM", action: "" },
  { name: "Quitter", action: "" },
];

let selectedOption = 0; // Option sélectionnée

// Fonction pour afficher les options du menu
function printMenu(sentence) {
  console.clear();

  console.log(logo);
  console.log(
    `\n                 ${chalk.red.underline(sentence)}`
  );
  options.forEach((elem, index) => {
    if (index === selectedOption) {
      console.log(chalk.bgGreen(`> ${elem.name}`));
    } else {
      console.log(`  ${elem.name}`);
    }
  });
}

// Initialisation de la bibliothèque keypress
keypress(process.stdin);

// Fonction pour gérer les événements clavier
function handleKeypress(ch, key) {
  if (key && key.name === "return") {
    // L'utilisateur a appuyé sur la touche Entrée
    console.log(
      `Vous avez sélectionné l'option ${selectedOption + 1}: ${chalk.yellow(
        options[selectedOption].name
      )}`
    );
    if (selectedOption === options.length - 1) {
      // L'utilisateur a choisi de quitter le programme
      console.log("Au revoir !");
      process.stdin.pause();
    } else {
      // L'utilisateur a choisi une Option
      let choice = 0;
      const quizz = options[selectedOption].quizz_array[0];
      console.clear();
      console.log(`${logo}\n\n`);
      console.log(`${chalk.red(quizz.question)}\n\n`);
      quizz.propositions.forEach((e) => {
        let choice = 0;
        console.log(`${chalk.bgGreen(e)}\n`);
      });
      selectedOption = 0;
      // console.log()


      // printMenu();
    }
  } else if (key && key.name === "up") {
    // L'utilisateur a appuyé sur la touche flèche haut
    selectedOption = Math.max(0, selectedOption - 1);
    printMenu();
  } else if (key && key.name === "down") {
    // L'utilisateur a appuyé sur la touche flèche bas
    selectedOption = Math.min(options.length - 1, selectedOption + 1);
    printMenu();
  }
}

// Écoute des événements clavier
process.stdin.on("keypress", handleKeypress);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
process.stdin.resume();

// Affichage du menu
printMenu(`Sélectionnez une option :\n`);
