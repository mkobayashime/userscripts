bundlemonkey = bunx --bun bundlemonkey
biome = bunx biome
eslint = bunx eslint

node_modules: PHONY
	bun install

lint: node_modules PHONY
	$(biome) check .
	$(eslint) .

lint.fix: node_modules PHONY
	$(biome) check --fix .
	$(eslint) --fix .

lint.fix.dist: node_modules PHONY
	$(biome) check --config-path ./biome-dist.json --fix dist
	$(eslint) --fix dist

dev: dev.remote PHONY

dev.remote: node_modules PHONY
	$(bundlemonkey) --watch --remote

dev.static: node_modules PHONY
	$(bundlemonkey) --watch

build: node_modules clear PHONY
	$(bundlemonkey)
	sed -i -E 's@^\s*//\s*eslint-disable-.+$$@@' dist/*
	@make lint.fix.dist

clear: PHONY
	rm -rf dist

docgen: node_modules PHONY
	bun run bin/docgen.ts
	@make lint.fix

typecheck: node_modules PHONY
	bunx tsc --noEmit

typecheck.watch: node_modules PHONY
	bunx tsc --noEmit --watch

open.dist.in.remote: PHONY
	@./bin/open-dist-in-remote.sh

PHONY:
