ts-node = node --import tsx
biome = bunx biome
eslint = bunx eslint
vitest = bunx vitest

node_modules: PHONY
	bun install

lint: node_modules PHONY
	$(biome) check .
	$(eslint) .

lint.fix: node_modules PHONY
	$(biome) check --fix .
	$(eslint) --fix .

lint.fix.dist: node_modules PHONY
	$(biome) check --fix dist
	$(eslint) --fix dist

dev: node_modules PHONY
	$(ts-node) bin/dev.ts

build: node_modules PHONY
	bunx rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
	@make lint.fix.dist

docgen: node_modules PHONY
	$(ts-node) bin/docgen.ts
	@make lint.fix

typecheck: node_modules PHONY
	bunx tsc --noEmit

typecheck.watch: node_modules PHONY
	bunx tsc --noEmit --watch

test: node_modules PHONY
	$(vitest) run

test.watch: node_modules PHONY
	$(vitest) watch

scaffold.script: PHONY
	@./bin/scaffold-script.sh

open.dist.in.remote: PHONY
	@./bin/open-dist-in-remote.sh

PHONY:
