const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("What is Your Age ? ", (ans) => {
    console.log(ans);
    rl.close();
})