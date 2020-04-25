class FriendsList {
    friends = []

    addFriend(name){
        this.friends.push(name)
        this.announceFriends(name)
    }
    announceFriends(name){
        console.log(`${name} is now a friend`);
    }
    removeFriend(name){
        const idx = this.friends.indexOf(name)
        if(idx===-1) throw new Error('Friend not found!')
        this.friends.splice(idx,1)
    }
}

// test
describe('FriendList',()=>{
    let friendsList;

    beforeEach(()=>{
        friendsList = new FriendsList()
    })

    it('initializes friends list',()=>{
        // const friendsList = new FriendsList()
        expect(friendsList.friends.length).toEqual(0)
    })

    it('adds a friend to the list',()=>{
        // const friendsList = new FriendsList()
        friendsList.addFriend('Samuel')
        expect(friendsList.friends.length).toEqual(1)
    })
    it('announces friendship',()=>{
        // const friendsList = new FriendsList()
        friendsList.announceFriends = jest.fn()
        expect(friendsList.announceFriends).not.toHaveBeenCalled()
        friendsList.addFriend('Samuel')
        // expect(friendsList.announceFriends).toHaveBeenCalled()
        expect(friendsList.announceFriends).toHaveBeenCalledWith('Samuel')
    })

    
    describe('Remove Friend',()=>{
        it('remove a friend from the list',()=>{
            friendsList.addFriend('Samuel')
            expect(friendsList.friends[0]).toEqual('Samuel')
            friendsList.removeFriend('Samuel')
            expect(friendsList.friends[0]).toBeUndefined()
        })
        it('throws an error as friand does not exist',()=>{
            // expect(()=>friendsList.removeFriend('Samuel')).toThrow(Error)
            expect(()=>friendsList.removeFriend('Samuel')).toThrow(new Error('Friend not found!'))
            
        })
    })
})
// describe('my test',()=>{
//     it('returns true',()=>{
//         expect(true).toEqual(true)
//     })
// })