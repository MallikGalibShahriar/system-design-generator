#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { analyzeRepo } from './analyzer.js';
import { generateDesign } from './generator.js';
import fs from 'fs-extra';

const program = new Command();

program
    .name('sys-design-gen')
    .description('Generate system design documentation from a repository')
    .version('1.0.0')
    .argument('[path]', 'Path to the repository', '.')
    .option('-o, --output <filename>', 'Output filename', 'SYSTEM_DESIGN.md')
    .action(async (repoPath, options) => {
        const absolutePath = path.resolve(repoPath);
        console.log(chalk.blue(`\n🔍 Analyzing repository at: ${absolutePath}\n`));

        const spinner = ora('Scanning files...').start();

        try {
            if (!fs.existsSync(absolutePath)) {
                spinner.fail(chalk.red('Repository path does not exist!'));
                process.exit(1);
            }

            // 1. Analyze
            spinner.text = 'Analyzing project structure...';
            const analysis = await analyzeRepo(absolutePath);
            spinner.succeed(chalk.green('Analysis complete!'));

            // 2. Generate
            spinner.start('Generating system design document...');
            const documentation = generateDesign(analysis);

            const outputPath = path.join(process.cwd(), options.output);
            await fs.writeFile(outputPath, documentation);

            spinner.succeed(chalk.green(`System design generated at: ${outputPath}`));

            console.log(chalk.yellow('\nDetected Tech Stack:'));
            analysis.techStack.forEach(tech => console.log(` - ${tech}`));

        } catch (error: any) {
            spinner.fail(chalk.red('An error occurred during generation.'));
            console.error(error);
        }
    });

program.parse(process.argv);
