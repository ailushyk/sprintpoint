export const api = () => ({
  user: {
    info: () => {
      return {
        fullName: 'John Doe',
        email: 'john@test.com',
        phone: '123456789',
        username: '@john',
        avatar: '', //https://i.pravatar.cc/60',
      }
    },
    login: '/api/user/login',
    logout: '/api/user/logout',
    register: '/api/user/register',
    update: '/api/user/update',
    updatePassword: '/api/user/updatePassword',
    updateAvatar: '/api/user/updateAvatar',
    updateEmail: '/api/user/updateEmail',
    updatePhone: '/api/user/updatePhone',
    updateNickname: '/api/user/updateNickname',
    updateSignature: '/api/user/updateSignature',
  },
})
