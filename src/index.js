#!/bin/env node
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
inquirer.registerPrompt(
  "autocomplete",
  require("inquirer-autocomplete-prompt")
);
let files = fs.readdirSync(path.join(__dirname, "types"));
let filesLowercase = files
  .map((el) => el.split(".")[0])
  .map((e) => e.toLowerCase());

inquirer
  .prompt([
    {
      type: "autocomplete",
      name: "file",
      message: "Select a state to travel from",
      source: (answersSoFar, input) => {
        return input
          ? filesLowercase.filter((e) => e.startsWith(input))
          : filesLowercase;
      },
    },
  ])
  .then(function (answers) {
    let { file } = answers;
    let one = files.filter((e) => {
      if (e.split(".")[0].toLowerCase() == file) {
        return e;
      }
    });
    if (one) {
      fs.writeFileSync(
        ".gitignore",
        fs.readFileSync(path.join(__dirname, "types", one[0]), {
          encoding: "utf-8",
        })
      );
    }
  });
