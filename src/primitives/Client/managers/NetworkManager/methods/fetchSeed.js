async function fetchSeed() {
    const randomSeed = this.seeds[Math.floor(Math.random() * this.seeds.length)];
    console.log({randomSeed})
    try{
        const response = await fetch(randomSeed);
        let data = await response.json();
        data = ['localhost:8888'];
        console.log({'REMOVEME': data});
        // console.log({data});
        return data;
    } catch(e) {
        console.error(e);
        throw new Error(e.cause || e.message || e);
        // return ['http://localhost:8888'];
    }
}

export default fetchSeed;
