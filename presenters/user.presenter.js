module.exports = {
    userPresenter: (user) => {
        return {
            _id: user.id,
            name: user.name,
            age: user.age,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,

        }
    }
}
