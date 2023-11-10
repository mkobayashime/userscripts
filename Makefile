ts-node = node --loader ts-node/esm --experimental-specifier-resolution=node

install:
	yarn install

lint: install
	yarn eslint .

lint.fix: install
	yarn eslint --fix .

lint.fix.dist: install
	yarn eslint --fix dist

format: install
	yarn prettier --write .

format.check: install
	yarn prettier --check .

dev: install
	$(ts-node) bin/dev.ts

build: install
	yarn run rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
	@make format
	@make lint.fix.dist

docgen: install
	$(ts-node) bin/docgen.ts
	@make format

typecheck: install
	yarn tsc --noEmit

typecheck.watch: install
	yarn tsc --noEmit --watch

test: install
	yarn run ava

test.watch: install
	yarn run ava --watch

scaffold.script:
	@./bin/scaffold-script.sh

open.dist.in.remote:
	@./bin/open-dist-in-remote.sh
