import _ from 'lodash';

export const getSearch = _.memoize(async(term, sort) => {
    let sorting = '';
    console.log("this is sort: " + sort);
    sort === '' ? sorting = '' : sorting = sort + '%20desc';
    console.log("this is sort: " + sorting);

    const res = await fetch(`http://localhost:8983/solr/CZ4034/spell?debugQuery=true&df=text&indent=true&q.op=AND&q=${term}&sort=${sorting}&wt=json`)
    if (res.status !== 200) return [];
    const tweetsArray = await res.json();
    console.log(tweetsArray.response.numFound)
    return tweetsArray;
});