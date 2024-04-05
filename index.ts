#! /usr/bin/env node


import inquirer from 'inquirer';
import chalk from 'chalk';


console.log(chalk.greenBright('Currency Converter', { horizontalLayout: 'full' }));

interface ConversionRates {
    [key: string]: number;
}

const conversionRates: ConversionRates = {
    'USD to EUR': 0.93,
    'EUR to USD': 1.08,
    'USD to GBP': 0.76,
    'GBP to USD': 1.31,
    'USD to PKR': 230.50,
    'PKR to USD': 0.0043,
    // Add more pairs as desired
};

async function convertCurrency(amount: number, conversionChoice: string): Promise<number> {
    const rate = conversionRates[conversionChoice];
    return amount * rate;
}

function askQuestions() {
    const questions = [
        {
            type: 'input',
            name: 'amount',
            message: chalk.blueBright('Enter the amount you\' like to convert:'),
            validate: (value: string) => {
                const valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        },
        {
            type: 'list',
            name: 'conversionChoice',
            message: chalk.yellow('Choose your conversion:'),
            choices: Object.keys(conversionRates),
        },
    ];

    return inquirer.prompt(questions);
}

async function main() {
    try {
        const answers = await askQuestions();
        const { amount, conversionChoice } = answers;
        const convertedAmount = await convertCurrency(amount, conversionChoice);
        console.log(chalk.blue(`\n${amount} converted is approximately ${chalk.bold(convertedAmount.toFixed(2))}. 🌍\n`));
    } catch (error) {
        console.error(chalk.red('An error occurred during the conversion.'));
    }
}

main();
