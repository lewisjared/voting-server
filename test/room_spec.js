import {createLink, createRoom, getRoomByLink} from '../src/roomService'
import models from '../src/models'
import {expect} from 'chai';

describe('roomService', () => {
  beforeEach((done) => {
    models.Room.sync({force: true})
      .then(() => {
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  describe('createLink', () => {
    it('contains no /', () => {
      let value = createLink();

      expect(value).to.not.have.string('/')
    });

    it('should be unique', () => {
      let v1 = createLink();
      let v2 = createLink();

      expect(v1).not.equal(v2);
    })
  });

  describe('createRoom', () => {
    it('should have a link', (done) => {
      createRoom('test-room')
        .then((room) => {
          expect(room.link).to.be.a('string');
          expect(room.link).to.not.equal('');
          done();
        })
        .catch((err) => {
          done(err)
        })
    });

    it('should have a name', (done) => {
      createRoom('test-room')
        .then((room) => {
          expect(room.name).to.equal('test-room');
          done();
        })
        .catch((err) => {
          done(err)
        })
    });
  });

  describe('getRoomByLink', () => {
    it('return a matching link', (done) => {
      createRoom('test')
        .then((room) => {
          getRoomByLink(room.link)
            .then((found) => {
              expect(room.id).to.equal(found.id)
              done()
            })
        })
        .catch((err) => {
          done(err)
        })
    });

    it('should throw if no matching link found', (done) => {
      getRoomByLink('ljnsdflgn')
      .catch(err => {
        expect(err).to.equal('no matching links');
        done()
      })
    })
  })
});