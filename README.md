## Notice for  Testing

1. Since the app uses static array as backends storage, for consistent result, please use the production build to test CRUD functionality in `/projects/**/*`:

   ```sh
   pnpm build && pnpm start
   ```

2. Thumbnails are uploaded and permanently stored in the `/public` directory. Make sure you enough permission write to this directory.

3. All changes and new entries added will be lost when the `next` server restarted, but thumbnails uploaded will remain in their directory until manually deleted.
 