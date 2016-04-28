.PHONY: publish

dev:
	npm run dev

build:
	npm run prepublish

example:
	npm run build

publish:
	git checkout gh-pages
	git merge master
	git push origin gh-pages
	git checkout master
