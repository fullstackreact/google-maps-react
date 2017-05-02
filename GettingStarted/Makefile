.PHONY: publish dev test example

dev:
	npm run dev

build:
	npm run prepublish

publish:
	npm version patch
	npm publish .

test:
	npm run test

testwatch:
	npm run test-watch

example:
	npm run build

publish_pages: example
	gh-pages -d ./public
