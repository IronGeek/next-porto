import LibSql from 'libsql';

class DbManager {
  readonly #db: LibSql.Database;

  constructor(db: string | LibSql.Database) {
    if (db instanceof LibSql) {
      this.#db = db;
    } else {
      this.#db = new LibSql(db || ':memory:', { verbose: console.log });

      // enable WAL mode
      this.#db.pragma('journal_mode = WAL');
    }
  }

  run<TParameter extends unknown[] | {} = unknown[]>(sql: string, params?: TParameter): LibSql.RunResult {
    return this.#db.prepare<TParameter>(sql).run(params);
  }

  get<TResult extends unknown = unknown, TParameter extends unknown[] | {} = unknown[]>(
    sql: string, params?: TParameter
  ): TResult | null {
    return this.#db.prepare(sql).get(params) as TResult;
  }

  exec<TResult extends unknown = unknown, TParameter extends unknown[] | {} = Partial<TResult>>(
    sql: string, params?: TParameter
  ): TResult | null {
    return this.#db.prepare(sql).get(params) as TResult;
  }

  all<TResult extends unknown = unknown, TParameter extends unknown[] | {} = unknown[]>(
    sql: string, params?: TParameter
  ): TResult[] {
    return this.#db.prepare<TParameter>(sql).all(params) as TResult[];
  }

  close() {
    this.#db.close();
  }

  begin(): this {
    this.#db.exec('BEGIN');

    return this;
  }

  commit(): this {
    this.#db.exec('COMMIT');

    return this;
  }

  rollback(): this {
    this.#db.exec('ROLLBACK');

    return this;
  }
}

export { DbManager };
