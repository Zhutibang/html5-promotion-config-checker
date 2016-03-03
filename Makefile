test:
	html5-promotion-checker ./Project
	
update-project:
	git submodule update --remote Project
	git add Project 
	git commit -m 'Uprgrade `Project/` at $(shell date)'
	
	
.PHONY: test update-project
