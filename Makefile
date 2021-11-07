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

docgen: install
	node --loader ts-node/esm bin/docgen.ts
	@make format
