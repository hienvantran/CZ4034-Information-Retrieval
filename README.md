# CZ4034-Information-Retrieval

1. Create a core in solr
2. Start the solr with "bin\solr.cmd start" command on Windows 
3. Create "conf" and "data" folder in the newly created core
4. Add the following to the managed-schema

      stemming:
      add in schema:
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

      change the field type want to stem
      <field name="text" type="text_gen_stem"/>

5. 