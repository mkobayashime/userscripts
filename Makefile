ts-node = node --import @swc-node/register/esm-register
jest = NODE_OPTIONS='--experimental-vm-modules' yarn run jest

node_modules: package.json yarn.lock
ifeq ($(MAKE_YARN_FROZEN_LOCKFILE), 1)
	yarn install --frozen-lockfile
else
	yarn install
endif
	@touch node_modules

lint: node_modules
	yarn eslint .

lint.fix: node_modules
	yarn eslint --fix .

lint.fix.dist: node_modules
	yarn eslint --fix dist

format: node_modules
	yarn prettier --write .

format.check: node_modules
	yarn prettier --check .

dev: node_modules
	$(ts-node) bin/dev.ts

build: node_modules
	yarn run rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
	@make format
	@make lint.fix.dist

docgen: node_modules
	$(ts-node) bin/docgen.ts
	@make format

typecheck: node_modules
	yarn tsc --noEmit

typecheck.watch: node_modules
	yarn tsc --noEmit --watch

test: node_modules
	$(jest)

test.watch: node_modules
	$(jest) --watch

scaffold.script:
	@./bin/scaffold-script.sh

open.dist.in.remote:
	@./bin/open-dist-in-remote.sh
