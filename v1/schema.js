module.exports = {
    post: {
        '/': {
            title: 'test',
            data: {
                email: {
                    type: 'string',
                    required: true
                },
                password: {
                    type: 'string',
                    required: true
                }
            }
        }
    }
}