# Keeping This File Updated

When completing tasks, update this file and report the updates summary if you:

- Update utilities, hooks, or shared functions already documented, or add new ones.
- Change architectural patterns or data flow
- Add new external dependencies or APIs
- Establish new coding conventions

# Language / Package manager

- TypeScript
- Bun (as a package manager and runtime)
  - Always use Bun over npm, yarn, pnpm or Node.
  - When adding new packages, add them as `devDependencies` instead of `dependencies`.

# Lint

Use these `make` commands, or execute the corresponding commands specified in `Makefile` directly if needed.

- `make typecheck`
- `make lint.fix`

# Coding rules

## ログの出力・例外処理

userscript に書かれた処理は基本的に全て他者の Web アプリケーション上で実行される
`console.*` で出力したログは全てアプリケーション運営者の運用・監視の迷惑になる可能性があるので、できる限り数を減らす

- 特に `warn`/`error` で出力するのは避ける
- 完成後にログを出す処理は原則的に残さない
  - つまり例外の発生時はエラーを出さず、サイレントに終了する
  - 失敗したことにユーザーが気づけることが重要な場合は `window.alert` などを活用する
- 実装中に挙動を確認したり値を知りたいなど、開発中に必要な場合は許容
