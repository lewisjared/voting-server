import models from '../models'

export default store => next => action => {
  if (action.type == 'VOTE') {
    models.Vote.create({
        room: action.room,
        user: action.clientId,
        entry: action.entry
      })
      .then(() => {
        return next(action)
      })
  }

  return next(action);
}