import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({

  flashMessages: inject.service(),

  actions: {
    createRoom() {
      //get the 'new room' model
      let data = this.get('currentModel.newRoom');
      //create an ember-data record
      let room = this.store.createRecord('room', {name: data.name});
      //clear any existing error messages
      this.set('currentModel.newRoom.errors', []);

      room.save().then(() => { // succesful creation flow
        this.get('flashMessages').success(`Created room: ${data.name}`);
        this.set('currentModel.newRoom.name', ''); //clear the input field
      }).catch((err) => {
        // remove the ember-data record from the store
        this.store.unloadRecord(room);
        //pass any error messages into the ui
        this.set('currentModel.newRoom.errors', (err.errors || []).mapBy('detail'));
        //notification of failure
        this.get('flashMessages').danger(`Problem creating room : ${data.name}`);
      });
     },

    removeRoom(room) {
      if (window.confirm('Are you sure?')) {
        room.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted room: ${room.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting room: ${room.get('name')}`);
        });
      }
    }
  },

  model() {
    return RSVP.hash({
      rooms: this.store.findAll('room'),
      newRoom: {name: '', errors: []}
    });
  }

});
