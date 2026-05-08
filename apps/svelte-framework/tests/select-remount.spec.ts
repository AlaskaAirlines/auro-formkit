import { selectRemountSuite } from '../../shared/select-remount.suite';

selectRemountSuite('Svelte');
selectRemountSuite('Svelte', {
  route: '/select-remount-multiselect',
  initialValue: '["foo","bar"]',
  multiselect: true,
});
