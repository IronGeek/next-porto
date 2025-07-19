## Notice for  Testing

### SQLite (libSQL) storage

1. The static array storage for the `/projects/**/*` endpoints is now migrated to SQLite (libSQL):

   To set the database file location set the `SQLITE_DB_FILE` environment variable in the `.env`
   By default `data/app.db` will be used when no value is specified for the `SQLITE_DB_FILE` variable.

   The database initialized upon starting the `next` server taking advantage of Next.js `instrumentation.ts|js` mechanism

2. Thumbnails are uploaded and permanently stored in the `/public` directory. Make sure have enough permission write to this directory.

3. All changes and new entries added will new survive `next` server restart, including all thumbnails uploaded.
 