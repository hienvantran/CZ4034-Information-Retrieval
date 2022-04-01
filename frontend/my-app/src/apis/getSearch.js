import _ from 'lodash';

export const getSearch = _.memoize(async params => {
    let term = params.term;
    let sort = params.sort;
    let sorting = '';

    sort === '' ? sorting = '' : sorting = sort + '%20desc';


    const res = await fetch(`http://localhost:8983/solr/CZ4034/spell?debugQuery=true&df=text&indent=true&q.op=AND&q=${term}&sort=${sorting}&rows=50&wt=json`)
    if (res.status !== 200) return [];
    const tweetsArray = await res.json();
    console.log(tweetsArray.response)
    return tweetsArray;
});