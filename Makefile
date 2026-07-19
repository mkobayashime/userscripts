bundlemonkey = bunx --bun bundlemonkey
oxlint = bunx oxlint
oxfmt = bunx oxfmt
biome = bunx biome

node_modules: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: node_modules PHONY
	$(oxfmt) --check
	$(oxlint) --type-aware
	$(biome) check .

lint.fix: node_modules PHONY
	$(oxfmt)
	$(oxlint) --fix --type-aware
	$(biome) check --fix .

lint.fix.dist: node_modules PHONY
	$(oxfmt) dist
	$(oxlint) -c oxlint.dist.config.ts --fix dist

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
