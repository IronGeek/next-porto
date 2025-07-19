import { DbManager } from '@/lib/db/manager';
import { registerService } from '@/lib/services';

const dbSymbol = Symbol.for('db');
const db = registerService(dbSymbol, () => new DbManager(process.env.SQLITE_DB_FILE || 'data/app.db'));

export { db, dbSymbol };
