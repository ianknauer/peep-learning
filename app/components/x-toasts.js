import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['toasts'],
  flashMessages: Ember.inject.service(),

  reversedFlashQueue: Ember.computed('flashMessages.arrangedQueue.[]', function() {
    return this.get('flashMessages.arrangedQueue').reverse();
  })
});
