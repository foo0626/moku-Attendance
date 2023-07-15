const UserReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;

// const UserReducer = (state = null, action) => {
//   switch (action.type) {
//     case 'UPDATE_USER':
//       return {
//         username: action.payload.username,
//         gender: action.payload.username
//       }
//     default:
//       return state;
//   }
// };

// export default UserReducer;
