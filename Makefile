.PHONY: help
.DEFAULT_GOAL := help
help:
	@awk -F ':.*?## ' '/^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

test: ## Run tests
	pnpm test

run: ## Run the application
	pnpm dev

supply: ## Get the current USDC supply
	pnpm exec ts-node --project tsconfig.json scripts/get-supply.ts

show_mint: ## Show USDC mints between two blocks. Usage: make show_mint FROM_BLOCK=1 TO_BLOCK=2
	@pnpm exec ts-node --project tsconfig.json scripts/show-mints.ts $(FROM_BLOCK) $(TO_BLOCK)

show_burn: ## Show USDC burns between two blocks. Usage: make show_burn FROM_BLOCK=1 TO_BLOCK=2
	@pnpm exec ts-node --project tsconfig.json scripts/show-burns.ts $(FROM_BLOCK) $(TO_BLOCK)