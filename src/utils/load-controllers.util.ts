import { Express } from 'express';
import fs from 'fs';
import path from 'path';

export async function loadControllers(app: Express): Promise<void> {
    const controllersDir = path.resolve(__dirname, '../controllers');

    const files = fs.readdirSync(controllersDir);
    
    console.log('\nloading controllers...');

    for (const file of files) {
        if (!file.endsWith('.controller.js') && !file.endsWith('.controller.ts')) {continue;}

        const route = file.replace('.controller.ts', '').replace('.controller.js', '').toLocaleLowerCase();

        const importPath = `../controllers/${file}`;

        await import(importPath)
            .then((module) => {
                app.use(`/${route}`, module.default);

                console.log(`loaded controller: ${route}`);
            })
            .catch((err) => console.error(`\n\tError loading the controller ${file}\n`, err));
    }

    console.log('');
}
