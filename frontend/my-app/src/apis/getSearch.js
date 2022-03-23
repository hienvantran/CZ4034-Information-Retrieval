import _ from 'lodash';

export const getSearch = _.memoize(async term => {
    const res = await fetch(`http://localhost:8983/solr/CZ4034/spell?debugQuery=true&df=text&indent=true&q.op=OR&q=${term}&sort=like_count%20desc&wt=json`)
    if (res.status !== 200) return [];
    const tweetsArray = await res.json();
    console.log("this is result: " + JSON.stringify(tweetsArray.response.docs));
    console.log(tweetsArray.response.numFound)
    return tweetsArray;
});