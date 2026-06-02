# SAM build targets (invoked from infra/template.yaml with CodeUri: ..)

.PHONY: build-DocFlowSyncFunction

build-DocFlowSyncFunction:
	$(if $(wildcard node_modules/esbuild/bin/esbuild),,pnpm install --ignore-scripts)
	./node_modules/.bin/esbuild apps/docflow/lambda/sync-cron/handler.ts \
		--bundle \
		--platform=node \
		--target=node20 \
		--format=cjs \
		--outfile=$(ARTIFACTS_DIR)/handler.js \
		--alias:@=$(CURDIR)/apps/docflow/src \
		--external:@aws-sdk/*
