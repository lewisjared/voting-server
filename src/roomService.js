import models from './models'
import uuid from 'uuid'

export function createLink() {
  return uuid.v4();
}

export function createRoom(name) {
  let link = createLink();
  return models.Room.create({
    name,
    link
  })
}

export function getRoomByLink(link) {
  return models.Room.find({
    where: {
      link
    }
  })
  .then((room) => {
    if (!room) {
      return Promise.reject('no matching links');
    }
    return room;
  })
}