ts-node = node --import tsx
eslint = pnpm exec eslint
vitest = pnpm exec vitest

node_modules: package.json pnpm-*.yaml
	pnpm install
	@touch node_modules

lint: node_modules
	$(eslint) .

lint.fix: node_modules
	$(eslint) --fix .

lint.fix.dist: node_modules
	$(eslint) --fix dist

format: node_modules
	pnpm exec prettier --write .

format.check: node_modules
	pnpm exec prettier --check .

dev: node_modules
	$(ts-node) bin/dev.ts

build: node_modules
	pnpm exec rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
	@make format
	@make lint.fix.dist

docgen: node_modules
	$(ts-node) bin/docgen.ts
	@make format

typecheck: node_modules
	pnpm exec tsc --noEmit

typecheck.watch: node_modules
	pnpm exec tsc --noEmit --watch

test: node_modules
	$(vitest) run

test.watch: node_modules
	$(vitest) watch

scaffold.script:
	@./bin/scaffold-script.sh

open.dist.in.remote:
	@./bin/open-dist-in-remote.sh
