import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

export interface RepoAnalysis {
    projectName: string;
    techStack: string[];
    structure: string[];
    projectType: 'Frontend' | 'Backend' | 'Fullstack' | 'Library/Tool' | 'Unknown';
}

export async function analyzeRepo(repoPath: string): Promise<RepoAnalysis> {
    const analysis: RepoAnalysis = {
        projectName: path.basename(repoPath),
        techStack: [],
        structure: [],
        projectType: 'Unknown',
    };

    // 1. Scan top-level directories
    const files: string[] = await fs.readdir(repoPath);
    analysis.structure = files.filter((f: string) => !f.startsWith('.')); // Exclude usage of .git, .vscode etc in summary

    // 2. Detect Tech Stack from package.json
    const packageJsonPath = path.join(repoPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        try {
            const pkg = await fs.readJson(packageJsonPath);
            const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

            const techKeywords = [
                'react', 'vue', 'angular', 'svelte', 'next', 'nuxt',
                'express', 'nest', 'fastify', 'koa',
                'mongodb', 'mongoose', 'pg', 'mysql', 'sequelize', 'typeorm', 'prisma',
                'redis', 'graphql', 'apollo',
                'typescript', 'tailwindcss', 'bootstrap', 'material-ui'
            ];

            Object.keys(allDeps).forEach(dep => {
                if (techKeywords.some(k => dep.includes(k))) {
                    // Clean up names if needed, or just push the package name
                    // Simple mapping
                    if (dep.includes('react')) analysis.techStack.push('React');
                    else if (dep.includes('vue')) analysis.techStack.push('Vue.js');
                    else if (dep.includes('express')) analysis.techStack.push('Express.js');
                    else if (dep.includes('nest')) analysis.techStack.push('NestJS');
                    else if (dep.includes('mongo')) analysis.techStack.push('MongoDB');
                    else if (dep.includes('pg') || dep.includes('postgres')) analysis.techStack.push('PostgreSQL');
                    else if (dep.includes('prisma')) analysis.techStack.push('Prisma');
                    else if (dep.includes('typescript')) analysis.techStack.push('TypeScript');
                    else if (dep.includes('tailwind')) analysis.techStack.push('Tailwind CSS');
                    else analysis.techStack.push(dep);
                }
            });
        } catch (e) {
            console.warn('Could not read package.json');
        }
    }

    // 3. Detect other files (Docker, Makefiles, etc)
    if (fs.existsSync(path.join(repoPath, 'Dockerfile'))) analysis.techStack.push('Docker');
    if (fs.existsSync(path.join(repoPath, 'docker-compose.yml'))) analysis.techStack.push('Docker Compose');

    // Deduplicate
    analysis.techStack = Array.from(new Set(analysis.techStack));

    // Determine Project Type
    const hasFrontend = analysis.techStack.some(t => ['React', 'Vue.js', 'Angular', 'Next'].some(f => t.includes(f)));
    const hasBackend = analysis.techStack.some(t => ['Express.js', 'NestJS', 'Fastify', 'MongoDB'].some(b => t.includes(b)));

    if (hasFrontend && hasBackend) analysis.projectType = 'Fullstack';
    else if (hasFrontend) analysis.projectType = 'Frontend';
    else if (hasBackend) analysis.projectType = 'Backend';
    else if (fs.existsSync(packageJsonPath)) analysis.projectType = 'Library/Tool';

    return analysis;
}
