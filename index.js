// Main runner script for JavaScript DSA learning
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.clear();
    console.log('🚀 JavaScript Data Structures & Algorithms Learning Platform\n');
    console.log('Choose what you want to run:');
    console.log('1. Data Structures');
    console.log('2. Algorithms');
    console.log('3. Problems');
    console.log('4. Exit\n');
}

function showDataStructuresMenu() {
    console.clear();
    console.log('📊 Data Structures\n');
    console.log('1. Arrays');
    console.log('2. Stacks');
    console.log('3. Queues');
    console.log('4. Linked Lists');
    console.log('5. Trees');
    console.log('6. Graphs');
    console.log('7. Hash Tables');
    console.log('8. Heaps');
    console.log('9. Back to main menu\n');
}

function showAlgorithmsMenu() {
    console.clear();
    console.log('🔧 Algorithms\n');
    console.log('1. Sorting Algorithms');
    console.log('2. Searching Algorithms');
    console.log('3. Recursion');
    console.log('4. Dynamic Programming');
    console.log('5. Greedy Algorithms');
    console.log('6. Back to main menu\n');
}

function showProblemsMenu() {
    console.clear();
    console.log('🧩 Coding Problems\n');
    console.log('1. Easy Problems');
    console.log('2. Medium Problems');
    console.log('3. Hard Problems');
    console.log('4. Back to main menu\n');
}

function runScript(scriptPath) {
    try {
        console.clear();
        console.log(`🏃 Running: ${scriptPath}\n`);
        require(scriptPath);
        
        rl.question('\nPress Enter to continue...', () => {
            main();
        });
    } catch (error) {
        console.log(`❌ Error running script: ${error.message}`);
        rl.question('\nPress Enter to continue...', () => {
            main();
        });
    }
}

function handleDataStructuresChoice(choice) {
    switch (choice) {
        case '1':
            runScript('./data-structures/arrays/implementation.js');
            break;
        case '2':
            runScript('./data-structures/stacks/implementation.js');
            break;
        case '3':
            console.log('Queues implementation coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '4':
            console.log('Linked Lists implementation coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '5':
            console.log('Trees implementation coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '6':
            console.log('Graphs implementation coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '7':
            console.log('Hash Tables implementation coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '8':
            console.log('Heaps implementation coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '9':
            main();
            break;
        default:
            console.log('Invalid choice!');
            rl.question('\nPress Enter to continue...', () => {
                dataStructuresMenu();
            });
    }
}

function handleAlgorithmsChoice(choice) {
    switch (choice) {
        case '1':
            runScript('./algorithms/sorting/sorting-algorithms.js');
            break;
        case '2':
            console.log('Searching algorithms coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '3':
            console.log('Recursion algorithms coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '4':
            console.log('Dynamic Programming coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '5':
            console.log('Greedy algorithms coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '6':
            main();
            break;
        default:
            console.log('Invalid choice!');
            rl.question('\nPress Enter to continue...', () => {
                algorithmsMenu();
            });
    }
}

function handleProblemsChoice(choice) {
    switch (choice) {
        case '1':
            runScript('./problems/easy/array-problems.js');
            break;
        case '2':
            console.log('Medium problems coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '3':
            console.log('Hard problems coming soon!');
            rl.question('\nPress Enter to continue...', () => main());
            break;
        case '4':
            main();
            break;
        default:
            console.log('Invalid choice!');
            rl.question('\nPress Enter to continue...', () => {
                problemsMenu();
            });
    }
}

function dataStructuresMenu() {
    showDataStructuresMenu();
    rl.question('Enter your choice (1-9): ', (choice) => {
        handleDataStructuresChoice(choice);
    });
}

function algorithmsMenu() {
    showAlgorithmsMenu();
    rl.question('Enter your choice (1-6): ', (choice) => {
        handleAlgorithmsChoice(choice);
    });
}

function problemsMenu() {
    showProblemsMenu();
    rl.question('Enter your choice (1-4): ', (choice) => {
        handleProblemsChoice(choice);
    });
}

function main() {
    showMenu();
    rl.question('Enter your choice (1-4): ', (choice) => {
        switch (choice) {
            case '1':
                dataStructuresMenu();
                break;
            case '2':
                algorithmsMenu();
                break;
            case '3':
                problemsMenu();
                break;
            case '4':
                console.log('👋 Happy coding! Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice! Please try again.');
                setTimeout(main, 1000);
        }
    });
}

// Start the application
main();
