install:
	yarn install

lint: install
	yarn eslint .

lint.fix: install
	yarn eslint --fix .

format: install
	yarn prettier --write .

format.check: install
	yarn prettier --check .

dev: install
	yarn run rollup --config --watch

build: install
	yarn run rollup --config

docgen: install
	node --loader ts-node/esm bin/docgen.ts
	@make format
