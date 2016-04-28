.PHONY: publish

dev:
	npm run dev

build:
	npm run prepublish

example:
	npm run build

publish: example
	gh-pages -d ./public
