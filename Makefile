.PHONY: publish dev test example

dev:
	yarn dev

build:
	yarn prepublish

publish:
	npm version patch
	npm publish .

test:
	yarn test

testwatch:
	yarn test-watch

example: build
	yarn build

publish_pages: example
	gh-pages -d ./public
