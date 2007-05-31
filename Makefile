all:
	sh build.sh
	@echo "Checklist:"
	@echo " * No debug statements"
	@echo " * Document new features"
	@ver=`sed -ne 's, *<\(em:version\)>\([^<]*\)</\1>,\2,p' install.rdf`; \
	 mv tabsearch.xpi tabsearch-$$ver.xpi; \
	 echo "Created tabsearch-$$ver.xpi";

release: 
	@ver=`sed -ne 's, *<\(em:version\)>\([^<]*\)</\1>,\2,p' install.rdf`; \
	 cp -v tabsearch-$$ver.xpi ~/s/files/firefox-tabsearch \




