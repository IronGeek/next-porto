async function ensureFile(fs, path: string) {
  try {
    await fs.stat(path);

    return true;
  } catch (e) {
    if (e.code !== 'ENOENT') { throw e; }

    return false;
  }
}

function formatTime(hrtime: [number, number]): string {
  const [sd, ns] = hrtime;
  const ms = (sd * 1000) + (ns / 1000000);

  return `${ms.toFixed(0)}ms`;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const start = process.hrtime();
    const initdb = !!process.env.DB_INIT;

    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const promise = await import('./lib/promise.ts');
      const db = await import('./lib/db/init.ts');

      await promise.delay(100);
      process.stdout.write(' ○ Initializing database...');

      const cwd = process.cwd();
      const dbFile = path.resolve(cwd, process.env.SQLITE_DB_FILE || 'data/app.db');
      const relPath = path.relative(cwd, dbFile);

      if (await ensureFile(fs, dbFile) && !initdb) {
        process.stdout.write(`\x1b[1K\r ✓ Database (${relPath}) already exist\n`);
      } else {
        const dbPath = path.dirname(dbFile);

        await fs.mkdir(dbPath, { recursive: true });

        if (initdb) {
          process.stdout.write('\x1b[1K\r ○ Backing up database...');

          const dbName = path.basename(dbFile, path.extname(dbFile));
          const bkName = path.join(dbPath, `${dbName}-${Date.now()}.db`);

          await fs.rename(dbFile, bkName);

          const bkEnd = formatTime(process.hrtime(start));
          process.stdout.write(`\x1b[1K\r ✓ Backup ${path.relative(cwd, bkName)} in ${bkEnd}\n`);

          process.stdout.write(' ○ Initializing database...');
        }

        db.initialize(dbFile);

        const end = formatTime(process.hrtime(start));
        process.stdout.write(`\x1b[1K\r ✓ Initialized ${relPath} in ${end}\n`);
      }
    } catch (err) {
      process.stdout.write(`\x1b[1K\r 𐄂 Error initializing database:\n`);

      throw err;
    }
  }
}
