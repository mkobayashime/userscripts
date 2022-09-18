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
	yarn run rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript --watch

build: install
	yarn run rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
	@make format
	@make lint.fix.dist

docgen: install
	node --loader ts-node/esm bin/docgen.ts
	@make format

typecheck: install
	yarn tsc --noEmit

typecheck.watch: install
	yarn tsc --noEmit --watch

scaffold.script:
	@./bin/scaffold-script.sh
