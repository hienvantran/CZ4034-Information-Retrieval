# CZ4034-Information-Retrieval

1. Create a core in solr: solr create -c core_name
2. Start the solr with "bin\solr.cmd start" command on Windows 

      We will modify managed-schema and solrconfig in "conf" folder in the newly created core (directory: \solr-8.11.1\server\solr\core_name) for stemming and spell checking.

3. Update the managed-schema with field name without manually keying in the fields:


      Run the command to post data - solr will auto detect fields:
      
      
            java -Dc=core_name -Dtype=text/csv -Dfiletypes=text/csv -jar example\exampledocs\post.jar server\solr\core_name\data\*.csv
            
      Note: change core_name to the core that you've created
4. (stemming) Add the following to the managed-schema
````
      <fieldType name="text_gen_stem" class="solr.TextField" positionIncrementGap="100">
            <analyzer type="index">
           <tokenizer class="solr.WhitespaceTokenizerFactory"/>
           <filter class="solr.StopFilterFactory" words="stopwords.txt"/>
           <filter class="solr.LowerCaseFilterFactory"/>
           <filter class="solr.SnowballPorterFilterFactory" language="English"/>
              <filter class="solr.NGramFilterFactory" minGramSize="2" maxGramSize="15"/>
            </analyzer>
            <analyzer type="query">
           <tokenizer class="solr.WhitespaceTokenizerFactory"/>
           <filter class="solr.StopFilterFactory" words="stopwords.txt"/>
           <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
           <filter class="solr.LowerCaseFilterFactory"/>
           <filter class="solr.SnowballPorterFilterFactory" language="English"/>         
            </analyzer>
        </fieldType>

      <!-- change the field type want to stem -->
      <field name="text" type="text_gen_stem"/>
````
5. (spell checking) We use IndexBasedSpellChecker: use the Solr index as the source for a parallel index used for spell checking. You must define a field as the basis for the index terms. Therefore, copy terms from some fields (such as text) to another field that you create for spell checking purposes (spellcheck). 

a. Create new field in the managed-schema:
```` 
  <field name="spellcheck" type="text_general" multiValued="true" indexed="true" stored="false"/>
````
and copy 'text' field to this newly created field 'spellcheck':
````
  <copyField source="text" dest="spellcheck"/>
````
b. Change the solr config 
- spellCheckcomponent + /spell handler-(default is /select, here change to /spell)
````
<searchComponent name="spellcheck" class="solr.SpellCheckComponent">
      <lst name="spellchecker">
        <!-- decide between dictionary based vs index based spelling suggestions, 
        in most cases it makes sense to use index based spell checker
        as it only generates terms which are 
        actually present in your search corpus -->
        <str name="classname">solr.IndexBasedSpellChecker</str>
        <!-- field to use -->
        <str name="field">spellcheck</str>
        <!-- buildOnCommit|buildOnOptimize -->
        <str name="buildOnCommit">true</str>
        <!-- $solr.solr.home/data/spellchecker-->
        <str name="spellcheckIndexDir">./spellchecker</str>
        <str name="accuracy">0.7</str>
        <float name="thresholdTokenFrequency">.0001</float>
      </lst>
    </searchComponent>

  <!-- A request handler for demonstrating the spellcheck component.

       NOTE: This is purely as an example.  The whole purpose of the
       SpellCheckComponent is to hook it into the request handler that
       handles your normal user queries so that a separate request is
       not needed to get suggestions.

       IN OTHER WORDS, THERE IS REALLY GOOD CHANCE THE SETUP BELOW IS
       NOT WHAT YOU WANT FOR YOUR PRODUCTION SYSTEM!

       See http://wiki.apache.org/solr/SpellCheckComponent for details
       on the request parameters.
    -->
  <requestHandler name="/spell" class="solr.SearchHandler" startup="lazy">
    <lst name="defaults">
      <!-- Solr will use suggestions from both the 'default' spellchecker
           and from the 'wordbreak' spellchecker and combine them.
           collations (re-written queries) can include a combination of
           corrections from both spellcheckers -->
      <str name="spellcheck.dictionary">default</str>
      <str name="spellcheck">on</str>
      <str name="spellcheck.extendedResults">true</str>
      <str name="spellcheck.count">10</str>
      <str name="spellcheck.alternativeTermCount">5</str>
      <str name="spellcheck.maxResultsForSuggest">5</str>
      <str name="spellcheck.collate">true</str>
      <str name="spellcheck.collateExtendedResults">true</str>
      <str name="spellcheck.maxCollationTries">10</str>
      <str name="spellcheck.maxCollations">5</str>
    </lst>
    <arr name="last-components">
      <str>spellcheck</str>
    </arr>
  </requestHandler>
````
- /select handler - default (find /select)
````
<requestHandler name="/select" class="solr.SearchHandler">
    <!-- default values for query parameters can be specified, these
         will be overridden by parameters in the request
      -->
    <lst name="defaults">
      <str name="echoParams">explicit</str>
      <int name="rows">10</int>
      <!-- Default search field
         <str name="df">text</str> 
        -->
      <!-- Change from JSON to XML format (the default prior to Solr 7.0)
         <str name="wt">xml</str> 
        -->
      <!-- spell check component configuration -->
        <str name="spellcheck">true</str>
        <str name="spellcheck.count">5</str>
        <str name="spellcheck.collate">true</str>
        <str name="spellcheck.maxCollationTries">5</str>
    </lst>    
      <arr name="last-components">
        <str>spellcheck</str>
      </arr>
  </requestHandler>
````

6. Update data for indexing: 
      java -Dc=core_name -Dtype=text/csv -Dfiletypes=text/csv -jar example\exampledocs\post.jar server\solr\core_name\data\*.csv
      
7. Reindexing:
      Select "Documents" in the Solr Core. Change the document type to "XML" then type in "<delete><query>*:*</query></delete>" in the "Documents(s)" textbox and click "Submit Document"

8. Download the model
      https://entuedu-my.sharepoint.com/:u:/g/personal/eong016_e_ntu_edu_sg/ESJGFMiK42RFg-JlZpO7I-MBJCxjij37KF4-D-DDtWX9iA?e=upTOJG

## Note: 
1. Change core_name to the core that you've created
2. Each time change the config files, remember to reload the core (can do from Admin UI under Core Admin) and reindex the files.
3. To test stemming:
- use debugQuery
- use Analyser - key the word in Index/Query to see how see how Solr does to Index/Query.
4. To test spell checking:
- In request-handler (qt), type ````/spell````
- Check 'spellcheck' checkbox.
- Type the query in q is enough
5. The correct configurations are uploaded here with core_name = dummy, and the sample data (csv files) are not up-to-date. Please change the sample data to the latest version.
