import { selectRemountSuite } from '../../shared/select-remount.suite';

selectRemountSuite('React');
selectRemountSuite('React', {
  route: '/select-remount-multiselect',
  initialValue: '["foo","bar"]',
  multiselect: true,
});
