const db = require('../data/dbConfig')
const Hobbits = require('./hobbitsModel')

describe('hobbits model', () => {
    describe('insert()', () => {
        it('should inserts hobbits into the database', async () => {
            await Hobbits.insert({name:'gaffer'});
            await Hobbits.insert({name:'sam'});

            const addedHobbits = await db('hobbits');
            expect(addedHobbits).toHaveLength(2);
        })

        it('should add a single hobbit', async () => {
            let hobbit = await Hobbits.insert({name: 'gaffer'})
            expect(hobbit.name).toBe('gaffer');

            hobbit = await Hobbits.insert({ name: 'sam' })
            expect(hobbit.name).toBe('sam')
        })
    })

    describe('remove()', () => {
        it('should remove a single hobbit', async () => {
            let addHobbit = await Hobbits.insert({name: 'gaffer'});
            let removeHobbit = await Hobbits.remove(addHobbit.id)
            expect(removeHobbit).toBe(1) 
        })

        it('should remove another hobbit', async () => {
            let addHobbit = await Hobbits.insert({name: 'frodo'});
            let removeHobbit = await Hobbits.remove(addHobbit.id)
            expect(removeHobbit).toBe(1) 
        })
    })
})

beforeEach(async () => {
    await db('hobbits').truncate();
})


