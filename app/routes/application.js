import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  flashMessages: inject.service(),
  actions: {
    logout() {
      this.get('session').invalidate();
      this.get('flashMessages').success('Logged out');
    }
  }
});
